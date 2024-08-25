// Handle Tabs
function openTab(tabName) {
  var i;
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  var tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  document
    .querySelector(`button[onclick="openTab('${tabName}')"]`)
    .classList.add("active");

  if (tabName === "Reports") {
    updateDailyReports();
  }
}

// Initial tab open
openTab("Sales");

// Handle Sales
const sales = {};

document
  .getElementById("saleForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const product = document.getElementById("product").value;
    const price = parseFloat(document.getElementById("price").value);
    const units = parseFloat(document.getElementById("units").value);
    const totalSaleAmount = price * units;

    if (sales[product]) {
      sales[product].totalAmount += totalSaleAmount;
      sales[product].totalUnits += units;
    } else {
      sales[product] = { totalAmount: totalSaleAmount, totalUnits: units };
    }

    updateSalesList();
    document.getElementById("saleForm").reset();
  });

function updateSalesList() {
  const salesList = document.getElementById("salesList");
  salesList.innerHTML = "";

  for (const product in sales) {
    const li = document.createElement("li");
    li.textContent = `${product}: ₹${sales[product].totalAmount.toFixed(2)} for ${sales[product].totalUnits} units`;
    salesList.appendChild(li);
  }
}

// Handle Expenses
const expenses = [];

document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    expenses.push({ description, amount });

    updateExpenseList();
    document.getElementById("expenseForm").reset();
  });

function updateExpenseList() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach((expense) => {
    const li = document.createElement("li");
    li.textContent = `${expense.description}: ₹${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
  });
}

// Handle Jama
const jamaEntries = [];

document
  .getElementById("jamaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const party = document.getElementById("jamaParty").value;
    const amount = parseFloat(document.getElementById("jamaAmount").value);

    jamaEntries.push({ party, amount });

    updateJamaList();
    document.getElementById("jamaForm").reset();
  });

function updateJamaList() {
  const jamaList = document.getElementById("jamaList");
  jamaList.innerHTML = "";

  jamaEntries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `Jama Entry ${index + 1}: ₹${entry.amount.toFixed(2)} for ${entry.party}`;
    jamaList.appendChild(li);
  });
}

// Handle Baki
const bakiEntries = [];

document
  .getElementById("bakiForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const party = document.getElementById("bakiParty").value;
    const amount = parseFloat(document.getElementById("bakiAmount").value);

    bakiEntries.push({ party, amount });

    updateBakiList();
    document.getElementById("bakiForm").reset();
  });

function updateBakiList() {
  const bakiList = document.getElementById("bakiList");
  bakiList.innerHTML = "";

  bakiEntries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `Baki Entry ${index + 1}: ₹${entry.amount.toFixed(2)} for ${entry.party}`;
    bakiList.appendChild(li);
  });
}

// Handle Daily Reports
function updateDailyReports() {
  const dailyReportList = document.getElementById("dailyReportList");
  dailyReportList.innerHTML = "";

  const totalSales = Object.values(sales).reduce(
    (a, b) => a + b.totalAmount,
    0,
  );
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const totalJama = jamaEntries.reduce((a, b) => a + b.amount, 0);
  const totalBaki = bakiEntries.reduce((a, b) => a + b.amount, 0);
  const netCash = totalSales - totalExpenses + totalJama - totalBaki;

  const liSales = document.createElement("li");
  liSales.textContent = `Total Sales: ₹${totalSales.toFixed(2)}`;
  dailyReportList.appendChild(liSales);

  const liExpenses = document.createElement("li");
  liExpenses.textContent = `Total Expenses: ₹${totalExpenses.toFixed(2)}`;
  dailyReportList.appendChild(liExpenses);

  const liJama = document.createElement("li");
  liJama.textContent = `Total Jama: ₹${totalJama.toFixed(2)}`;
  dailyReportList.appendChild(liJama);

  const liBaki = document.createElement("li");
  liBaki.textContent = `Total Baki: ₹${totalBaki.toFixed(2)}`;
  dailyReportList.appendChild(liBaki);

  const liNetCash = document.createElement("li");
  liNetCash.textContent = `Net Cash: ₹${netCash.toFixed(2)}`;
  dailyReportList.appendChild(liNetCash);
}

// Set the default tab
document.getElementsByClassName("tablink")[0].click();
