// Week 2 Lab created on 6/20/16
// cookie-stand project
// GitHub: https://github.com/Bl41r/cookie-stand
/////////////////////////////////////////////////////

// Function from mdn
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumArray(list) {
  var sum = 0;
  for (var i = 0; i < list.length; i++) {
    sum += list[i];
  }
}

function getDailySales(hours, min, max, avgCookiePerSale) {
  var dailySales = [];
  var hourlyCustomers = [];
  for (var i = 0; i < hours; i++) {
    hourlyCustomers[i] = getRandomIntInclusive(min, max);
    dailySales[i] = hourlyCustomers[i] * avgCookiePerSale;
  }
  return [hourlyCustomers, dailySales];
};

var FirstAndPike = {
  min: 23,
  max: 65,
  avgCookiesPerSale: 6.3,
  dailySales: [],
  hourlyCustomers: []
};

FirstAndPike.getDailySales = function() {
  SalesData = [];
  SalesData = getDailySales(14, FirstAndPike.min, FirstAndPike.max, FirstAndPike.avgCookiesPerSale);
  FirstAndPike.hourlyCustomers = SalesData[0];
  FirstAndPike.dailySales = SalesData[1];
};

var SeaTac = {
  min: 3,
  max: 24,
  avgCookiesPerSale: 1.2,
  dailySales: []
};

SeaTac.getDailySales = function() {
  SalesData = getDailySales(14, SeaTac.min, SeaTac.max, SeaTac.avgCookiesPerSale);
  SeaTac.hourlyCustomers = SalesData[0];
  SeaTac.dailySales = SalesData[1];
};

var SeattleCenter = {
  min: 11,
  max: 38,
  avgCookiesPerSale: 3.7,
  dailySales: []
};

SeattleCenter.getDailySales = function() {
  SalesData = getDailySales(14, SeattleCenter.min, SeattleCenter.max, SeattleCenter.avgCookiesPerSale);
  SeattleCenter.hourlyCustomers = SalesData[0];
  SeattleCenter.dailySales = SalesData[1];
};

var CapHill = {
  min: 20,
  max: 38,
  avgCookiesPerSale: 2.3,
  dailySales: []
};

CapHill.getDailySales = function() {
  SalesData = getDailySales(14, CapHill.min, CapHill.max, CapHill.avgCookiesPerSale);
  CapHill.hourlyCustomers = SalesData[0];
  CapHill.dailySales = SalesData[1];
};

var Alki = {
  min: 2,
  max: 16,
  avgCookiesPerSale: 4.6,
  dailySales: []
};

Alki.getDailySales = function() {
  SalesData = getDailySales(14, Alki.min, Alki.max, Alki.avgCookiesPerSale);
  Alki.hourlyCUstomers = SalesData[0];
  Alki.dailySales = SalesData[1];
};
