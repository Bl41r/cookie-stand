var myForm = document.getElementById('myForm');
var buyLink = document.getElementById('buy');

function openOrderForm(event) {
  alert('buy some stuff, dude');
}

buyLink.addEventListener('click', openOrderForm, false);
