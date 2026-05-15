const canvas = document.querySelector("#messageCanvas");
const ctx = canvas.getContext("2d");
const hypeForm = document.querySelector("#hypeForm");
const hypeInput = document.querySelector("#hypeInput");
const timelineModal = document.querySelector("#timelineModal");
const dressModal = document.querySelector("#dressModal");
const beerBtn = document.querySelector("#beerBtn");

const messages = [];
const colors = ["#f2b94b", "#22d3ee", "#ff3d9a", "#7dff8a", "#ffffff"];
const targetDate = new Date("2026-05-22T15:00:00+02:00");

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function addMessage(text) {
  ctx.font = "900 32px Segoe UI, sans-serif";
  const width = Math.max(ctx.measureText(text).width, 120);
  messages.push({
    text,
    x: Math.random() * Math.max(1, window.innerWidth - width),
    y: 90 + Math.random() * Math.max(1, window.innerHeight - 220),
    vx: (Math.random() > 0.5 ? 1 : -1) * (1.4 + Math.random() * 1.8),
    vy: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 1.5),
    width,
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

function drawMessages() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.font = "900 32px Segoe UI, sans-serif";
  ctx.textBaseline = "top";

  messages.forEach((message) => {
    message.x += message.vx;
    message.y += message.vy;

    if (message.x <= 0 || message.x + message.width >= window.innerWidth) {
      message.vx *= -1;
    }

    if (message.y <= 0 || message.y + 42 >= window.innerHeight) {
      message.vy *= -1;
    }

    ctx.shadowColor = message.color;
    ctx.shadowBlur = 22;
    ctx.fillStyle = message.color;
    ctx.fillText(message.text, message.x, message.y);
  });

  requestAnimationFrame(drawMessages);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const difference = Math.max(0, targetDate - new Date());
  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.querySelector("#days").textContent = pad(days);
  document.querySelector("#hours").textContent = pad(hours);
  document.querySelector("#minutes").textContent = pad(minutes);
  document.querySelector("#seconds").textContent = pad(seconds);
}

function openModal(modal) {
  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

function closeModal(id) {
  const modal = document.querySelector(`#${id}`);
  modal.close();
}

function launchBeerBurst(button) {
  const rect = button.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < 32; i += 1) {
    const particle = document.createElement("span");
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
    const distance = 120 + Math.random() * 240;

    particle.className = "beer-particle";
    particle.textContent = "🍺";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    document.body.appendChild(particle);

    particle.addEventListener("animationend", () => particle.remove());
  }
}

hypeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = hypeInput.value.trim();

  if (!text) {
    return;
  }

  addMessage(text.toUpperCase());
  hypeInput.value = "";
  hypeInput.focus();
});

document.querySelector("#timelineBtn").addEventListener("click", () => openModal(timelineModal));
document.querySelector("#dressBtn").addEventListener("click", () => openModal(dressModal));
beerBtn.addEventListener("click", () => launchBeerBurst(beerBtn));

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.dataset.close));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    [timelineModal, dressModal].forEach((modal) => {
      if (modal.open) {
        modal.close();
      }
    });
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
updateCountdown();
setInterval(updateCountdown, 1000);
drawMessages();
