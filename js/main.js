'use strict'

var gCanvas;
var gCtx;

var gIsFocusDown = true; 


function init() {
    createImgs();
    createCanvas();
    renderImgsGallery();
}

function setMemeImg(id) {
    document.querySelector('#canvas').style.display = 'block';
    document.querySelector('.imgs-container').style.display = 'none';
    document.querySelector('.search-bar').style.display = 'none';
    document.querySelector('.control-box').style.display = 'block';
    setCurrMeme(id);
    drawImageIn();
    gTexts = getMemeTxts();
    console.log(gTexts);
}



function renderCanvas(){
    drawImageIn();
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gMeme.txts[i];
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);

        if (i >= 1) {
            // addArrows();
            addSelector();
            changeTextFocus();
        }
    }
}

function renderImgsGallery() {
    var elGallery = document.querySelector('.imgs-container');
    var imgs = getImgs();
    var strHtml = `<ul id="hexGrid">`;

    var strHtmls = imgs.map(function (img) {
        if(img.disply){
            return `
            <li class="hex">
            <div class="hexIn">
                <a class="hexLink" href="#">
                <img src="meme-imgs/${img.id}.jpg" class="img img-${img.id}" onclick="setMemeImg('${img.id}')">
                </a>
            </div>
            </li>`
        }
    });
    elGallery.innerHTML = strHtml + strHtmls.join('')+`</ul>`;
}


function backToGallery() {
    document.querySelector('#canvas').style.display = 'none';
    document.querySelector('.control-box').style.display = 'none';
    document.querySelector('.imgs-container').style.display = 'block';
    document.querySelector('.search-bar').style.display = 'block';
    initializeDisply();
    renderImgsGallery();
    // init();

}

function onSearchImg(keyword, event) {
    var imgs = getImgs();
    var imgsFilter = imgs.filter(function (img) {
        var image = img;
        for (var i = 0; i < image.keywords.length; i++) {
            if (image.keywords[i] === keyword) {
                img.disply = true;
                break;}
            else{
                img.disply = false
            }
        }   
    });
    console.log(imgsFilter);
    renderImgsGallery();
}

function createCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth * 1 / 2;
    gCanvas.height = window.innerHeight * 1 / 2;
    gCtx = gCanvas.getContext('2d');

    if (window.innerWidth <= 550) {
        gCanvas = document.querySelector('#canvas');
        gCanvas.width = window.innerWidth * 98 / 100;
        gCanvas.height = window.innerHeight * 45 / 100;
        gCtx = gCanvas.getContext('2d');
    }
}


function changeTextFocus() {
    
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gMeme.txts[i];
        var iString = i.toString();
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);

        if (iString === gTextFocus || i === gTextFocus) {
            gCtx.strokeStyle = 'blue';
            gCtx.strokeText(text.text, text.x, text.y);
            gCtx.fillText(text.text, text.x, text.y);
        }
    }
}

function changeFocus() {

if (gTextFocus === 0) gIsFocusDown = true;
else if (gTextFocus === gMeme.txts.length-1) gIsFocusDown = false;

if (gIsFocusDown) {
    gTextFocus++;
} else gTextFocus--; 
    
    changeTextFocus();
}

function addSelector() {
    var elSelector = document.querySelector('.focusSelect');
    elSelector.style.display = 'inline';
}

function downloadCanvas(elLink) {
    drawImageIn();
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gMeme.txts[i];
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);
    
    }
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my-meme.jpg';
}
