import { CONFIG } from "../config";

/**
 * Extracts a YouTube video ID from youtu.be or youtube.com URLs.
 */
export function extractYouTubeId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
      const parts = parsed.pathname.split("/").filter(Boolean);
      const embedIdx = parts.findIndex((p) => p === "embed" || p === "shorts");
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        return parts[embedIdx + 1];
      }
    }
  } catch {
    return null;
  }
  return null;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (vol: number) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement | string,
    opts: {
      height?: string | number;
      width?: string | number;
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number }) => void;
        onError?: () => void;
      };
    }
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * Romantic audio controller:
 * 1. Uses YouTube IFrame Player API when `CONFIG.youtubeMusicUrl` is configured.
 * 2. Falls back to `CONFIG.backgroundMusicUrl` (.mp3) if provided.
 * 3. Falls back smoothly to a gentle Web Audio API piano/harp instrumental if
 *    YouTube embedding is blocked or offline.
 */
class RomanticAudioEngine {
  private ytPlayer: YTPlayer | null = null;
  private ytReady = false;
  private ytFailed = false;
  private ytLoadingPromise: Promise<boolean> | null = null;
  private wantPlay = false;

  private audioEl: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private loopTimer: number | null = null;
  private isPlaying = false;
  private stepIndex = 0;
  private onStateListeners = new Set<(playing: boolean) => void>();

  private readonly chords: number[][] = [
    [174.61, 220.0, 261.63, 329.63, 440.0],
    [196.0, 246.94, 293.66, 329.63, 493.88],
    [164.81, 196.0, 246.94, 293.66, 392.0],
    [220.0, 261.63, 329.63, 392.0, 523.25],
  ];

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.onStateListeners.add(listener);
    return () => {
      this.onStateListeners.delete(listener);
    };
  }

  private notify() {
    this.onStateListeners.forEach((fn) => fn(this.isPlaying));
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  private ensureYouTubePlayer(): Promise<boolean> {
    const videoId = extractYouTubeId(CONFIG.youtubeMusicUrl);
    if (!videoId || this.ytFailed) return Promise.resolve(false);
    if (this.ytReady && this.ytPlayer) return Promise.resolve(true);
    if (this.ytLoadingPromise) return this.ytLoadingPromise;

    this.ytLoadingPromise = new Promise<boolean>((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (!settled) {
          settled = true;
          resolve(ok);
        }
      };

      const mountPlayer = () => {
        if (!window.YT || !window.YT.Player) {
          finish(false);
          return;
        }
        let container = document.getElementById("yt-bg-music-host");
        if (!container) {
          container = document.createElement("div");
          container.id = "yt-bg-music-host";
          container.setAttribute("aria-hidden", "true");
          container.style.position = "fixed";
          container.style.bottom = "-260px";
          container.style.right = "-260px";
          container.style.width = "200px";
          container.style.height = "200px";
          container.style.opacity = "0.001";
          container.style.pointerEvents = "none";
          document.body.appendChild(container);
        }

        const inner = document.createElement("div");
        container.innerHTML = "";
        container.appendChild(inner);

        this.ytPlayer = new window.YT.Player(inner, {
          height: "200",
          width: "200",
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: videoId,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              this.ytReady = true;
              event.target.setVolume(55);
              if (this.wantPlay) {
                event.target.playVideo();
              }
              finish(true);
            },
            onStateChange: (event) => {
              // 1 = playing, 2 = paused, 0 = ended
              if (event.data === 1) {
                this.stopSynth();
                this.isPlaying = true;
                this.notify();
              } else if (event.data === 2 && !this.wantPlay) {
                this.isPlaying = false;
                this.notify();
              }
            },
            onError: () => {
              this.ytFailed = true;
              finish(false);
              if (this.wantPlay) {
                void this.startFallbackAudio();
              }
            },
          },
        });
      };

      if (window.YT && window.YT.Player) {
        mountPlayer();
      } else {
        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (prevReady) prevReady();
          mountPlayer();
        };

        if (!document.getElementById("yt-iframe-api-script")) {
          const script = document.createElement("script");
          script.id = "yt-iframe-api-script";
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          script.onerror = () => {
            this.ytFailed = true;
            finish(false);
          };
          document.head.appendChild(script);
        }
      }

      // Timeout safeguard so we never hang if YouTube is blocked
      window.setTimeout(() => {
        if (!this.ytReady) {
          finish(false);
        }
      }, 4000);
    });

    return this.ytLoadingPromise;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    await this.start();
    return this.isPlaying;
  }

  public async start(): Promise<void> {
    this.wantPlay = true;

    const ytId = extractYouTubeId(CONFIG.youtubeMusicUrl);
    if (ytId && !this.ytFailed) {
      // Start soft synth immediately while YouTube player buffers if needed, or trigger YT directly if ready
      if (this.ytReady && this.ytPlayer) {
        try {
          this.ytPlayer.playVideo();
          this.isPlaying = true;
          this.notify();
          return;
        } catch {
          this.ytFailed = true;
        }
      } else {
        const loaded = await this.ensureYouTubePlayer();
        if (loaded && this.ytPlayer && this.wantPlay) {
          try {
            this.ytPlayer.playVideo();
            this.isPlaying = true;
            this.notify();
            return;
          } catch {
            this.ytFailed = true;
          }
        }
      }
    }

    await this.startFallbackAudio();
  }

  private async startFallbackAudio(): Promise<void> {
    if (this.isPlaying) return;

    const customUrl = CONFIG.backgroundMusicUrl.trim();
    if (customUrl) {
      try {
        if (!this.audioEl || this.audioEl.src !== customUrl) {
          this.audioEl = new Audio(customUrl);
          this.audioEl.loop = true;
          this.audioEl.volume = 0.45;
        }
        await this.audioEl.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch {
        // Continue to Web Audio fallback
      }
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    this.isPlaying = true;
    this.stepIndex = 0;
    this.notify();
    this.scheduleNextNote();
  }

  private scheduleNextNote(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const chordIdx = Math.floor(this.stepIndex / 6) % this.chords.length;
    const noteInChord = this.stepIndex % 6;
    const chord = this.chords[chordIdx];
    const freq = noteInChord < chord.length ? chord[noteInChord] : chord[chord.length - 2];

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.24, now + 0.08);
    env.gain.exponentialRampToValueAtTime(0.0008, now + 2.9);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 3.0);
    subOsc.stop(now + 3.0);

    this.stepIndex += 1;
    this.loopTimer = window.setTimeout(() => this.scheduleNextNote(), 680);
  }

  private stopSynth(): void {
    if (this.loopTimer !== null) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.2);
    }
  }

  public stop(): void {
    this.wantPlay = false;
    this.isPlaying = false;
    this.stopSynth();
    if (this.ytReady && this.ytPlayer) {
      try {
        this.ytPlayer.pauseVideo();
      } catch {
        // ignore
      }
    }
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.notify();
  }
}

export const romanticAudio = new RomanticAudioEngine();
