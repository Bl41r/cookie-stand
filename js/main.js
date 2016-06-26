'use strict';

var myForm = document.getElementById('myForm');
var buyLink = document.getElementById('buy');

function openOrderForm(event) {
  window.open('orderform.html');
}

buyLink.addEventListener('click', openOrderForm, false);
