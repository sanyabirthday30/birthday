const reasons = [
  ["01", "Your beautiful smile", "It has a way of making everything feel lighter, even after a difficult day."],
  ["02", "Your brave heart", "You keep going, keep growing, and keep caring. I admire that more than I say."],
  ["03", "Our ridiculous moments", "The silly faces, private jokes, and little memories that belong only to us."],
  ["04", "The way we find our way back", "We fight, we get annoyed, we are wonderfully imperfect—and somehow love still brings us home."],
  ["05", "The woman you are becoming", "I am so proud of you already, and I know this is only the beginning."],
  ["06", "Every dream in your heart", "You will achieve everything you truly set your mind to. I believe in you completely."],
  ["07", "Simply, Meri Jaan", "My favourite person. The one I love more than all our arguments combined."],
];

const reasonScenes = [
  { className: "scene-smile", symbol: "♡", note: "smiling brighter because of you ♡", label: "A cute animated girl bouncing, waving, and smiling with a happy heart" },
  { className: "scene-brave", symbol: "♥", note: "brave heart, superhero mode! ♡", label: "A cute animated girl striking a brave superhero pose with her heart held high" },
  { className: "scene-silly", symbol: "✦", note: "giggle attack in progress! ♡", label: "A cute animated girl doing a ridiculous wiggly giggle dance" },
  { className: "scene-home", symbol: "⌂", note: "we always find each other again ♡", label: "A cute animated girl and boy walk toward each other, hold hands, and bounce together" },
  { className: "scene-bloom", symbol: "✿", note: "watching you bloom is magic ♡", label: "A cute animated girl twirling while a flower blooms beside her" },
  { className: "scene-dreams", symbol: "★", note: "reaching for every dream with you ✦", label: "A cute animated girl floating upward to catch a shining dream star" },
  { className: "scene-love", symbol: "♡", note: "simply, completely, Meri Jaan ♡", label: "A cute animated girl cuddling a giant heart and swaying with love" },
];

const reasonCard = document.querySelector(".reason-card");
const reasonNumber = reasonCard.querySelector(".reason-number");
const reasonTitle = reasonCard.querySelector("strong");
const reasonText = reasonCard.querySelector("p");
const reasonDots = document.querySelector(".reason-dots");
const girlPlayground = document.querySelector(".girl-playground");
const cartoonGirl = girlPlayground.querySelector(".cartoon-girl");
const reasonSymbol = girlPlayground.querySelector(".bouncy-heart");
const playfulNote = girlPlayground.querySelector(".playful-note");
let reasonIndex = 0;

function showReason(index) {
  reasonIndex = index;
  const [number, title, text] = reasons[index];
  reasonNumber.textContent = `NO. ${number}`;
  reasonTitle.textContent = title;
  reasonText.textContent = text;
  const scene = reasonScenes[index];
  girlPlayground.classList.remove(...reasonScenes.map((item) => item.className));
  girlPlayground.classList.add(scene.className);
  girlPlayground.setAttribute("aria-label", scene.label);
  reasonSymbol.textContent = scene.symbol;
  playfulNote.textContent = scene.note;
  reasonDots.querySelectorAll("button").forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
  reasonCard.style.animation = "none";
  cartoonGirl.style.animation = "none";
  reasonSymbol.style.animation = "none";
  playfulNote.style.animation = "none";
  requestAnimationFrame(() => {
    reasonCard.style.animation = "";
    cartoonGirl.style.animation = "";
    reasonSymbol.style.animation = "";
    playfulNote.style.animation = "";
  });
}

reasons.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = index === 0 ? "active" : "";
  dot.setAttribute("aria-label", `Show reason ${index + 1}`);
  dot.addEventListener("click", () => showReason(index));
  reasonDots.appendChild(dot);
});
reasonCard.addEventListener("click", () => showReason((reasonIndex + 1) % reasons.length));

