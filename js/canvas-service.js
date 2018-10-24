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
    console.log({ imgUrl })
    img.onload = function () {
        console.log(img)
        
            var hRatio = gCanvas.width / img.width    ;
            var vRatio = gCanvas.height / img.height  ;
            var ratio  = Math.min ( hRatio, vRatio );
            gCtx.drawImage(img, 0,0, img.width, img.height, 0,0,img.width*ratio, img.height*ratio);
            // document.querySelector('.sideContainer').style.display = 'inline-grid';
    }
    img.src = imgUrl;
}
