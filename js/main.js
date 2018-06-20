'use strict';

function onImgClick(imgId) {
    var elGalery = document.querySelector(".galery");
    elGalery.classList.add(".hidden");

    var elCanvas = document.querySelector("#canvas");
    elCanvas.classList.remove(".hidden");
    imgClicked(imgId, elCanvas);
}