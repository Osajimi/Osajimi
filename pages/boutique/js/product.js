const emojiTypeBtns = document.querySelectorAll("#emojiTypeBtns button");
const qtyInput = document.getElementById("productQty");
const priceSpan = document.getElementById("productPrice");
const tableBody = document.querySelector(".option-table tbody");

// Prix par type
const priceTable = {
  statique: 6,
  anime: 12
};

let selectedType = "statique";

// Boutons type emoji
emojiTypeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    emojiTypeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    selectedType = btn.dataset.value;
    document.getElementById("productImg").src =
      selectedType === "statique"
        ? "../../assets/images/statique.png"
        : "../../assets/images/anime.gif";

    updatePrice();
  });
});

// Quantité personnalisée
qtyInput.addEventListener("input", () => {
  if (qtyInput.value < 1) qtyInput.value = 1;
  updatePrice();
});

// Réductions
function getDiscount(qty) {
  if (qty >= 20) return 0.35;
  if (qty >= 15) return 0.30;
  if (qty >= 10) return 0.25;
  if (qty >= 5) return 0.15;
  return 0;
}

// Mise à jour prix + tableau
function updatePrice() {
  const qty = parseInt(qtyInput.value);
  const basePrice = priceTable[selectedType];
  const discount = getDiscount(qty);

  const unitPrice = basePrice * (1 - discount);
  const totalPrice = unitPrice * qty;

  priceSpan.textContent = totalPrice.toFixed(2) + "€";

  // Quantités fixes du tableau
  const quantities = [1, 5, 10, 15, 20];

  tableBody.innerHTML = "";

  quantities.forEach(q => {
    const rowDiscount = getDiscount(q);
    const rowUnitPrice = basePrice * (1 - rowDiscount);
    const rowTotal = rowUnitPrice * q;

    tableBody.innerHTML += `
      <tr>
        <td>${q}</td>
        <td>${rowUnitPrice.toFixed(2)}€</td>
        <td>${rowTotal.toFixed(2)}€</td>
      </tr>
    `;
  });
}

// Initialisation
updatePrice();

