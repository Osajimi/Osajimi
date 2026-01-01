const logoTypeBtns = document.querySelectorAll("#logoTypeBtns button");
const qtyInputExtras = document.getElementById("productQty");
const priceSpanExtras = document.getElementById("productPrice");
const tableBodyExtras = document.querySelector(".option-table tbody");

const priceTableExtras = { simple: 50, detailed: 80 };
let selectedLogo = "simple";

logoTypeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    logoTypeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedLogo = btn.dataset.value;
    document.getElementById("productImg").src = selectedLogo === "simple" ? "../../assets/images/exemple_logo.png" : "../../assets/images/Osajimi_logo.png";
    updatePriceExtras();
  });
});

qtyInputExtras.addEventListener("input", () => {
  if (qtyInputExtras.value < 1) qtyInputExtras.value = 1;
  updatePriceExtras();
});

function getDiscountExtras(qty) {
  if (qty >= 3) return 0.15;
  if (qty === 2) return 0.1;
  return 0;
}

function updatePriceExtras() {
  const qty = parseInt(qtyInputExtras.value);
  const unitPrice = priceTableExtras[selectedLogo];
  const discount = getDiscountExtras(qty);
  const totalPrice = unitPrice * qty * (1 - discount);
  priceSpanExtras.textContent = totalPrice.toFixed(2) + "€";

  tableBodyExtras.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const rowDiscount = getDiscountExtras(i);
    const rowPrice = priceTableExtras[selectedLogo] * (1 - rowDiscount);
    const rowTotal = rowPrice * i;
    const row = `<tr>
      <td>${i}</td>
      <td>${rowPrice.toFixed(2)}€</td>
      <td>${rowTotal.toFixed(2)}€</td>
    </tr>`;
    tableBodyExtras.innerHTML += row;
  }
}

updatePriceExtras();

