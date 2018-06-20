'use strict';

var elCanvas;
var ctx;
var gColor = 'blue';











































function init() {
    elCanvas = document.querySelector('#canvas');
    elCanvas.width = 500;
    // elCanvas.width = window.innerWidth / 2;
    elCanvas.height = 500;
    // elCanvas.fillstyle = gColor;
    // elCanvas.height = window.innerHeight / 2;
    ctx = elCanvas.getContext('2d');
    ctx.fillStyle = gColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // drawImage()
}

function drawImage() {
    var img = new Image()
    img.src = gImgs.url;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}