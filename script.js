const wishButton = document.getElementById("wishButton");
const message = document.getElementById("message");
const hearts = document.getElementById("hearts");

const wishes = [
  wishButton.addEventListener("click", () => {
    window.location.href = "grallery.html";
  }),
];

let wishIndex = 0;

wishButton.addEventListener("click", () => {
  message.style.opacity = "0";

  setTimeout(() => {
    message.textContent = wishes[wishIndex];
    message.style.transition = "opacity 0.5s";
    message.style.opacity = "1";

    wishIndex = (wishIndex + 1) % wishes.length;
  }, 250);

  createHearts(18);
});

function createHearts(amount = 3) {
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

// Tự động tạo trái tim bay
setInterval(() => createHearts(1), 900);