const envelopeScene = document.querySelector(".envelope-scene");
const envelope = document.querySelector(".envelope");
envelope.addEventListener("click", () => {
  const opened = envelopeScene.classList.toggle("opened");
  envelope.setAttribute("aria-expanded", String(opened));
  envelopeScene.lastElementChild.textContent = opened ? "tap to tuck it back in" : "tap the heart to open";
});

const cuteToggle = document.querySelector(".cute-toggle");
const main = document.querySelector("main");
let cuteRain;
cuteToggle.addEventListener("click", () => {
  const enabled = main.classList.toggle("extra-cute");
  cuteToggle.setAttribute("aria-pressed", String(enabled));
  cuteToggle.textContent = enabled ? "✨ extra cute!" : "🎀 cute mode";
  cuteRain?.remove();
  cuteRain = null;
  if (enabled) {
    cuteRain = document.createElement("div");
    cuteRain.className = "cute-rain";
    cuteRain.setAttribute("aria-hidden", "true");
    for (let index = 0; index < 18; index += 1) {
      const drop = document.createElement("i");
      drop.textContent = ["🎀", "♡", "✦"][index % 3];
      drop.style.setProperty("--rain-x", `${(index * 37) % 100}vw`);
      drop.style.setProperty("--rain-d", `${(index % 9) * 0.3}s`);
      cuteRain.appendChild(drop);
    }
    main.appendChild(cuteRain);
  }
});

const kissButton = document.querySelector(".kiss-button");
let kissCount = 0;
kissButton.addEventListener("click", () => {
  kissCount += 1;
  kissButton.querySelector("small").textContent = `${kissCount} kisses sent!`;
  kissButton.querySelectorAll("i").forEach((heart) => heart.remove());
  for (let index = 0; index < 12; index += 1) {
    const heart = document.createElement("i");
    heart.textContent = "♡";
    heart.style.setProperty("--burst-x", `${Math.cos(index * 0.52) * (45 + index * 2)}px`);
    heart.style.setProperty("--burst-y", `${Math.sin(index * 0.52) * (45 + index * 2)}px`);
    kissButton.appendChild(heart);
    setTimeout(() => heart.remove(), 1100);
  }
});

const cake = document.querySelector(".cake");
const finale = document.querySelector(".finale");
const wishStatus = document.querySelector(".wish-status");
let wished = false;
cake.addEventListener("click", () => {
  wished = !wished;
  cake.classList.toggle("wished", wished);
  wishStatus.textContent = wished ? "Your wish is on its way to the stars! ✦" : "tap the candle and make it a good one";
  finale.querySelectorAll(".confetti").forEach((piece) => piece.remove());
  if (!wished) return;
  playApplause();
  for (let index = 0; index < 70; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.setProperty("--x", `${(index * 43) % 100}vw`);
    piece.style.setProperty("--delay", `${(index % 10) * 0.06}s`);
    piece.style.setProperty("--color", ["#ff8fbd", "#a995e8", "#ffe184", "#8fd9ce", "#fff"][index % 5]);
    finale.appendChild(piece);
    setTimeout(() => piece.remove(), 4300);
  }
});

function playApplause() {
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  const context = new AudioEngine();
  const duration = 2.6;
  const buffer = context.createBuffer(2, Math.floor(context.sampleRate * duration), context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let clap = 0; clap < 72; clap += 1) {
      const start = Math.floor((0.04 + Math.random() * 2.28) * context.sampleRate);
      const length = Math.floor((0.018 + Math.random() * 0.035) * context.sampleRate);
      const strength = 0.24 + Math.random() * 0.58;
      for (let sample = 0; sample < length && start + sample < data.length; sample += 1) {
        data[start + sample] += (Math.random() * 2 - 1) * strength * Math.exp(-sample / (context.sampleRate * 0.012));
      }
    }
  }
  const source = context.createBufferSource();
  const highpass = context.createBiquadFilter();
  const lowpass = context.createBiquadFilter();
  const volume = context.createGain();
  highpass.type = "highpass";
  highpass.frequency.value = 550;
  lowpass.type = "lowpass";
  lowpass.frequency.value = 6800;
  volume.gain.setValueAtTime(0.0001, context.currentTime);
  volume.gain.exponentialRampToValueAtTime(0.58, context.currentTime + 0.08);
  volume.gain.setValueAtTime(0.58, context.currentTime + 1.8);
  volume.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
  source.buffer = buffer;
  source.connect(highpass).connect(lowpass).connect(volume).connect(context.destination);
  source.start();
  source.onended = () => context.close();
}

