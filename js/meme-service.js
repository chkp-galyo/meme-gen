'use strict';

var IMGS_KEY = 'galery_imges';
var MAP_SEARCH_KEY = 'map_search_keys'

var gElCanvas;
var gCtx;
var gCurrLine = 0;
var dragOK = false;

var gCurrImgId;
var gMeme = {}
var gSearchWords = ['happy', 'movies', 'dance', 'hertzel', 'angry',
    'love', 'win', 'baby', 'sleep', 'cat', 'funny', 'dog', 'sport', 'serious', 'putin']

var gSelectedFont = 'impact-regular';
var gImgsFiltered = [];
var gKeysSearched = ['happy', 'happy', 'happy', 'happy', 'happy', 'movies', 'happy', 'movies', 'hertzel', 'sleep', 'baby', 'dog', 'sleep', 'baby', 'dog', 'love', 'sport', 'happy', 'movies', 'dance', 'angry', 'love', 'win', 'baby', 'sleep', 'cat', 'funny', 'funny', 'funny', 'funny', 'funny', 'dog', 'sport', 'serious', 'putin'];
var gMapKeysSearchd = {};

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
{ id: 26, url: 'img/26.jpg', keywords: ['funny', 'hertzel'] },
];

var imgNextId = gImgs.length + 1;


function galeryImgsToDispaly(isFilter) {
    createImgs();
    if (isFilter) return gImgsFiltered;
    else return gImgs;
}

function clearFilter() {
    renderImgs(false)
}
var gDrag = false;

function imgClicked(imgId, elCanvas) {
    gElCanvas = elCanvas;
    gCurrImgId = imgId;
    createMeme();
    drawCanvas();
    drawImage();
    canvas.onmousedown = myDown;
    canvas.onmouseup = myUp;

    canvas.addEventListener('touchmove', function() {
        var touch = event.targetTouches[0];
        console.log(touch.clientX)
        for (var i = 0; i < gMeme.txts.length; i++){
            var currMeme = gMeme.txts[i];
            // if(detectHit(currMeme.align, currMeme.alignY, touch.pageX, touch.pageY, currMeme.pos.w, currMeme.pos.h)) {
                if (gDrag && gCurrLine === i){

                    console.log(canvas.width, window.innerWidth);
                    console.log(touch.screenX)

                currMeme.align = touch.screenX;
                currMeme.alignY = touch.screenY;
                
               redrawCanvas();
            }
            event.preventDefault();
        }
        }, false);

        canvas.addEventListener('mousemove', function() {
            console.dir(event.offsetX)
            for (var i = 0; i < gMeme.txts.length; i++){
                if (mouseOverText){
                    console.log('yeah');
                }
            }
            });
      
}


function detectHit(x1,y1,x2,y2,w,h) {
    //Very simple detection here
    // console.log('x1',x1,'y1',y1,'x2',x2,'y2',y2,'w',w,'h',h)
    if(x2-x1>w) return false;
    if(y2-y1>h) return false;
    return true;
  }


  function mouseOverText(line){
        var currMeme = txts[line];
        if (ev.offsetX > currMeme.pos.l &&
            ev.offsetX < currMeme.pos.l + currMeme.pos.w &&
            ev.offsetY > currMeme.pos.t &&
            ev.offsetY < currMeme.pos.t + currMeme.pos.h) {
                return true;
        }
        return false;
  }


function myMove(e) {
    if (dragOK) {
        var currMeme = gMeme.txts[gCurrLine];
        currMeme.align = e.clientX - canvas.offsetLeft - currMeme.pos.w / 2;
        currMeme.alignY = e.clientY - canvas.offsetTop - currMeme.pos.h;
        redrawCanvas()
    }
}

function myDown(ev) {
    var isLineClicked = false;        
    var txts = gMeme.txts;
    for (var i = 0; i < txts.length; i++) {
        var currMeme = txts[i];
        if (ev.offsetX > currMeme.pos.l &&
            ev.offsetX < currMeme.pos.l + currMeme.pos.w &&
            ev.offsetY > currMeme.pos.t &&
            ev.offsetY < currMeme.pos.t + currMeme.pos.h) {
                isLineClicked = true;
            gCurrLine = i;
            dragOK = true;
            canvas.onmousemove = myMove;
            break;
        }
    }
    if (!isLineClicked) {
        gCurrLine = null;
        redrawCanvas();
    }
}

function myUp() {
    console.log('myup');
    dragOK = false;
    canvas.onmousemove = null;
    if (gCurrLine) gMeme.txts[gCurrLine].isSelected = true;
}


