"use strict";

var menu = document.querySelector(".js-fab__menu");
var button = document.querySelector(".js-fab");

function toggleMenu() {
  button.classList.replace("fa-shopping-cart", "fa-times");
  menu.classList.toggle("open");
}

button.addEventListener("click", function() {
  toggleMenu();
});