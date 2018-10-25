'use strict'

var gCanvas;
var gCtx;
var gTextFocus = 0;
var gPaint = false; 


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
    drawImage();
}


function renderCanvas() {
    
    drawImage();
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gMeme.txts[i];
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);

        if (i >= 1) {
            addArrows();
            changeTextFocus();
        }
    }
}

function renderImgsGallery() {
    var elGallery = document.querySelector('.imgs-container');
    var imgs = getImgs();
    var strHtml = `<ul id="hexGrid">`;

    var strHtmls = imgs.map(function (img) {
        return `
        <li class="hex">
          <div class="hexIn">
            <a class="hexLink" href="#">
              <img src="meme-imgs/${img.id}.jpg" class="img img-${img.id}" onclick="setMemeImg('${img.id}')">
            </a>
          </div>
        </li>`


    });
    elGallery.innerHTML = strHtml + strHtmls.join('')+`</ul>`;
}


function backToGallery() {
    // document.querySelector('#canvas').style.display = 'none';
    document.querySelector('.imgs-container').style.display = 'block';
    document.querySelector('.search-bar').style.display = 'block';
    document.querySelector('.sideContainer').style.display = 'none';
    // init();

}

function onSearchImg(keyword, event) {
    var imgs = getImgs();
    var imgsFilter = imgs.filter(function (img) {
        var image = img;
        var elImg = document.querySelector(`.img-${img.id}`);
        for (var i = 0; i < image.keywords.length; i++) {
            if (image.keywords[i] === keyword) {
                elImg.style.display = 'block';
                gSearchWord[0].count ++;

                return true;
            }
            else {
                elImg.style.display = 'none';
                continue
            };
        }
    });
    console.log(imgsFilter);
    return imgsFilter;
}

function createCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth * 1 / 2;
    gCanvas.height = window.innerHeight * 1 / 2;
    gCtx = gCanvas.getContext('2d');

    if (window.innerWidth <= 550) {
        gCanvas = document.querySelector('#canvas');
        gCanvas.width = window.innerWidth * 5 / 6;
        gCanvas.height = window.innerHeight * 5 / 6;
        gCtx = gCanvas.getContext('2d');

    }
}

function onKeyUp() {
    if (gTextFocus === 0) changeTextFocus();
    else gTextFocus--; 
    console.log('gFocus', gTextFocus);
    changeTextFocus();
    
}
    
    
function onKeyDown() {
        if (gTextFocus === gMeme.txts.length-1) return
        else gTextFocus++; 
        console.log('gFocus', gTextFocus);
        changeTextFocus();
}

function changeTextFocus() {
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gMeme.txts[i];
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);

        if (i === gTextFocus) {
            gCtx.strokeStyle = 'white';
            gCtx.strokeText(text.text, text.x, text.y);
            gCtx.fillText(text.text, text.x, text.y);
        }
    }
}

function onUpdate(txt) {
    gMeme.txts[gTextFocus].text = txt;
    renderCanvas();
    // gTextFocus = 0;
    changeTextFocus();
}

function addArrows() {
    var elArrowUp = document.querySelector('.btn-arrow-up');
    var elArrowDown = document.querySelector('.btn-arrow-down');
    elArrowDown.style.display = 'inline';
    elArrowUp.style.display = 'inline';
}

// function drowOnMeme() {

//     if (gPaint) {
//         canvas.onmousedown = handleMousedown;
//         canvas.onmousemove = handleMousemove;
//         canvas.onmouseup = handleMouseup;
//     }
//     else {
//         gPaint = true;
//         var canvas = document.getElementById("canvas");
//         var ctx = canvas.getContext("2d");
//         var BB = canvas.getBoundingClientRect();
//         var offsetX = BB.left;
//         var offsetY = BB.top;
    
//         var lastX, lastY;
//         var isDown = false;
    
//         canvas.onmousedown = handleMousedown;
//         canvas.onmousemove = handleMousemove;
//         canvas.onmouseup = handleMouseup;
    
    
//         function handleMousedown(e) {
//             e.preventDefault();
//             e.stopPropagation();
//             lastX = e.clientX - offsetX;
//             lastY = e.clientY - offsetY;
//             isDown = true;
//         }
    
//         function handleMouseup(e) {
//             e.preventDefault();
//             e.stopPropagation();
//             isDown = false;
//         }
    
//         function handleMousemove(e) {
//             e.preventDefault();
//             e.stopPropagation();
    
//             if (!isDown) {
//                 return;
//             }
    
//             var mouseX = e.clientX - offsetX;
//             var mouseY = e.clientY - offsetY;
    
//             ctx.beginPath();
//             ctx.moveTo(lastX, lastY);
//             ctx.lineTo(mouseX, mouseY);
//             ctx.stroke();
    
//             lastX = mouseX;
//             lastY = mouseY;
//         }
//     }
// }

