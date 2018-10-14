"use strict";

var buttonOpen = document.getElementById('open');
var buttonClose = document.getElementById('js-closebtn');

function openNav() {
    document.getElementById("js-side-nav").style.width = "250px";
}

function closeNav() {
    document.getElementById("js-side-nav").style.width = "0px";
}


buttonOpen.addEventListener('click', function(e) {
    e.preventDefault();
    openNav();
});

buttonClose.addEventListener('click', function(e) {
    e.preventDefault();
    closeNav();
});