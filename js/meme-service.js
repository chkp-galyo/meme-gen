'use strict';

var elCanvas;
var ctx;
var gImgId;
var gColor = 'white';




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


var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


function imgClicked(imgId, elCanvas) {
    // elCanvas = document.querySelector('#canvas');
    elCanvas.width = 500;
    // elCanvas.width = window.innerWidth / 2;
    elCanvas.height = 500;
    elCanvas.fillstyle = gColor;
    // elCanvas.height = window.innerHeight / 2;
    ctx = elCanvas.getContext('2d');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   
    drawImage(imgId)
}


function drawImage(imgId) {
    var img = new Image()
    
    img.src = gImgs[imgId-1].url;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}

function returnGImgs(){
    return gImgs;
}