const artTypeBtns = document.querySelectorAll("#artTypeBtns button");
const backgroundBtns = document.querySelectorAll("#backgroundTypeBtns button");
const qtyInputArt = document.getElementById("productQty");
const priceSpanArt = document.getElementById("productPrice");
const tableBodyArt = document.querySelector(".option-table tbody");

/* PRIX DE BASE */
const priceTableArt = {
  fullbody: 60,
  torso: 40,
  face: 25
};

const backgroundModifier = {
  simple: 1,
  complexe: 1.2,
  premium: 1.5,
};

let selectedArt = "fullbody";   // ⚠️ minuscules
let selectedBg = "simple";

/* TYPE D’ART */
artTypeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    artTypeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedArt = btn.dataset.value; // fullbody / torso / face
    updatePriceArt();
  });
});

/* TYPE DE FOND */
backgroundBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    backgroundBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedBg = btn.dataset.value;
    updatePriceArt();
  });
});

/* QUANTITÉ */
qtyInputArt.addEventListener("input", () => {
  if (qtyInputArt.value < 1) qtyInputArt.value = 1;
  updatePriceArt();
});

/* RÉDUCTIONS */
function getDiscountArt(qty) {
  if (qty >= 3) return 0.15;
  if (qty === 2) return 0.10;
  return 0;
}

/* MISE À JOUR PRIX + TABLEAU */
function updatePriceArt() {
  const qty = parseInt(qtyInputArt.value);
  const basePrice = priceTableArt[selectedArt] * backgroundModifier[selectedBg];
  const discount = getDiscountArt(qty);

  const totalPrice = basePrice * qty * (1 - discount);
  priceSpanArt.textContent = totalPrice.toFixed(2) + "€";

  tableBodyArt.innerHTML = "";

  const quantities = [1, 2, 3, 4, 5];

  quantities.forEach(q => {
    const d = getDiscountArt(q);
    const unit = basePrice * (1 - d);
    const total = unit * q;

    tableBodyArt.innerHTML += `
      <tr>
        <td>${q}</td>
        <td>${unit.toFixed(2)}€</td>
        <td>${total.toFixed(2)}€</td>
      </tr>
    `;
  });
}

/* INIT */
updatePriceArt();

