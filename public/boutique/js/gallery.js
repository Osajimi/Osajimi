// Changer image principale au clic sur vignette
const thumbs = document.querySelectorAll(".thumb");
const mainImg = document.getElementById("productImg");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImg.src = thumb.src;
  });
});

