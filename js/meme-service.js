'use strict';

var gElCanvas;
var gCtx;
var gColor = 'white';

var gCurrImgId;
var imgNextId;
var gMeme = {}


var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy', 'movies'] },
{ id: 2, url: 'img/2.jpg', keywords: ['happy', 'dance', 'movies'] },
{ id: 3, url: 'img/3.jpg', keywords: ['angry'] },
{ id: 4, url: 'img/4.jpg', keywords: ['love'] },
{ id: 5, url: 'img/5.jpg', keywords: ['happy', 'win', 'baby'] },
{ id: 6, url: 'img/6.jpg', keywords: ['sleep', 'baby', 'dog'] },
{ id: 7, url: 'img/7.jpg', keywords: ['sleep', 'cat'] },
{ id: 8, url: 'img/8.jpg', keywords: ['funny', 'movies'] },
{ id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
{ id: 10, url: 'img/10.jpg', keywords: ['funny'] },
{ id: 11, url: 'img/11.jpg', keywords: ['happy'] },
{ id: 12, url: 'img/12.jpg', keywords: ['funny'] },
{ id: 13, url: 'img/13.jpg', keywords: ['funny', 'movies'] },
{ id: 14, url: 'img/14.jpg', keywords: ['happy', 'dance'] },
{ id: 15, url: 'img/15.jpg', keywords: ['angry'] },
{ id: 16, url: 'img/16.jpg', keywords: ['funny', 'baby'] },
{ id: 17, url: 'img/17.jpg', keywords: ['funny', 'dog'] },
{ id: 18, url: 'img/18.jpg', keywords: ['love', 'sport'] },
{ id: 19, url: 'img/19.jpg', keywords: ['angry'] },
{ id: 20, url: 'img/20.jpg', keywords: ['serious', 'movies'] },
{ id: 21, url: 'img/21.jpg', keywords: ['happy', 'movies'] },
{ id: 22, url: 'img/22.jpg', keywords: ['happy'] },
{ id: 23, url: 'img/23.jpg', keywords: ['funny', 'movies'] },
{ id: 24, url: 'img/24.jpg', keywords: ['putin', 'funny'] },
{ id: 25, url: 'img/25.jpg', keywords: ['funny', 'movies'] },
];


function galeryImgsToDispaly() {
    return gImgs;
}

function imgClicked(imgId, elCanvas) {

    gElCanvas = elCanvas;
    gCurrImgId = imgId;

    createMeme();
    drawCanvas();
    drawImage();

    
}

function createMeme() {

    gMeme.selectedImgId = gCurrImgId;
    gMeme.txts = [
        {
            memeText: '',
            size: 40,
            align: 'left',
            alignY: 'top',
            color: 'black',
            upperCase: false
        }
    ];
}

function drawCanvas() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d');
}


function drawImage() {
    var img = new Image();

    img.src = gImgs[gCurrImgId - 1].url;
    img.onload = function () {
        canvas.width = 500;
        canvas.height = canvas.width / (img.width/img.height);
        gCtx.drawImage(img, 0, 0);
    }
}

function memeToDispaly() { // for loop for gMeme length
    var left;
    var top;
    for (var i = 0; i < gMeme.txts.length; i++){

    
    gCtx.fillStyle = gMeme.txts[i].color;
    gCtx.font = gMeme.txts[i].size + 'px arial';
    gCtx.textAlign = gMeme.txts[i].align;
    gCtx.textAlignY = gMeme.txts[i].alignY;

    switch (gMeme.txts[i].align) {
        case 'left':
            left = getCanvasLeft();
            top = top;
            break;
        case 'center':
            left = getCanvasCenter();
            top = top;
            break;
        case 'right':
            left = getCanvasRight();
            top = top;
            break;
    }

    switch (gMeme.txts[i].alignY) {
        case 'top':
            left = left;
            top = getCanvasTop();
            break;
        case 'center-y':
            left = left;
            top = getCanvasCenterY();
            break;
        case 'bottom':
            left = left;
            top = getCanvasBottom();
    }

    console.log(left, top)

    // drawOnCanvas(left, top) 

    // gCtx.fillStyle = gColor;
    if (gMeme.txts[i].upperCase) {
        var upperCaseText = gMeme.txts[i].memeText.toUpperCase();
        gMeme.txts[i].memeText = upperCaseText;
    }
    gCtx.fillText(gMeme.txts[i].memeText, left, top + gMeme.txts[i].size)
    // gCtx.strokeText(gMeme.txts[i].memeText, 50, 50)
    }
}


// for all those functions send an i from btn clicked on HTML

function drawText(ev, line) {
    console.log(line)
    console.log(ev.target.value)
    // var elTxt = document.querySelector('.first-line')
    var elTxt = ev.target.value;
    gMeme.txts[line].memeText = elTxt;
    redrawCanvas(line)
}

function increaseFontSize(line) {
    gMeme.txts[line].size += 5;
    redrawCanvas(line)
}

function decreaseFontSize(line) {
    gMeme.txts[line].size -= 5;
    redrawCanvas(line)
}

function changeTextColor(ev, line) {
    var color = ev.target.value;
    gMeme.txts[line].color = color;
    gColor = color;
    redrawCanvas(line)
}

function alignText(textAlign, line) {
    gMeme.txts[line].align = textAlign;
    redrawCanvas(line)
}

function alignTextY(textAlignY, line) {
    gMeme.txts[line].alignY = textAlignY;
    redrawCanvas(line)
}

function redrawCanvas() {
    drawImage();
    setTimeout(memeToDispaly, 0);
}

function getCanvasLeft() {
    return gElCanvas.width * 0.1;
}

function getCanvasCenter() {
    return gElCanvas.width / 2;
}

function getCanvasRight() {
    return gElCanvas.width - 50;
}

function getCanvasTop() {
    return gElCanvas.height * 0.1;
}

function getCanvasCenterY() {
    return gElCanvas.height / 2;
}

function getCanvasBottom() {
    return gElCanvas.height - 100;
}

function upperCaseFont(line) {
    // var upperCaseText = gMeme.txts[line].memeText.toUpperCase();
    // gMeme.txts[line].memeText = upperCaseText;
    gMeme.txts[line].upperCase = true;
    redrawCanvas(line);
}

function lowerCaseFont(line) {
    var lowerCaseText = gMeme.txts[line].memeText.toLowerCase();
    gMeme.txts[line].memeText = lowerCaseText;
    gMeme.txts[line].upperCase = false;
    redrawCanvas(line);
}

function clearLine(input, line) {
    gMeme.txts[line].memeText = '';
    document.querySelector(input).value = '';
    redrawCanvas(line);
}











