'use strict';

function init() {
    renderImgs(false);
    renderSearchBox()
    createMapSearchKeys();
    rendersearchRibon();
}

function rendersearchRibon() {
    gMapKeysSearchd = searchCountMap();
    var strHTML = `<ul class="memeMapSearch clean-list flex space-around flex-wrap">`;
    // function test()

    for (var key in gMapKeysSearchd) {
        if (gMapKeysSearchd.hasOwnProperty(key)) {
            // console.log(key, valueCounts[key]);
            strHTML += `<li style="margin: 10px"><a href="#" class="key key-${key}" style="font-size: ${gMapKeysSearchd[key] *2 + 10}px" onclick="keySearchClicked(this)">${key}</a></li>`
        }
    }

    strHTML += `</ul>`;
    // console.log(strHTML);

    document.querySelector('#memeMapSearch').innerHTML = strHTML;

}

function renderImgs(isFilter) {
    var allImgs = galeryImgsToDispaly(isFilter);
    var strHtml = '<ul class="container galery-imgs-container flex row flex-wrap clean-list">';
    var renderdImgsIds = [];
    for (var i = 0; i < allImgs.length; i++) {
        var currImg = allImgs[i]
        if (renderdImgsIds.includes(currImg.id)){
            continue;
        }
        renderdImgsIds.push(currImg.id);
        strHtml += `<li class="galery-img"><div style="background-image: url('${currImg.url}')" id="${currImg.id}" class="img img-${currImg.id}" onclick="onImgClick(${currImg.id})"></div></li>`
    }
    strHtml += '</ul>'
    document.querySelector('.galery').innerHTML = strHtml;
}

function onImgClick(imgId) {
    var elGalery = document.querySelector(".galery");
    elGalery.classList.add("hidden");

    document.querySelector('.searchBox').classList.add('hidden');
    var elMapSearchRibon = document.querySelector('#memeMapSearch');
    elMapSearchRibon.classList.add('hidden');

    var elCanvas = document.querySelector("#canvas");
    elCanvas.classList.remove("hidden");
    imgClicked(imgId, elCanvas);
    showEditor();
    window.scrollTo(0, 0);
}

function backToGallery() {
    document.querySelector('.first-line').value = '';
    document.querySelector('.second-line').value = '';
    
    document.querySelector('.searchBox').classList.remove('hidden');

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

    var elMapSearchRibon = document.querySelector('#memeMapSearch');
    elMapSearchRibon.classList.remove('hidden');

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

    var secondLine = {
        memeText: '',
        size: 40,
        align: 'left',
        alignY: 'bottom',
        color: 'red',
        upperCase: false
    };

    gMeme.txts.push(secondLine);
    // gMeme.txts[1]['alignY'] = 'bottom'
}

function onFontChange(value) {
    var elFontFamily = document.querySelector('.font-family');
    console.log(elFontFamily.value);


    changeFont(elFontFamily.value);
}

function downloadCanvas(elLink) {
    // console.log(gElCanvas.toDataURL());
    elLink.href = gElCanvas.toDataURL();
    elLink.download = 'my-meme.jpg';
}

function onSearch(){
    var keyword = document.querySelector('.searchBox').value;
    filterByKeyword(keyword);
}


function renderSearchBox(){
    var strHtml = `<input class="searchBox" list="filter" oninput="onSearch()">
    <datalist id="filter">`;
    for (var i = 0; i < gSearchWords.length; i++){
        strHtml += `<option value="${gSearchWords[i]}">`;
    }
    strHtml += `</datalist>`;
    document.querySelector('.filter').innerHTML = strHtml;
}