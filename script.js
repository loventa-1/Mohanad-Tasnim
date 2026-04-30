/* ════════════════════════════════════════════════════════════════════
   WEDDING INVITATION · script.js (Mohanad & Tasnim)
   Glassmorphism + Countdown Timer + Optimized
   ════════════════════════════════════════════════════════════════════ */

"use strict";

const CONFIG = {
  groomName: "Mohanad",
  brideName: "Tasnim",
  groomNameAr: "مهند",
  brideNameAr: "تسنيم",
  weddingDate: "May 28, 2026",
  weddingDateAr: "٢٨ مايو ٢٠٢٦",
  weddingTime: "6:00 PM",
  weddingLocation: "Paradise Inn Beach Hotel, El Maamoura, Alexandria",
  weddingLocationAr: "فندق برادايس إن بيتش، المعمورة، الإسكندرية",
  weddingMapLink:
    "https://www.google.com/maps/place/%D9%81%D9%86%D8%AF%D9%82+%D8%A8%D8%B1%D8%A7%D8%AF%D8%A7%D9%8A%D8%B3+%D8%A7%D9%86+%D8%A8%D9%8A%D8%AA%D8%B4+%D8%A7%D9%84%D9%85%D8%B9%D9%85%D9%88%D8%B1%D8%A9+%D8%A7%D9%84%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9%E2%80%AD/@31.2889188,30.025028,17z",
  crestImage: "assets/images/logo.jpg",
  doorStaticBg: "assets/images/photo_2026-04-30_07-13-50.jpg",
  doorGif: "assets/images/IMG_4681.MP4",
  detailsBg: "assets/images/background.jpg",
  musicUrl: "assets/music/music1.mp3",
  groomWhatsappNumber: "201558669681",
  brideWhatsappNumber: "201288998845",
  assetsToPreload: [],
};

CONFIG.assetsToPreload = [
  CONFIG.crestImage,
  CONFIG.doorStaticBg,
  CONFIG.doorGif,
  CONFIG.detailsBg,
  CONFIG.musicUrl,
].filter(Boolean);

let currentLang = "en";
let loadProgress = 0;
let doorPlayed = false;
let currentWhatsAppMessage = "";
let bgMusic = null;
let countdownInterval = null;

const pageLoading = document.getElementById("page-loading");
const pageDoor = document.getElementById("page-door");
const pageDetails = document.getElementById("page-details");
const loadingBar = document.getElementById("loading-bar");
const doorGif = document.getElementById("door-gif");
const doorGlowRing = document.getElementById("door-glow-ring");
const knockBtn = document.getElementById("knock-btn");
const langBtnDoor = document.getElementById("lang-btn-door");
const langBtnDet = document.getElementById("lang-btn-details");
const rsvpForm = document.getElementById("rsvp-form");
const rsvpSuccess = document.getElementById("rsvp-success");
const particles = document.getElementById("particles");
const petalsWrap = document.getElementById("petals");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownMsgEn = document.getElementById("countdown-message");
const countdownMsgAr = document.getElementById("countdown-message-ar");

function initCountdown() {
  if (!daysEl) return;
  const dateTimeString = `${CONFIG.weddingDate} ${CONFIG.weddingTime}`;
  let targetDate = new Date(dateTimeString);
  if (isNaN(targetDate.getTime())) {
    targetDate = new Date(2026, 4, 28, 19, 0, 0);
  }
  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) {
      if (countdownInterval) clearInterval(countdownInterval);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (countdownMsgEn)
        countdownMsgEn.textContent = "✨ The celebration has begun! ✨";
      if (countdownMsgAr) countdownMsgAr.textContent = "✨ بدأ الاحتفال! ✨";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
    if (countdownMsgEn && days <= 7) {
      if (days === 0)
        countdownMsgEn.textContent = "🎉 Tomorrow is the big day! 🎉";
      else if (days <= 3)
        countdownMsgEn.textContent = "💛 Getting so close! 💛";
      else countdownMsgEn.textContent = "✨ Counting every moment ✨";
    }
    if (countdownMsgAr && days <= 7) {
      if (days === 0)
        countdownMsgAr.textContent = "🎉 غداً هو اليوم الكبير! 🎉";
      else if (days <= 3)
        countdownMsgAr.textContent = "💛 يقترب موعد الفرح! 💛";
      else countdownMsgAr.textContent = "✨ نعد كل لحظة ✨";
    }
  }
  updateTimer();
  countdownInterval = setInterval(updateTimer, 1000);
}