function createMeme() {

    gMeme.selectedImgId = gCurrImgId;
    gMeme.txts = [
        {
            memeText: '',
            size: 40,
            align: 'left',
            alignY: 'top',
            color: '#ffffff',
            font: 'impact-regular',
            upperCase: false,
            shadow: false,
            pos: {
                l: 50,
                t: 50,
                w: null,
                h: null
            },
            isSelected: true
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
        canvas.height = canvas.width / (img.width / img.height);
        gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function memeToDispaly() { 
    var left;
    var top;

    for (var i = 0; i < gMeme.txts.length; i++) {
        var currMeme = gMeme.txts[i];
        gCtx.fillStyle = currMeme.color;
        gCtx.font = currMeme.size + 'px ' + currMeme.font;
        gCtx.textAlign = currMeme.align;
        gCtx.textAlignY = currMeme.alignY;

        switch (currMeme.align) {
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
            default:
            left = currMeme.align;
            top = top;
        }

        switch (currMeme.alignY) {
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
                break;
            default:
                left = left;
                top = currMeme.alignY;
        }

        if (currMeme.align < 0) left = 0;
        if (currMeme.alignY < 40) top = 40;  
        if (currMeme.align > gElCanvas.width - currMeme.pos.w) left = gElCanvas.width - currMeme.pos.w;
        if (currMeme.alignY > gElCanvas.height) top = gElCanvas.height;
        if (currMeme.upperCase) {
            var upperCaseText = currMeme.memeText.toUpperCase();
            currMeme.memeText = upperCaseText;
        }
        
        if (currMeme.shadow) {
            gCtx.shadowOffsetX = 5;
            gCtx.shadowOffsetY = 5;
            gCtx.shadowColor = "rgba(0,0,0,0.5)";
            gCtx.shadowBlur = 8;

        }
        
        gCtx.strokeText(currMeme.memeText, left, top);
        gCtx.fillText(currMeme.memeText, left, top)

        var txtWidth = gCtx.measureText(currMeme.memeText).width;
        var txtHeight = currMeme.size;
        var align = currMeme.align;
        drawBgText(i, align, left - 5, top - txtHeight + 5, txtWidth + 10, txtHeight + 5);
    }
}


function drawBgText(line, align, l, t, w, h){
    if (line === gCurrLine){
        gCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    } else {
        gCtx.fillStyle = 'rgba(0, 0, 0, 0)';        
    }
    
    var currMeme = gMeme.txts[line];
    switch (align){
        case 'left':
            gCtx.fillRect(l, t, w, h);
            currMeme.pos.l = l;
            currMeme.pos.t = t;
            currMeme.pos.w = w;
            currMeme.pos.h = h;
            break;
        case 'center':
            gCtx.fillRect(l - w / 2, t, w, h);
            currMeme.pos.l = l - w / 2;
            currMeme.pos.t = t;
            currMeme.pos.w = w;
            currMeme.pos.h = h;
            break;
        case 'right':
            gCtx.fillRect(l - w, t, w, h); 
            currMeme.pos.l = l - w;
            currMeme.pos.t = t;
            currMeme.pos.w = w;
            currMeme.pos.h = h;  
            break;
        default:
            gCtx.fillRect(l, t, w, h); 
            currMeme.pos.l = l;
            currMeme.pos.t = t;
            currMeme.pos.w = w;
            currMeme.pos.h = h;  
    }
}

function handleClick(ev){
    for (var i = 0; i < gMeme.txts.length; i++){
        var currMeme = gMeme.txts[i];
        if (ev.offsetX > currMeme.pos.l &&
            ev.offsetX < currMeme.pos.l + currMeme.pos.w &&
            ev.offsetY > currMeme.pos.t &&
            ev.offsetY < currMeme.pos.t + currMeme.pos.h
        ) {
            gDrag = true;
            gCurrLine = i;
            currMeme.isSelected = true;
            redrawCanvas();
            renderInputVal(currMeme.memeText);
            setTimeout(resetColorInput, 0);
            return;
        } else {
            currMeme.isSelected = false;
            if(gCurrLine) gMeme.txts[gCurrLine].isSelected = true;
        }
    }
}

function onTextHover(ev){
    for (var i = 0; i < gMeme.txts.length; i++){
        var currMeme = gMeme.txts[i];
        if (ev.offsetX > currMeme.pos.l &&
            ev.offsetX < currMeme.pos.l + currMeme.pos.w &&
            ev.offsetY > currMeme.pos.t &&
            ev.offsetY < currMeme.pos.t + currMeme.pos.h
        ) {
        //   document.querySelector('.canvas').style.cursor = 'pointer';
          console.log('on text')
    }
}
}


function checkBorder(){
    // for (var i = 0; i < gMeme.txts; i++){
        var currMeme = gMeme.txts[gCurrLine];
        if (currMeme.pos.l < 0) currMeme.pos.l = 0;
        if (currMeme.pos.t < 0) currMeme.pos.t = 0;  
        console.log('chekc border says ', currMeme.pos.l, currMeme.pos.t)      
    // }
    redrawCanvas();
}

function getCurrColor(){
    var line = checkForSelectedLine()
    return gMeme.txts[line].color;
}


function drawText(input) {
    var line = checkForSelectedLine()
    var elTxt = input.value;
    gMeme.txts[line].memeText = elTxt;
    resetColorInput()
    redrawCanvas(line)
}

function checkForSelectedLine() {
    var line;
    for (var i = 0; i < gMeme.txts.length; i++){
        if (gMeme.txts[i].isSelected) line = i;
    }
    return line;
}

function increaseFontSize() {
    var line = checkForSelectedLine()
    gMeme.txts[line].size += 5;
    redrawCanvas()
}

function decreaseFontSize() {
    var line = checkForSelectedLine()
    gMeme.txts[line].size -= 5;
    redrawCanvas()
}

function changeTextColor(ev) {
    var line = checkForSelectedLine()
    var color = ev.target.value;
    gMeme.txts[line].color = color;
    redrawCanvas()
}

function changeFont(fontFamily) {
    var line = checkForSelectedLine()
    gMeme.txts[line].font = fontFamily;
    redrawCanvas()
}

function toggleShadow() {
    var line = checkForSelectedLine()
    setTimeout(function() {
        (!gMeme.txts[line].shadow) ? gMeme.txts[line].shadow = true : gMeme.txts[line].shadow = false;
    }, 0);
    redrawCanvas();
}

function alignText(textAlign) {
    var line = checkForSelectedLine()
    gMeme.txts[line].align = textAlign;
    redrawCanvas()
}

function alignTextY(textAlignY) {
    var line = checkForSelectedLine()
    gMeme.txts[line].alignY = textAlignY;
    redrawCanvas()
}



function redrawCanvas() {
    drawImage();
    setTimeout(memeToDispaly, 0);
}

function getCanvasLeft() {
    return canvas.width * .05;
}

function getCanvasCenter() {
    return canvas.width / 2;
}

function getCanvasRight() {
    return canvas.width - 10;
}

function getCanvasTop() {
    return canvas.height * .1 ;
}

function getCanvasCenterY() {
    return canvas.height / 2;
}

function getCanvasBottom() {
    return canvas.height - 10;
}

function upperCaseFont() {
    var line = checkForSelectedLine()
    gMeme.txts[line].upperCase = true;
    redrawCanvas(line);
}

function lowerCaseFont() {
    var line = checkForSelectedLine()
    var lowerCaseText = gMeme.txts[line].memeText.toLowerCase();
    gMeme.txts[line].memeText = lowerCaseText;
    gMeme.txts[line].upperCase = false;
    redrawCanvas(line);
}

function clearLine(input) {
    var line = checkForSelectedLine()
    gMeme.txts[line].memeText = '';
    document.querySelector(input).value = '';
    redrawCanvas(line);
}


function handleImageFromInput(ev, onImageReady) {
    onImgClick(1);
    var reader = new FileReader();
    reader.onload = function (event) {
        gImgs.push({id: imgNextId, url: event.target.result, keywords: []})
        gCurrImgId = imgNextId;
        imgNextId++;
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}



function filterByKeyword(keyword) {
    gImgsFiltered = [];
    for (var i = 0; i < gImgs.length; i++) {
        var keywords = gImgs[i].keywords
        for (var j = 0; j < keywords.length; j++) {
            if (keywords[j].indexOf(keyword) !== -1) {
                gImgsFiltered.push(gImgs[i]);
            }
        }
    }
    if (gImgsFiltered.length === 0) {
        console.log('no results found!');
        renderImgs(false);
        return;
    } else {
        renderImgs(true);
    }
}


function searchCountMap() {

    var mapVotesCount = {};

    var res = gKeysSearched.reduce(function (acc, item) {
        acc[item] = (acc[item]) ? acc[item] + 1 : 1;
        return acc;
    }, mapVotesCount)

    console.log('Result:', res);
    return res;
}

function keySearchClicked(elKey) {
    filterByKeyword(elKey.innerText)
    gKeysSearched.push(elKey.innerText);

    saveMapKeys();
    rendersearchRibon();
}

function createImgs() {
    var imgs = loadFromStorage(IMGS_KEY);
    if (!imgs || imgs.length === 0) {
        imgs = gImgs;
    }
    gImgs = imgs;
    saveImgs();
}

function createMapSearchKeys() {

    var mapKeys = loadFromStorage(MAP_SEARCH_KEY);
    if (!mapKeys || mapKeys.length === 0) {
        mapKeys = gKeysSearched;

    }
    gKeysSearched = mapKeys;
    saveMapKeys();
}

function saveImgs() {
    saveToStorage(IMGS_KEY, gImgs);
}

function saveMapKeys() {
    saveToStorage(MAP_SEARCH_KEY, gKeysSearched);
}




// Facebook Code For Share! //

function uploadImg(elForm, ev) {
    ev.preventDefault();
    gCurrLine = null;
    redrawCanvas();
    document.querySelector('.fb-share').innerHTML = '';
    document.getElementById('imgData').value = canvas.toDataURL("image/jpeg");
   
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.fb-share').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('https://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.text()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
}

