// Week 2 Lab created on 6/20/16
// cookie-stand project - David Smith
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////
// Store owner can modify storeData and hourNames:
var storeData = [ // format: ['store name', minCustomers/hr, maxCustomers/hr, avgCookiePerSale]
  //ideally, the stores added from forms would be added to an external file and loaded here
  ['First And Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capitol Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6]
];
var hourNames = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm'];
var openLocations = [];  // Generated in code, leave blank
var myForm = document.getElementById('myForm');

// Store Object
var Store = function(name, minCust, maxCust, avgCookiesPerSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.dailySales = [];
  this.hourlyCustomers = [];
  this.total = 0;

  // Methods
  this.getDailySales = function() { // method gets sales data for one day, stores in properties
    var SalesData = [];
    SalesData = getDailySales(hourNames.length, this.minCust, this.maxCust, this.avgCookiesPerSale);
    this.hourlyCustomers = SalesData[0];
    this.dailySales = SalesData[1];
    this.total = SalesData[2];
  };

  this.renderData = function() {  // method appends one row to data table in HTML
    renderRow(this);
  };
};
// Global Functions
function getRandomIntInclusive(min, max) {  // Function from mdn
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//validate alphaText
function isAlphaText(text) {
  var valid = 'abcdefghijklmnopqrstuvwxyz -'.split('');
  text = text.toLowerCase().split('');
  var counter = 0;
  var validText = false;
  for (var i = 0; i < text.length; i++) {
    for (var v = 0; v < valid.length; v++) {
      if (text[i] === valid[v]) {
        counter++;
        break;
      }
    }
  }
  if ((counter === text.length) && (text[text.length - 1] !== ' ')) {
    validText = true;
  }
  return validText;
};
//validate integer
function isNum(input) {
  var valid = '0123456789.'.split('');
  input = input.split('');
  var counter = 0;
  var decimalCount = 0;
  var validInt = false;
  for (var i = 0; i < input.length; i++) {
    for (var v = 0; v < valid.length; v++) {
      if (input[i] === valid[v]) {
        counter++;
        if (input[i] === '.') {
          decimalCount++;
        }
        break;
      }
    }
  }
  if ((counter === input.length) && (decimalCount <= 1)) {
    validInt = true;
  }
  return validInt;
}
//gets and fills in sales data for 1 store
function getDailySales(hours, min, max, avgCookiePerSale) {
  var total = 0;
  var dailySales = [];
  var hourlyCustomers = [];
  for (var i = 0; i < hours; i++) {
    hourlyCustomers[i] = getRandomIntInclusive(min, max);
    dailySales[i] = Math.round(hourlyCustomers[i] * avgCookiePerSale);
    total += dailySales[i];
  }
  return [hourlyCustomers, dailySales, total];
}
//gets daily sales for all stores
function compoundSalesData(locations) {
  for (var loc = 0; loc < locations.length; loc++) {
    locations[loc].getDailySales();
  }
}
//used by Store.Data() method
function renderRow(StoreObj) {
  var tableEl = document.getElementById('DataTable');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.innerText = StoreObj.name;
  trEl.appendChild(thEl);
  var tdElTotal = document.createElement('td'); // appends store daily total
  tdElTotal.innerText = StoreObj.total;
  trEl.appendChild(tdElTotal);
  for (var i = 0; i < StoreObj.dailySales.length; i++) {  // appends hourly totals
    var tdEl = document.createElement('td');
    tdEl.innerText = String(StoreObj.dailySales[i]);
    trEl.appendChild(tdEl);
  }
  tableEl.appendChild(trEl);
}
function createStores() {
  openLocations = [];
  for (var i = 0; i < storeData.length; i++){
    var tmpStore = new Store(storeData[i][0], storeData[i][1], storeData[i][2], storeData[i][3]);
    openLocations.push(tmpStore);
  }
}
function addNewTable(event) {
  event.preventDefault();
  var storeName = document.getElementById('storeName');
  var min = document.getElementById('min');
  var max = document.getElementById('max');
  var avg = document.getElementById('avg');
  var newStore = [];
  if ((isNum(min.value)) && (isNum(max.value)) && (isNum(avg.value)) && (isAlphaText(storeName.value)) && (parseFloat(min.value) <= parseFloat(max.value))) {
    newStore[0] = storeName.value;
    newStore[1] = parseFloat(min.value);
    newStore[2] = parseFloat(max.value);
    newStore[3] = parseFloat(avg.value);
    storeData.push(newStore);
    openLocations.push(new Store(newStore[0], newStore[1], newStore[2], newStore[3]));
    openLocations[openLocations.length - 1].getDailySales();
    //delete old totals row
    var oldTable = document.getElementById('DataTable');
    oldTable.removeChild(oldTable.lastChild);
    //display new tr, gen new totals row
    renderRow(openLocations[openLocations.length - 1]);
    printTotals();
  } else {
    alert('Invalid Data Submission');
  }
}
function displayDataTable(locations) {
  var tableEl = document.getElementById('DataTable');
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  var thEl = document.createElement('th');
  trEl.appendChild(thEl);             //blank spot
  thEl = document.createElement('th');    //add daily total column heading
  thEl.innerText = 'Daily Location Total';
  trEl.appendChild(thEl);
  //loop to add remaining headings based on hourNames
  for (var i = 0; i < hourNames.length; i++) {
    var thEl = document.createElement('th');
    thEl.innerText = hourNames[i];
    trEl.appendChild(thEl);
  }
  //first row done, now loop for all locations
  for (var i = 0; i < openLocations.length; i++) {
    openLocations[i].renderData();
  }
  printTotals();
}

function printTotals() {
  //calc and display totals row
  totalsRow = [];
  totalsRow[0] = 0;
  for (t = 0; t < openLocations.length; t++) {
    totalsRow[0] += openLocations[t].total;
  }
  for (var k = 0; k < hourNames.length; k++) {
    var hourTotal = 0;
    for (var l = 0; l < openLocations.length; l++) {
      hourTotal += openLocations[l].dailySales[k];
    }
    totalsRow.push(hourTotal);
  }
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.innerText = 'Totals';
  trEl.appendChild(thEl);
  thEl = document.createElement('td');
  thEl.innerText = String(totalsRow[0]);
  trEl.appendChild(thEl);
  for (var i = 1; i < totalsRow.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.innerText = totalsRow[i];
    trEl.appendChild(tdEl);
  }
  var tableEl = document.getElementById('DataTable');
  tableEl.appendChild(trEl);
}

// Main programming loop
createStores();
compoundSalesData(openLocations);
displayDataTable(openLocations);
myForm.addEventListener('submit', addNewTable, false);
