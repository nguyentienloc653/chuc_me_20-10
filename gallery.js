const galleryImages = [...document.querySelectorAll(".gallery img")];

if (galleryImages.length) {
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Xem ảnh gia đình");

  const image = document.createElement("img");
  image.className = "lightbox-image";

  const caption = document.createElement("p");
  caption.className = "lightbox-caption";
  caption.setAttribute("aria-live", "polite");

  const closeButton = createButton("lightbox-close", "Đóng ảnh", "×");
  const previousButton = createButton("lightbox-previous", "Ảnh trước", "‹");
  const nextButton = createButton("lightbox-next", "Ảnh tiếp theo", "›");

  dialog.append(closeButton, previousButton, image, nextButton, caption);
  document.body.append(dialog);

  let activeIndex = 0;

  function createButton(className, label, text) {
    const button = document.createElement("button");
    button.className = `lightbox-button ${className}`;
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.textContent = text;
    return button;
  }

  function showImage(index) {
    activeIndex = (index + galleryImages.length) % galleryImages.length;
    const activeImage = galleryImages[activeIndex];
    image.src = activeImage.currentSrc || activeImage.src;
    image.alt = activeImage.alt;
    caption.textContent = `${activeImage.alt} · ${activeIndex + 1} / ${galleryImages.length}`;
  }

  galleryImages.forEach((galleryImage, index) => {
    galleryImage.tabIndex = 0;
    galleryImage.setAttribute("role", "button");
    galleryImage.setAttribute("aria-label", `Mở ảnh: ${galleryImage.alt}`);
    galleryImage.addEventListener("click", () => {
      showImage(index);
      dialog.showModal();
      closeButton.focus();
    });
    galleryImage.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showImage(index);
        dialog.showModal();
        closeButton.focus();
      }
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => showImage(activeIndex - 1));
  nextButton.addEventListener("click", () => showImage(activeIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    galleryImages[activeIndex].focus();
  });

  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });
}
