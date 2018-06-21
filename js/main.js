'use strict';

function init(){
    renderImgs();
}

function renderImgs(){
    var allImgs = galeryImgsToDispaly();
    var strHtml = '<ul class="container galery-imgs-container flex row flex-wrap clean-list">';
    for (var i = 0; i < allImgs.length; i++){
        var currImg = allImgs[i]
        strHtml += `<li class="galery-img"><div style="background-image: url('${currImg.url}')" id="${currImg.id}" class="img img-${currImg.id}" onclick="onImgClick(${currImg.id})"></div></li>`
    }
    strHtml += '</ul>'
    document.querySelector('.galery').innerHTML = strHtml;
}

function onImgClick(imgId) {
    var elGalery = document.querySelector(".galery");
    elGalery.classList.add("hidden");

    var elCanvas = document.querySelector("#canvas");
    elCanvas.classList.remove("hidden");
    imgClicked(imgId, elCanvas);
    showEditor();
}

function backToGallery(){
    var elGalery = document.querySelector(".galery");
    elGalery.classList.remove("hidden");

    var elCanvas = document.querySelector("#canvas");
    elCanvas.classList.add("hidden");

    var elEditor = document.querySelector('.meme-editor-container');
    elEditor.classList.remove('flex');

    var elBtnBack = document.querySelector('.btn-back');
    elBtnBack.classList.add('hidden');

    var elSecondLine = document.querySelector('.meme-editor-line2');
    elSecondLine.classList.remove('flex');

    var elAddLineBtn = document.querySelector('.btn-add-line')
    elAddLineBtn.classList.remove('hidden');

}

function showEditor() {
    var elEditor = document.querySelector('.meme-editor-container');
    elEditor.classList.add('flex');

    var elBtnBack = document.querySelector('.btn-back');
    elBtnBack.classList.remove('hidden');
}

function addLine(elBtn) {
    var elSecondLine = document.querySelector('.meme-editor-line2');
    elSecondLine.classList.add('flex');
    elBtn.classList.add('hidden');
    }
