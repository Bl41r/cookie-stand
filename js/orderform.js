'use strict';

var pendingOrders = [];
var orderForm = document.getElementById('orderForm');

function newOrder() {
  event.preventDefault();
  var order = [];
  order[0] = document.getElementById('name').value;
  order[1] = document.getElementById('addy').value;
  order[2] = document.getElementById('city').value;
  order[3] = document.getElementById('zip').value;
  order[4] = document.getElementById('cardtype').value;
  order[5] = document.getElementById('cc').value;
  order[6] = document.getElementById('exp').value;
  order[7] = document.getElementById('q').value;
  if (confirm('Are you sure you want to make this purchase?')) {
    pendingOrders.push(order);
    alert('Order received!');
    clearOrders();
  }
}

function clearOrders() {
  document.getElementById('name').value = '';
  document.getElementById('addy').value = '';
  document.getElementById('city').value = '';
  document.getElementById('zip').value = '';
  document.getElementById('cardtype').value = 'visa';
  document.getElementById('cc').value = '';
  document.getElementById('exp').value = '';
  document.getElementById('q').value = '';
}

orderForm.addEventListener('submit', newOrder, false);
