const inventoryList = document.getElementById("inventoryList");
const addItemBtn = document.getElementById("addItemBtn");
const addItemForm = document.getElementById("addItemForm");
const submitItem = document.getElementById("submitItem");
const cancelAdd = document.getElementById("cancelAdd");
const search = document.getElementById("search");
const sortBy = document.getElementById("sortBy");

let items = [];

function renderItems() {
  inventoryList.innerHTML = "";
  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Product Name">${item.name}</td>
      <td data-label="Details">${item.details}</td>
      <td data-label="Quantity">${item.quantity}</td>
      <td data-label="Price">$${item.price}</td>
      <td data-label="Actions">
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
      <td data-label="Check Out">
        <button onclick="checkoutItem(${index})">Check out</button>
      </td>
    `;
    inventoryList.appendChild(row);
  });
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const details = document.getElementById("itemDetails").value.trim();
  const quantity = parseInt(document.getElementById("itemQuantity").value);
  const price = parseFloat(document.getElementById("itemPrice").value);

  if (name && details && !isNaN(quantity) && !isNaN(price)) {
    items.push({ name, details, quantity, price });
    renderItems();
    closeModal();
    clearForm();
  }
}

function deleteItem(index) {
  if (`confirm(Are you sure you want to delete "${items[index].name}"?)`) {
    items.splice(index, 1);
    renderItems();
  }
}

function clearForm() {
  document.getElementById("itemName").value = "";
  document.getElementById("itemDetails").value = "";
  document.getElementById("itemQuantity").value = "";
  document.getElementById("itemPrice").value = "";
}

function closeModal() {
  addItemForm.classList.add("hidden");
}

function openModal() {
  addItemForm.classList.remove("hidden");
}

function editItem(index) {
  const item = items[index];
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemDetails").value = item.details;
  document.getElementById("itemQuantity").value = item.quantity;
  document.getElementById("itemPrice").value = item.price;

  openModal();
  submitItem.onclick = () => {
    items[index] = {
      name: document.getElementById("itemName").value,
      details: document.getElementById("itemDetails").value,
      quantity: parseInt(document.getElementById("itemQuantity").value),
      price: parseFloat(document.getElementById("itemPrice").value)
    };
    renderItems();
    closeModal();
    clearForm();
  };
}

function checkoutItem(index) {
    alert(`Checked out: ${items[index].name}`);
  }

addItemBtn.addEventListener("click", () => {
  openModal();
  submitItem.onclick = addItem;
});

cancelAdd.addEventListener("click", closeModal);

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const rows = document.querySelectorAll("#inventoryList tr");
  rows.forEach(row => {
    const match = [...row.children].some(td =>
      td.textContent.toLowerCase().includes(value)
    );
    row.style.display = match ? "" : "none";
  });
});

sortBy.addEventListener("change", () => {
  const type = sortBy.value;
  if (type === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (type === "quantity") {
    items.sort((a, b) => a.quantity - b.quantity);
  } else if (type === "price") {
    items.sort((a, b) => a.price - b.price);
  }
  renderItems();
});

// Initialize with one item
items.push({ name: "Cornetto", details: "chocolate", quantity: 5, price: 5 });
renderItems();