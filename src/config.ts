/**
 * ============================================================================
 *  BIRTHDAY LOVE LETTER — CUSTOMIZATION CONFIG
 * ============================================================================
 *  Edit this file to customize every personal detail of your gift:
 *   1. `youtubeMusicUrl` / `backgroundMusicUrl`: Plays your YouTube song or
 *      direct .mp3 track (with a gentle built-in instrumental fallback).
 *   2. `loveLetter`: Your full multi-paragraph birthday letter.
 *   3. `moments`: Photo paths (`public/assets/aistudio/...` -> `/assets/aistudio/...`)
 *      and captions for all 8 Polaroid moments.
 * ============================================================================
 */

export interface MomentItem {
  id: number;
  title: string;
  dateLocation: string;
  image: string;
  imagePosition?: string;
  polaroidCaption: string;
  memoryNote: string;
  quote: string;
  secretWhisper: string;
}

export interface TreatItem {
  id: string;
  title: string;
  subtitle: string;
  voucherCode: string;
  promiseDetail: string;
}

export const CONFIG = {
  // Personal Details
  birthdayDate: "Nov 20th",
  favoriteNickname: "Rabbituuu 🐇",

  // Step 1: Envelope & Password Gate
  recipientHeader: "For My Cutieluuuu & Rabbituuu 🐇❤️",
  senderSignature: "Forever your Nanna. ❤️✨",
  password: "Chinnu Bannu",
  passwordHint: "Hint: Our own little secret language 😉",

  // Background Music
  // Supports YouTube links (youtu.be / youtube.com) OR a direct .mp3 URL.
  youtubeMusicUrl: "https://youtu.be/ypLfTolyR60?si=8-fJqMSgionCa82F",
  backgroundMusicUrl: "",
  musicTrackTitle: "Our Birthday Song",

  // Step 2: Birthday Cake Prompt
  cakePrompt:
    "Happy Nov 20th, my Rabbituuu 🐇! Make a wish, my Bangaram, and tap the flame to blow it out.",
  cakeWishGrantedText:
    "Wish made, my Rabbituuu 🐇! May every single dream in your heart come true — with Nanna right beside you always.",

  // ==========================================================================
  //  MAIN BIRTHDAY LOVE LETTER
  // ==========================================================================
  loveLetter: {
    dateLine: "November 20th · For My Dearest Rabbituuu 🐇",
    salutation:
      "Many more happy returns of the beautiful Day to my beautiful wifeyy, my Cutieluuuu, my Bangaram, my Bujjiluu, my Nannaluuuu. 🎂❤️🎀",
    paragraphs: [
      "I honestly don't know where to begin or how to put everything I feel for you into words, because no language in this universe would ever be enough to capture how precious you are to me. Somewhere between our silly conversations, late-night calls, little fights, endless teasing, shared laughter, and quiet moments, you slowly became my home. Nuv naa life lo oka person ga vachav, kaani ippudu naa heart lo oka part la aipoyav. ✨",
      "Nuv nannu Nanna ani pilichinappudu, ninnu Cutieluu ani pilichinappudu, manam chinna pillalla behave chesinappudu, ninnu roast chesi nuv cute ga aliginappudu, manam godava padi malli okariki okaram daggarainappudu—every single detail has become a priceless treasure I never want to lose. 🥹💞",
      "Beyond all our memories, I am deeply in love with the soul you are. I adore your pure heart, your kindness, your grace, your innocence, your family values, and the quiet, thoughtful ways you care for me without ever asking for credit. I love your expressive eyes (nee kallu), your radiant smile, your chinna pilla side, your silence, your adorable anger, your dreams, and everything that makes you uniquely you. I don't just love you for how wonderful you make me feel; I love you for who you are, even on days when life isn't easy and neither of us is perfect. 🌸",
      "I also want to hold your hand and say I am sorry. I know there were moments when my words or carelessness hurt you, when I was stubborn instead of understanding, and when I failed to give you the softness and reassurance your heart deserved. I cannot rewrite the past, but I promise to spend every tomorrow proving my love—not just through sweet words, but through my patience, my respect, my actions, and how gently I hold your heart every single day. 🤍",
      "Nuv naa life lo undadam naaku oka blessing. I don't want to love you only when everything is easy and bright. I want to stand beside you through your hardest days, your fears, your changing moods, your silent moments, and your biggest dreams. With me, you never have to pretend, hide your tears, or fear being misunderstood—you are always safe to just be yourself. Nanna, naa love ante nuvvu naa life lo undali ani matrame kaadu—nuv happy ga undali, peaceful ga undali, nee dreams anni reach avvali. If I get the privilege of walking beside you through all of it, that will always be my greatest blessing. 🕊️💫",
      "I choose you today, tomorrow, and for every season of life—not just on birthdays and special occasions, but on ordinary Mondays, exhausting nights, and through every misunderstanding. Nanna, nee kosam enni years aina wait chestha. Thank you for being my comfort, my favourite person, and the love that made me believe love is the most beautiful feeling in this entire universe. 🌌",
      "I wish I could hold you a little longer today, kiss your forehead, look into your beautiful eyes, and whisper how deeply cherished you are. Happy birthday once again, my wife, my Rabbituuu 🐇, my whole world. I love you more and more and more—today, tomorrow, and forever. ❤️💍",
    ],
    closing: "Forever your Nanna. ❤️✨",
  },
  // ==========================================================================

  // Step 4: "Our 8 Moments Together" Polaroid Deck
  moments: [
    {
      id: 1,
      title: "Where It All Began",
      dateLocation: "Chapter 01 · My Little Chinna Pilla",
      image: "/assets/aistudio/IMG_20261113_223924.jpg_ce4848ea.jpeg",
      imagePosition: "object-[50%_18%]",
      polaroidCaption: "My cute little Rabbituuu 🐇 from day one",
      memoryNote:
        "From random, effortless friendship talks to realizing you were the one soul I had been waiting for my whole life. Even looking at your childhood smile melts my heart — my sweet little chinna pilla grew up to become my entire universe.",
      quote: "“Nuv naa life lo oka person ga vachav, kaani ippudu naa heart lo oka part la aipoyav.”",
      secretWhisper: "I still smile every time I look at this adorable little hat picture of my Rabbituuu 🐇.",
    },
    {
      id: 2,
      title: "Nee Kallu & Your Pure Soul",
      dateLocation: "Chapter 02 · Expressive Eyes & Grace",
      image: "/assets/aistudio/Snapchat-2141269456.jpg_bbb289d1.jpeg",
      imagePosition: "object-[50%_22%]",
      polaroidCaption: "Nee kallalo naa prapancham kanipinchindi",
      memoryNote:
        "Nee kallu — those expressive eyes that hold all your warmth, innocence, and quiet love. I fell hopelessly in love with your pure heart, your family values, and that adorable chinna pilla side only your Nanna gets to pamper.",
      quote: "“Your eyes hold a softness that quiets every storm inside me.”",
      secretWhisper: "Nuvvu navvite aa chinna pilla smile naaku pranam, Rabbituuu 🐇.",
    },
    {
      id: 3,
      title: "Late Night Calls",
      dateLocation: "Chapter 03 · Midnight Whispers",
      image: "/assets/aistudio/IMG-20240811-WA0003.jpg_35c4ee5f.jpeg",
      imagePosition: "object-[50%_18%]",
      polaroidCaption: "Cozy calls & hugging pillows till 2 AM",
      memoryNote:
        "Endless nights talking in soft whispers while the world fell asleep. Time stood still on those calls — sleepy giggles, cozy comfort, and neither of us ever wanting to be the first one to hang up.",
      quote: "“Even silence felt like poetry when my Rabbituuu was on the other end of the line.”",
      secretWhisper: "Falling asleep to your voice is still my favourite comfort in the world.",
    },
    {
      id: 4,
      title: "800 Kilometres For You",
      dateLocation: "Chapter 04 · Across Every Mile",
      image: "/assets/aistudio/IMG-20251222-WA0005.jpg_49134520.jpeg",
      imagePosition: "object-[50%_30%]",
      polaroidCaption: "Distance was just a number on a map",
      memoryNote:
        "People call 800 kilometres long distance, kani naa manasu eppudo nee daggare undi. Every mile between us only proved how effortless it is for my heart to travel straight to you, my Bangaram.",
      quote: "“No highway or mile could ever measure how close you live inside my chest.”",
      secretWhisper: "One day there won't be a single kilometre left between us, Bujjiluu.",
    },
    {
      id: 5,
      title: "The Most Valuable 10 Days",
      dateLocation: "Chapter 05 · Ten Golden Days",
      image: "/assets/aistudio/IMG_20250101_192918_261.jpg_4c5bcccb.jpeg",
      imagePosition: "object-[50%_15%]",
      polaroidCaption: "10 days that became a lifetime of peace",
      memoryNote:
        "Just ten days on a calendar — yet they became a lifetime of warmth, soft smiles, and unforgettable memories. Being near you, watching you adjust your jhumkas and smile shyly, felt like pure home.",
      quote: "“Ten days with you taught me what forever is supposed to feel like.”",
      secretWhisper: "Every ordinary minute next to my Rabbituuu 🐇 felt completely magical.",
    },
    {
      id: 6,
      title: "The Birthday Dress & The Shirt",
      dateLocation: "Chapter 06 · Nov 20th & Cherished Gifts",
      image: "/assets/aistudio/IMG-20261113-WA0023.jpg_65cbc70c.jpeg",
      imagePosition: "object-[50%_22%]",
      polaroidCaption: "Breathtaking beauty & my treasured shirt",
      memoryNote:
        "I will never forget how breathtaking you looked in your birthday dress — like poetry standing against the evening sky. And that birthday shirt you gifted me? It's woven with your love, and I'll treasure it forever.",
      quote: "“Every time I wear your gift, it feels like your arms wrapped around me.”",
      secretWhisper: "You outshone the entire sky in that saree, Cutieluuuu.",
    },
    {
      id: 7,
      title: "Rain, Rides, First Hug & First Kiss",
      dateLocation: "Chapter 07 · Monsoon Magic",
      image: "/assets/aistudio/IMG_20260102_201805_661.jpg_468635e1.jpeg",
      imagePosition: "object-[50%_22%]",
      polaroidCaption: "First hug, first kiss & endless craving",
      memoryNote:
        "Quiet parks, long drives with zero destination, rainy bike rides, cozy movie dates, the warmth of our very first hug, and the breathless magic of our first kiss — leaving me craving a million more with you, my Rabbituuu 🐇.",
      quote: "“In the rain, on every drive, you became my favourite place to stay.”",
      secretWhisper: "That first hug and first kiss will live rent-free in my heart forever.",
    },
    {
      id: 8,
      title: "Our Pinky Promise & Forever",
      dateLocation: "Chapter 08 · Always & Beyond",
      image: "/src/assets/images/moment_pinky_promise_1795110438589.jpg",
      imagePosition: "object-center",
      polaroidCaption: "Nanna & Rabbituuu 🐇 — locked forever",
      memoryNote:
        "Two little fingers locked in unbreakable trust. Even after our cute alagadam moments and tiny pouts when I roast you, we always choose love over ego. Nanna, nee kosam enni years aina wait chestha — forever.",
      quote: "“Not just for Nov 20th, not just for this year — forever your Nanna.”",
      secretWhisper: "Pinky promise: nee cheyyi eppatiki vadalanu, my Cutieluuuu.",
    },
  ] as MomentItem[],

  // Step 5: Birthday Treats ("Love Roulette" & Mystery Keepsake Vouchers)
  treats: [
    {
      id: "kisses",
      title: "Unlimited Forehead Kisses",
      subtitle: "Redeemable anytime, anywhere — zero expiry",
      voucherCode: "VOUCHER · 01",
      promiseDetail:
        "Whenever my Rabbituuu 🐇 feels tired, needy, or just wants extra pampering from Nanna, redeem this immediately for endless warm forehead kisses and tight hugs.",
    },
    {
      id: "ride",
      title: "A Rainy Bike Ride & Long Drive",
      subtitle: "Just us, open roads & our favourite song",
      voucherCode: "VOUCHER · 02",
      promiseDetail:
        "Your choice of scenic route, warm chai stop along the way, zero rushing, and my hand holding yours at every stop.",
    },
    {
      id: "movie",
      title: "Movie Date + Zero Roasting Today 😉",
      subtitle: "Full VIP Rabbituuu 🐇 treatment all Nov 20th",
      voucherCode: "VOUCHER · 03",
      promiseDetail:
        "You pick the movie, you pick the snacks, and Nanna officially signs a 24-hour ceasefire on teasing and roasting his cute Bujjiluu.",
    },
  ] as TreatItem[],
};
