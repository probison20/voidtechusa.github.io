(function () {
  const carousels = document.querySelectorAll(".char-carousel");
  if (!carousels.length) return;

  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 520) return 1;
    if (w <= 800) return 2;
    if (w <= 1100) return 3;
    return 4;
  }

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".char-track");
    const viewport = carousel.querySelector(".char-viewport");
    const prevBtn = carousel.querySelector(".char-btn.prev");
    const nextBtn = carousel.querySelector(".char-btn.next");
    const cards = Array.from(carousel.querySelectorAll(".char-card"));

    if (!track || !viewport || !prevBtn || !nextBtn || cards.length === 0) return;

    let index = 0;

    function clamp(i) {
      const max = Math.max(0, cards.length - getVisibleCount());
      return Math.min(Math.max(0, i), max);
    }

    function update() {
      index = clamp(index);

      const visible = getVisibleCount();
      const step = viewport.clientWidth / visible; // width of one “slot”
      track.style.transform = `translateX(${-index * step}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= cards.length - visible;
    }

    prevBtn.addEventListener("click", () => { index--; update(); });
    nextBtn.addEventListener("click", () => { index++; update(); });

    window.addEventListener("resize", update);

    update();
  });
})();

// Per-character "Concept / Final" toggle
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".char-toggle");
  if (!btn) return;

  const card = btn.closest(".char-card");
  const img = card?.querySelector(".char-img");
  if (!img) return;

  const finalSrc = img.dataset.final;
  const conceptSrc = img.dataset.concept;

  // If missing, do nothing (safe)
  if (!finalSrc || !conceptSrc) return;

  const showingConcept = img.src.includes(conceptSrc);
  if (showingConcept) {
    img.src = finalSrc;
    btn.textContent = "Concept";
    btn.setAttribute("aria-pressed", "false");
  } else {
    img.src = conceptSrc;
    btn.textContent = "Final";
    btn.setAttribute("aria-pressed", "true");
  }
});
