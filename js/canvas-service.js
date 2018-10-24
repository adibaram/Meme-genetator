'use strict';

var gCanvas;
var gCtx;


function createCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth / 2;
    gCanvas.height = window.innerHeight / 2;
    gCtx = gCanvas.getContext('2d');
}

function drawImage() {
    var img = new Image()
    let imgUrl = getImgUrl()
    // const imageDiamRat = img.width / img.height;
    console.log('img.width', img.width);
    console.log('img.height', img.height);
    
    console.log({ imgUrl })
    img.onload = function () {
        console.log(img)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    img.src = imgUrl;
}