const musicToggle = document.querySelector(".music-toggle");
let musicOn = true;
let musicContext;
let musicMaster;
let musicTimer;

function startMusic() {
  if (musicContext) {
    musicContext.resume();
    musicMaster.gain.setTargetAtTime(0.2, musicContext.currentTime, 0.08);
    return;
  }
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  musicContext = new AudioEngine();
  musicMaster = musicContext.createGain();
  const filter = musicContext.createBiquadFilter();
  const delay = musicContext.createDelay(1);
  const feedback = musicContext.createGain();
  const wet = musicContext.createGain();
  musicMaster.gain.value = 0.2;
  filter.type = "lowpass";
  filter.frequency.value = 5200;
  delay.delayTime.value = 0.23;
  feedback.gain.value = 0.13;
  wet.gain.value = 0.16;
  musicMaster.connect(filter);
  filter.connect(musicContext.destination);
  filter.connect(delay).connect(wet).connect(musicContext.destination);
  delay.connect(feedback).connect(delay);
  const eighth = 60 / 88 / 2;
  const melody = [0,739.99,880,1174.66,1108.73,880,739.99,659.25,0,659.25,880,1108.73,987.77,880,659.25,554.37,587.33,739.99,987.77,880,739.99,587.33,659.25,739.99,587.33,783.99,987.77,880,783.99,739.99,659.25,587.33];
  const chords = [[146.83,220,293.66,369.99],[138.59,220,277.18,329.63],[123.47,185,246.94,293.66],[98,146.83,196,246.94]];
  let step = 0;
  let nextNote = musicContext.currentTime + 0.08;
  const note = (frequency, at, duration, volume) => {
    const oscillator = musicContext.createOscillator();
    const envelope = musicContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.exponentialRampToValueAtTime(volume, at + 0.009);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration);
    oscillator.connect(envelope).connect(musicMaster);
    oscillator.start(at);
    oscillator.stop(at + duration + 0.05);
  };
  const schedule = () => {
    while (nextNote < musicContext.currentTime + 0.7) {
      const chord = chords[Math.floor(step / 8) % chords.length];
      note(chord[[0,1,2,1,3,2,1,2][step % 8]], nextNote, eighth * 2.75, 0.052);
      if (melody[step % melody.length]) note(melody[step % melody.length], nextNote, eighth * 1.7, 0.09);
      step = (step + 1) % melody.length;
      nextNote += eighth;
    }
  };
  schedule();
  musicTimer = setInterval(schedule, 220);
}

document.addEventListener("pointerdown", () => { if (musicOn) startMusic(); }, { once: true });
document.addEventListener("keydown", () => { if (musicOn) startMusic(); }, { once: true });
musicToggle.addEventListener("click", () => {
  musicOn = !musicOn;
  musicToggle.classList.toggle("playing", musicOn);
  musicToggle.setAttribute("aria-pressed", String(musicOn));
  musicToggle.setAttribute("aria-label", musicOn ? "Turn off background music" : "Turn on background music");
  musicToggle.querySelector("b").textContent = musicOn ? "piano theme" : "music off";
  if (musicOn) startMusic();
  else if (musicContext) musicMaster.gain.setTargetAtTime(0.0001, musicContext.currentTime, 0.08);
});

window.addEventListener("pagehide", () => {
  if (musicTimer) clearInterval(musicTimer);
  musicContext?.close();
});
