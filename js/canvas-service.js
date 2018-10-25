'use strict';

// var gCanvas;
// var gCtx;

// variables used to get mouse position on the canvas
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// an array to hold text objects
var gTexts;

// this var will hold the index of the hit-selected text
var selectedText = -1;


// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = gTexts[textIndex];
    var textWidth = gCtx.measureText(text).width;
    return (x >= text.x && x <= text.x + textWidth && y >= text.y - text.size && y <= text.y);
}



// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    handleDragStart(e);
}

function handleDragStart(e) {
    gTexts = getMemeTxts();
    console.log(gTexts, 'in handle mouse down')
    startX = parseInt(e.clientX - gCanvas.offsetLeft);
    startY = parseInt(e.clientY - gCanvas.offsetTop);
    //mousedown 
    for (var i = 0; i < gTexts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
            console.log('selected:', selectedText);
            return;
        }
    }
}

function handleToucDown(event) {
    handleDragStart(event.touches[0]);
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
    // debugger
    e.preventDefault();
    var mouseX = parseInt(e.clientX - gCanvas.offsetLeft);
    console.log('mouseX', mouseX);
    var mouseY = parseInt(e.clientY - gCanvas.offsetTop);
    console.log('mouseY', mouseY);

    // mousemove 
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = gTexts[selectedText];
    console.log('text', text);
    text.x += dx;
    text.y += dy;
    renderMove();
}

function handleTouchMove(e) {
    if (selectedText < 0) {
        return;
        // debugger
    }
    var touch = e.touches[0];
    e.preventDefault();
    var mouseX = parseInt(touch.clientX - gCanvas.offsetLeft);
    console.log('mouseX', mouseX);
    var mouseY = parseInt(touch.clientY - gCanvas.offsetTop);
    console.log('mouseY', mouseY);

    // mousemove 
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = gTexts[selectedText];
    console.log('text', text);
    text.x += dx;
    text.y += dy;
    renderMove();
}



function renderMove() {

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage();
    for (let i = 0; i < gMeme.txts.length; i++) {
        var text = gTexts[selectedText];;
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${text.size}px Impact`
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 3;
        gCtx.strokeText(text.text, text.x, text.y);
        gCtx.fillText(text.text, text.x, text.y);

        if (i >= 1) {
            addSelector();
            changeTextFocus();
        }
    }
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

    // redraw everything
    renderCanvas();

});


$("#canvas").on({
    'touchstart': function (event) {
        handleToucDown(event);
        //you could do `$(this).trigger('touchmove', e)` but a conventional function call keeps `move` simple.
    },
    'touchmove': function (e) {
        handleTouchMove(e);
    },

    'touchend': function (e) {
        handleMouseUp(e);
    }
});

