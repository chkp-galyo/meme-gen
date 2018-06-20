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
            firstLine: '',
            size: 20,
            align: 'left',
            color: 'black',
        }
    ];
}

function drawCanvas() {
    // gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d');
}


function drawImage() {
    var img = new Image();

    img.src = gImgs[gCurrImgId - 1].url;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        gCtx.drawImage(img, 0, 0);
    }
}

function memeToDispaly() {

    gCtx.fillStyle = gMeme.txts.color;
    // gCtx.font = '50px arial'
    gCtx.font = gMeme.txts[0].size + 'px arial';
    gCtx.textAlign = gMeme.txts[0].align;
    gCtx.fillText(gMeme.txts[0].firstLine, 50, 50)
    gCtx.fillStyle = gColor;
    gCtx.strokeText(gMeme.txts[0].firstLine, 50, 50)

}

function drawText() {
    var elTxt = document.querySelector('.firstLine')
    gMeme.txts[0].firstLine = elTxt.value;

    drawImage();
    setTimeout(memeToDispaly, 1);
}

function enlargeFontSize() {
    gMeme.txts[0].size++;

    drawImage();
    setTimeout(memeToDispaly, 1);
}