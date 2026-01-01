const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    products.forEach(prod => {
      if (filter === "all" || prod.getAttribute("data-category") === filter) {
        prod.style.display = "block";
      } else {
        prod.style.display = "none";
      }
    });
  });
});

