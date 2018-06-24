'use strict';
console.log('utils');

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function openMenue(x) {
    x.classList.toggle("change");
    var elMenu = document.querySelector(".menu");
    elMenu.classList.toggle("show-menu");
    elMenu.classList.toggle("open");

}