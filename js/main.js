'use strict'

var gSelectedImgUrl;


function init() {
    createImgs();
    createCanvas();
    renderImgsGallery();
}

function setMemeImg(url) {
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('.imgs-container').style.display = 'none';
    document.querySelector('.search-bar').style.display = 'none';

    gSelectedImgUrl = url;
    drawImage();
}

function getImgUrl() {
    return gSelectedImgUrl;
}



function renderImgsGallery() {
    var elGallery = document.querySelector('.imgs-container');
    var imgs = getImgs();
    var strHtmls = imgs.map(function (img) {
        var imgUrl = img.url;
        return `<img src="meme-imgs/${img.id}.jpg" class="img img-${img.id}" onclick="setMemeImg('${imgUrl}')">`
    });
    elGallery.innerHTML = strHtmls.join('');
}


function backToGallery() {
    document.querySelector('#canvas').style.display = 'none';
    document.querySelector('.imgs-container').style.display = 'block';
}

function onSearchImg(keyword, event) {
    var imgs = getImgs();
    var imgsFilter = imgs.filter(function (img) {
        var image = img;
        var elImg = document.querySelector(`.img-${img.id}`);
        for (var i = 0; i < image.keywords.length; i++) {
            if (image.keywords[i] === keyword) {
                elImg.style.display = 'block';
                return true;
            }
            else {elImg.style.display = 'none';
            continue};
        }
    });
    console.log(imgsFilter);
    return imgsFilter;
}





