'use strict';


//TODO - render canvas - drow img, loop on gTxt array.
//TODO - change color on the moadel anf then render canvas
//TODO - div background-img background size cover (instead of current gallery)

var gCanvas;
var gCtx;

// variables used to get mouse position on the canvas
// var $canvas = $("#canvas");
var canvasOffset;
var offsetX;
var offsetY;
var scrollX;
var scrollY;

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// an array to hold text objects
var texts = [];

// this var will hold the index of the hit-selected text
var selectedText = -1;

function createCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCanvas.width = window.innerWidth * 1/2 ;
    gCanvas.height = window.innerHeight* 1/2  ;
    gCtx = gCanvas.getContext('2d');

    if (window.innerWidth <= 600) {
        gCanvas = document.querySelector('#canvas');
        gCanvas.width = window.innerWidth * 1/2;
        gCanvas.height = window.innerHeight * 1/2;
        gCtx = gCanvas.getContext('2d');

    }

    // variables used to get mouse position on the canvas
    // var $canvas = $("#canvas");
    var canvas = $("#canvas");
    console.log(canvas)
    canvasOffset = canvas.offset();
    offsetX = canvasOffset.left;
    offsetY = canvasOffset.top;
    scrollX = canvas.scrollLeft();
    scrollY = canvas.scrollTop();
}

function drawImage() {
    var img = new Image()
    let imgUrl = getImgUrl()
    createCanvas(img)

    img.onload = function () {
        // gCtx.drawImage(img, 0,0, gCanvas.width, gCanvas.height)
        var hRatio = gCanvas.width / img.width;
        var vRatio = gCanvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
    }
    img.src = imgUrl;

}

function drawMovableText() {
    
    // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        gCtx.fillText(text.text, text.x, text.y);
    }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    console.log('mouse down');
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // Put your mousedown stuff here
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}
// done dragging
function handleMouseUp(e) {
    console.log('dragging');
    e.preventDefault();
    selectedText = -1;
}

// also done dragging
function handleMouseOut(e) {
    console.log('done dragging');
    e.preventDefault();
    selectedText = -1;
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
     var mouseX = parseInt(e.clientX - offsetX);
     var mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    drawMovableText();
}

// listen for mouse events
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});

$("#submit").click(function () {

    // calc the y coordinate for this text on the canvas
    var y = texts.length * 40 + 40;

    // get the text from the input element
    var text = {
        text: $("#theText").val(),
        x: 40,
        y: y
    };

    // calc the size of this text for hit-testing purposes
    gCtx.font = "40px Impact";
    text.width = gCtx.measureText(text.text).width;
    text.height = 40;

    // put this new text in the texts array
    texts.push(text);

    // redraw everything
    drawMovableText();

});

function drawText(txt, x, y) {

    gCtx.fillStyle = 'white'
    gCtx.font = '50px Impact'
    gCtx.fillText(txt, x, y)
}


