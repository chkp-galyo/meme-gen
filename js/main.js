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
}
