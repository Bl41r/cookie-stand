// Week 2 Lab created on 6/20/16
// cookie-stand project
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////

var hourNames = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//note:  8pm removed, because stores close at 8, and thus no sales after close

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

// Objects
var Store = function(name, minCust, maxCust, avgCookiesPerSale) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.dailySales = [];
  this.hourlyCustomers = [];
  this.total = 0;

  this.getDailySales = function() {
    var SalesData = [];
    SalesData = getDailySales(hourNames.length, this.minCust, this.maxCust, this.avgCookiesPerSale);
    this.hourlyCustomers = SalesData[0];
    this.dailySales = SalesData[1];
    this.total = SalesData[2];
  };
};

function createStores() {
  FirstAndPike = new Store('First and Pike', 23, 65, 6.3);
  SeaTac = new Store('SeaTac Airport', 3, 24, 1.2);
  SeattleCenter = new Store('Seattle Center', 11, 38, 3.7);
  CapHill = new Store('Capitol Hill', 20, 38, 2.3);
  Alki = new Store('Alki', 2, 16, 4.6);
}

function displayDataTable(locations) {
  //make table with id of dataTable
  var tableEl = document.createElement('table');
  tableEl.setAttribute('id', 'dataTable');
  dataEntryPoint = document.getElementById('DataStart');
  dataEntryPoint.appendChild(tableEl);
  //add first tr within table
  trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  //add th's within tr
  thEl = document.createElement('th');
  // thEl.innerText = '(blank space here)';
  trEl.appendChild(thEl);
  //add daily total column heading
  thEl = document.createElement('th');
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
    var trEl = document.createElement('tr');
    var thEl = document.createElement('th');
    thEl.innerText = open_locations[i].name;
    trEl.appendChild(thEl);
    //add total
    tdEl = document.createElement('td');
    tdEl.innerText = String(open_locations[i].total);
    trEl.appendChild(tdEl);
    tableEl.appendChild(trEl);
    //add in dailySales[j] (each hours sales for a store)
    for (var j = 0; j < open_locations[i].dailySales.length; j++) {
      var tdEl = document.createElement('td');
      tdEl.innerText = String(open_locations[i].dailySales[j]);
      trEl.appendChild(tdEl);
    }
    tableEl.appendChild(trEl);
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
  //display totals row
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
createStores(); //later: generate stores from an array of data at top
open_locations = [FirstAndPike, SeaTac, SeattleCenter, CapHill, Alki];
compoundSalesData(open_locations);
displayDataTable(open_locations);