function initAudio() {
  bgMusic = document.getElementById("bg-music");
  if (CONFIG.musicUrl && bgMusic) {
    bgMusic.src = CONFIG.musicUrl;
    bgMusic.load();
    bgMusic.loop = true;
    bgMusic.volume = 0;
  }
}

function fadeInMusic(el, vol = 0.65, ms = 1500) {
  if (!el) return;
  el.volume = 0;
  el.play().catch((e) => console.log("Audio error:", e));
  const step = vol / (ms / 50);
  const id = setInterval(() => {
    if (el.volume + step < vol) el.volume += step;
    else {
      el.volume = vol;
      clearInterval(id);
    }
  }, 50);
}

function playDoor() {
  if (doorPlayed) return;
  doorPlayed = true;
  doorGif.src = CONFIG.doorGif;
  doorGif.load();
  doorGif.currentTime = 0;
  doorGif.muted = true;
  doorGif.play().catch((e) => console.warn("Video error:", e));
  if (bgMusic && CONFIG.musicUrl) {
    bgMusic.currentTime = 0;
    fadeInMusic(bgMusic, 0.65, 1500);
  }
  document.querySelector(".door-bg-wrap").classList.add("revealed");
  doorGlowRing.classList.add("active");
  knockBtn.style.opacity = "0";
  knockBtn.style.pointerEvents = "none";
  let transitionDone = false;
  const goToDetails = () => {
    if (transitionDone) return;
    transitionDone = true;
    transitionToPage(pageDoor, pageDetails, () => {
      spawnPetals();
      animateDetailCards();
      initCountdown();
    });
  };
  doorGif.addEventListener("ended", goToDetails, { once: true });
  setTimeout(goToDetails, 15000);
}

function injectContent() {
  document
    .querySelectorAll(".groom-name-en")
    .forEach((el) => (el.textContent = CONFIG.groomName));
  document
    .querySelectorAll(".bride-name-en")
    .forEach((el) => (el.textContent = CONFIG.brideName));
  document
    .querySelectorAll(".groom-name-ar")
    .forEach((el) => (el.textContent = CONFIG.groomNameAr));
  document
    .querySelectorAll(".bride-name-ar")
    .forEach((el) => (el.textContent = CONFIG.brideNameAr));
  document
    .querySelectorAll(".wedding-date-en")
    .forEach((el) => (el.textContent = CONFIG.weddingDate));
  document
    .querySelectorAll(".wedding-date-ar")
    .forEach((el) => (el.textContent = CONFIG.weddingDateAr));
  document
    .querySelectorAll(".wedding-time")
    .forEach((el) => (el.textContent = CONFIG.weddingTime));
  document
    .querySelectorAll(".wedding-location-en")
    .forEach((el) => (el.textContent = CONFIG.weddingLocation));
  document
    .querySelectorAll(".wedding-location-ar")
    .forEach((el) => (el.textContent = CONFIG.weddingLocationAr));
  document
    .querySelectorAll(".wedding-map-btn")
    .forEach((btn) => (btn.href = CONFIG.weddingMapLink));
  const year = CONFIG.weddingDate.match(/\d{4}/)?.[0] || "2026";
  document
    .querySelectorAll(".wedding-year, .wedding-year-ar")
    .forEach((el) => (el.textContent = year));
  if (document.querySelector(".door-static-bg"))
    document.querySelector(".door-static-bg").style.backgroundImage =
      `url('${CONFIG.doorStaticBg}')`;
  if (document.querySelector(".details-bg"))
    document.querySelector(".details-bg").style.backgroundImage =
      `url('${CONFIG.detailsBg}')`;
  document
    .querySelectorAll(".crest-img, #hero-crest-img")
    .forEach((img) => (img.src = CONFIG.crestImage));
}

