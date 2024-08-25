// Handle Tabs
function openTab(tabName) {
    var i;
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
}

// Initial tab open
openTab('Sales');

// Handle Sales
const sales = {};

document.getElementById('saleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const product = document.getElementById('product').value;
    const price = parseFloat(document.getElementById('price').value);

    if (sales[product]) {
        sales[product] += price;
    } else {
        sales[product] = price;
    }

    updateSalesList();
    document.getElementById('saleForm').reset();
});

function updateSalesList() {
    const salesList = document.getElementById('salesList');
    salesList.innerHTML = '';

    for (const product in sales) {
        const li = document.createElement('li');
        li.textContent = `${product}: ₹${sales[product].toFixed(2)}`;
        salesList.appendChild(li);
    }
}

// Handle Expenses
const expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    expenses.push({ description, amount });

    updateExpenseList();
    document.getElementById('expenseForm').reset();
});

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: ₹${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}

// Handle Daily Reports (Placeholder)
function updateDailyReports() {
    const dailyReportList = document.getElementById('dailyReportList');
    dailyReportList.innerHTML = '';

    const totalSales = Object.values(sales).reduce((a, b) => a + b, 0);
    const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
    const netCash = totalSales - totalExpenses;

    const liSales = document.createElement('li');
    liSales.textContent = `Total Sales: ₹${totalSales.toFixed(2)}`;
    dailyReportList.appendChild(liSales);

    const liExpenses = document.createElement('li');
    liExpenses.textContent = `Total Expenses: ₹${totalExpenses.toFixed(2)}`;
    dailyReportList.appendChild(liExpenses);

    const liNetCash = document.createElement('li');
    liNetCash.textContent = `Net Cash: ₹${netCash.toFixed(2)}`;
    dailyReportList.appendChild(liNetCash);
}

// Call updateDailyReports whenever needed, e.g., when switching to the Reports tab
document.querySelector('[onclick="openTab(\'Reports\')"]').addEventListener('click', updateDailyReports);
