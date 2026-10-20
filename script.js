const hearts = document.getElementById("hearts");

function createHearts(amount = 3) {
  if (!hearts) return;

  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = ["💗", "💖", "💕", "🌸", "💝"][
      Math.floor(Math.random() * 5)
    ];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 16 + Math.random() * 22 + "px";
    heart.style.animationDuration = 4 + Math.random() * 4 + "s";

    hearts.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    });
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => createHearts(1), 1400);
}