function spawnParticles() {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 12 + 8}s;animation-delay:${Math.random() * 10}s;`;
    particles.appendChild(p);
  }
}

function spawnPetals() {
  if (!petalsWrap) return;
  petalsWrap.innerHTML = "";
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const size = Math.random() * 8 + 4;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 18 + 12}s;animation-delay:${Math.random() * 14}s;`;
    petalsWrap.appendChild(p);
  }
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function setBar(target) {
  const from = loadProgress;
  const start = performance.now();
  const duration = 400;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    loadProgress = from + (target - from) * easeInOut(t);
    loadingBar.style.width = loadProgress + "%";
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function preloadAllAssets() {
  const total = CONFIG.assetsToPreload.length;
  if (total === 0) return Promise.resolve();
  let loaded = 0;
  const BAR_START = 10,
    BAR_END = 90;
  function onAssetDone() {
    loaded++;
    setBar(BAR_START + (loaded / total) * (BAR_END - BAR_START));
  }
  const promises = CONFIG.assetsToPreload.map(
    (src) =>
      new Promise((resolve) => {
        const isVideo = src.match(/\.(mp4|webm|mov)$/i);
        const isAudio = src.match(/\.(mp3|wav|ogg)$/i);
        if (isVideo) {
          const video = document.createElement("video");
          video.preload = "auto";
          video.src = src;
          video.load();
          const timeout = setTimeout(() => resolve(), 12000);
          video.addEventListener(
            "canplaythrough",
            () => {
              clearTimeout(timeout);
              onAssetDone();
              resolve();
            },
            { once: true },
          );
          video.addEventListener(
            "error",
            () => {
              clearTimeout(timeout);
              onAssetDone();
              resolve();
            },
            { once: true },
          );
        } else if (isAudio) {
          const audio = new Audio();
          audio.preload = "auto";
          audio.src = src;
          const timeout = setTimeout(() => resolve(), 12000);
          audio.addEventListener(
            "canplaythrough",
            () => {
              clearTimeout(timeout);
              onAssetDone();
              resolve();
            },
            { once: true },
          );
          audio.addEventListener(
            "error",
            () => {
              clearTimeout(timeout);
              onAssetDone();
              resolve();
            },
            { once: true },
          );
          audio.load();
        } else {
          const img = new Image();
          const timeout = setTimeout(() => resolve(), 12000);
          img.onload = img.onerror = () => {
            clearTimeout(timeout);
            onAssetDone();
            resolve();
          };
          img.src = src;
        }
      }),
  );
  return Promise.all(promises);
}

async function runLoadingScreen() {
  setBar(10);
  spawnParticles();
  await Promise.all([
    preloadAllAssets(),
    new Promise((r) => setTimeout(r, 2000)),
  ]);
  setBar(100);
  await new Promise((r) => setTimeout(r, 600));
  transitionToPage(pageLoading, pageDoor);
}

function transitionToPage(fromPage, toPage, cb) {
  fromPage.classList.add("fade-out");
  setTimeout(() => {
    fromPage.classList.remove("active", "fade-out");
    toPage.classList.add("active");
    if (cb) cb();
  }, 900);
}

function animateDetailCards() {
  pageDetails.querySelectorAll(".detail-card").forEach((c, i) => {
    c.style.animation = "cardEntrance 0.8s ease both";
    c.style.animationDelay = i * 0.15 + "s";
  });
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "ar" : "en";
  document.documentElement.setAttribute("lang", currentLang);
  document.documentElement.setAttribute(
    "dir",
    currentLang === "ar" ? "rtl" : "ltr",
  );
  const nameEl = document.getElementById("rsvp-name");
  const msgEl = document.getElementById("rsvp-msg");
  if (nameEl)
    nameEl.placeholder = currentLang === "ar" ? "اسمك..." : "Your name...";
  if (msgEl)
    msgEl.placeholder =
      currentLang === "ar" ? "أمنياتك الطيبة..." : "Your warm wishes...";
}

function handleRSVP(event) {
  event.preventDefault();
  const name = document.getElementById("rsvp-name").value.trim();
  const attendInput = document.querySelector('input[name="attend"]:checked');
  const message = document.getElementById("rsvp-msg").value.trim();
  if (!name) {
    alert(
      currentLang === "ar"
        ? "الرجاء إدخال اسمك الكامل."
        : "Please enter your full name.",
    );
    return;
  }
  if (!attendInput) {
    alert(
      currentLang === "ar"
        ? "الرجاء اختيار حالة الحضور."
        : "Please confirm attendance.",
    );
    return;
  }
  const attendText =
    attendInput.value === "yes"
      ? currentLang === "ar"
        ? "نعم، سأحضر 🥂"
        : "Yes, I will attend 🥂"
      : currentLang === "ar"
        ? "آسف، لن أتمكن من الحضور"
        : "Regretfully unable to attend";
  let fullMessage = `اسم الضيف: ${name}\nحالة الحضور: ${attendText}`;
  if (message) fullMessage += `\nرسالته: ${message}`;
  currentWhatsAppMessage = fullMessage;
  rsvpForm.classList.add("hidden");
  rsvpSuccess.classList.remove("hidden");
  bindWhatsAppButtons();
}

function bindWhatsAppButtons() {
  const groomBtn = document.getElementById("send-to-groom");
  const brideBtn = document.getElementById("send-to-bride");
  const copyBtn = document.getElementById("copy-message");
  if (groomBtn) {
    const newGroom = groomBtn.cloneNode(true);
    groomBtn.parentNode.replaceChild(newGroom, groomBtn);
    newGroom.onclick = () => {
      if (CONFIG.groomWhatsappNumber)
        window.open(
          `https://wa.me/${CONFIG.groomWhatsappNumber}?text=${encodeURIComponent(currentWhatsAppMessage)}`,
          "_blank",
        );
      else alert("Groom number not set");
    };
  }
  if (brideBtn) {
    const newBride = brideBtn.cloneNode(true);
    brideBtn.parentNode.replaceChild(newBride, brideBtn);
    newBride.onclick = () => {
      if (CONFIG.brideWhatsappNumber)
        window.open(
          `https://wa.me/${CONFIG.brideWhatsappNumber}?text=${encodeURIComponent(currentWhatsAppMessage)}`,
          "_blank",
        );
      else alert("Bride number not set");
    };
  }
  if (copyBtn) {
    const newCopy = copyBtn.cloneNode(true);
    copyBtn.parentNode.replaceChild(newCopy, copyBtn);
    newCopy.onclick = () => {
      navigator.clipboard
        .writeText(currentWhatsAppMessage)
        .then(() => alert("Message copied!"))
        .catch(() => alert("Copy failed"));
    };
  }
}

function enableAudioOnUserInteraction() {
  let activated = false;
  const enable = () => {
    if (activated) return;
    activated = true;
    if (bgMusic && bgMusic.paused && CONFIG.musicUrl) {
      bgMusic
        .play()
        .then(() => {
          bgMusic.pause();
          bgMusic.currentTime = 0;
        })
        .catch(() => {});
    }
    document.removeEventListener("click", enable);
    document.removeEventListener("touchstart", enable);
  };
  document.addEventListener("click", enable);
  document.addEventListener("touchstart", enable);
}

knockBtn.addEventListener("click", playDoor);
langBtnDoor.addEventListener("click", toggleLanguage);
langBtnDet.addEventListener("click", toggleLanguage);
if (rsvpForm) rsvpForm.addEventListener("submit", handleRSVP);

enableAudioOnUserInteraction();

document.addEventListener("DOMContentLoaded", async () => {
  initAudio();
  injectContent();
  bindWhatsAppButtons();
  pageLoading.classList.add("active");
  doorGif.removeAttribute("src");
  await runLoadingScreen();
});