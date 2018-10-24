'use strict';

var gCanvas;
var gCtx;


function createCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth * 1 / 2;
    gCanvas.height = window.innerHeight * 1 / 2;
    gCtx = gCanvas.getContext('2d');

    if (window.innerWidth <= 550) {
        gCanvas = document.querySelector('#canvas');
        gCanvas.width = window.innerWidth * 5/6;
        gCanvas.height = window.innerHeight * 5/6;
        gCtx = gCanvas.getContext('2d');

    }
}

function drawImage() {
    var img = new Image()
    let imgUrl = getImgUrl()
    // const imageDiamRat = img.width / img.height;
    img.onload = function () {
        // gCtx.drawImage(img, 0,0, gCanvas.width, gCanvas.height)

        var hRatio = gCanvas.width / img.width;
        var vRatio = gCanvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
        // document.querySelector('.sideContainer').style.display = 'inline-grid';
    }
    img.src = imgUrl;
}

function drawText(txt) {
    gCtx.fillStyle = 'black'
    gCtx.font = '50px Impact'
    gCtx.fillText(txt, 200, 200)
}

function addMoreTxt() {
    var elInpustContainer = document.querySelector('.txt-inputs-container');
    elInpustContainer.innerHTML += `<input id="custom-text" style="width: 80%;" onchange="drawText(this.value)" value="your message" type="text">`;
}
