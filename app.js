// Week 2 Lab created on 6/20/16
// cookie-stand project - David Smith
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////
// Store owner can modify storeData and hourNames:
var storeData = [ // format: ['store name', minCustomers/hr, maxCustomers/hr, avgCookiePerSale]
  ['First And Pike', 23, 65, 6.3],
  ['SeaTac Airport', 3, 24, 1.2],
  ['Seattle Center', 11, 38, 3.7],
  ['Capitol Hill', 20, 38, 2.3],
  ['Alki', 2, 16, 4.6]
];
var hourNames = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var open_locations = [];  // Generated in code, leave blank

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
  this.getDailySales = function() { // method gets sales data for one day
    var SalesData = [];
    SalesData = getDailySales(hourNames.length, this.minCust, this.maxCust, this.avgCookiesPerSale);
    this.hourlyCustomers = SalesData[0];
    this.dailySales = SalesData[1];
    this.total = SalesData[2];
  };

  this.renderData = function() {  // method appends one row to data table in HTML
    var tableEl = document.getElementById('DataTable');
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.innerText = this.name;
    trEl.appendChild(thEl);
    var tdElTotal = document.createElement('td'); //appends store daily total
    tdElTotal.innerText = this.total;
    trEl.appendChild(tdElTotal);
    for (var i = 0; i < this.dailySales.length; i++) {  // appends hourly totals
      var tdEl = document.createElement('td');
      tdEl.innerText = String(this.dailySales[i]);
      trEl.appendChild(tdEl);
    }
    tableEl.appendChild(trEl);
  };
};
// Global Functions
// Function from mdn
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
};
//gets daily sales for all stores
function compoundSalesData(locations) {
  for (var loc = 0; loc < locations.length; loc++) {
    locations[loc].getDailySales();
  }
}

function createStores() {
  for (var i = 0; i < storeData.length; i++){
    var tmpStore = new Store(storeData[i][0], storeData[i][1], storeData[i][2], storeData[i][3]);
    open_locations.push(tmpStore);
  }
}

function displayDataTable(locations) {
  var tableEl = document.getElementById('DataTable');
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  var thEl = document.createElement('th');
  trEl.appendChild(thEl);  //blank spot
  thEl = document.createElement('th');    //add daily total column heading
  thEl.innerText = 'Daily Location Total';
  trEl.appendChild(thEl);
  //loop to add remaining headings based on hourNames
  for (var i = 0; i < hourNames.length; i++) {
    thEl = document.createElement('th');
    thEl.innerText = hourNames[i];
    trEl.appendChild(thEl);
  }
  //first row done, now loops for all locs
  for (var i = 0; i < open_locations.length; i++) {
    open_locations[i].renderData();
  }
  //calc totals row
  totalsRow = [];
  totalsRow[0] = 0;
  for (t = 0; t < open_locations.length; t++) {
    totalsRow[0] += open_locations[t].total;
  }
  for (var k = 0; k < hourNames.length; k++) {
    var hourTotal = 0;
    for (var l = 0; l < open_locations.length; l++) {
      hourTotal += open_locations[l].dailySales[k];
    }
    totalsRow.push(hourTotal);
  }
  // display totals stretch-goal row
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
  tableEl.appendChild(trEl);
};

// Main programming loop
createStores();
compoundSalesData(open_locations);
displayDataTable(open_locations);
