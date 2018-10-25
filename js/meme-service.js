'use strict'
var gImgs = [];
var gMeme = {
    selectedImgId: 0,
    txts: []
}


var gy = gMeme.txts.length * 120 + 40;

function drawImage() {
    var currImg = gImgs[gMeme.selectedImgId];
    var img = new Image()
    let imgUrl = currImg.url;
    img.src = imgUrl;

    var hRatio = gCanvas.width / img.width;
    var vRatio = gCanvas.height / img.height;
    var ratio = Math.min(hRatio, vRatio);
    gCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);

}

function onSubmit(ev, txt) {
    var y = gMeme.txts[gTextFocus].y;
    var txt = {
        text: $("#theText").val(),
        x: 40,
        y: y,
        size: $("#sizeFont").val(),
        align: 'center',
        color: $("#theColor").val()
    }

    gMeme.txts[gTextFocus] = txt;
    renderCanvas();
}



// //TODO: spin txt
// function spinTxt() {
//     ctx.rotate(Math.PI * 2 / (i * 6));
// }

function capitalLetter() {
    gMeme.txts[gTextFocus].text = gMeme.txts[gTextFocus].text.toUpperCase();
    renderCanvas();
}

function lowerLetter() {
    gMeme.txts[gTextFocus].text = gMeme.txts[gTextFocus].text.toLowerCase();
    renderCanvas();
}

// function centerTxt(){
//     //TODO: text align
//     // gMeme.txts[0].x = 0;
//     renderCanvas();
// }

function addText(txt) {
    var elInput = document.querySelector('.memeText');
    elInput.value = '';

    if (gMeme.txts.length <= 1) { gy = gy + 250 }
    else if (gMeme.txts.length === 2) {
            var tempY = gMeme.txts[0].y;
            gy = tempY + 80;
        }
    else gy = gy + 80

    gMeme.txts.push({
        text: txt,
        x: 40,
        y: gy,
        size: 40,
        align: 'left',
        color: 'white'
    });

    // addToList();
    if (gMeme.txts.length === 0) renderCanvas();
    else {
        gTextFocus++;
        renderCanvas()
    }

}

function getImgs() {
    return gImgs;
}

function setCurrMeme(id) {
    gMeme.selectedImgId = id;
    gMeme.txts = [{
        text: '',
        x: 40,
        y: 40,
        size: 40,
        align: 'left',
        color: 'red'
    }];
    return gMeme;
}

function createImg(id) {
    var img = {
        id: id,
        url: `meme-imgs/${id}.jpg`,
        keywords: [],

    }
    return img;
}

function createImgs() {
    for (let i = 0; i < 24; i++) {
        var img = createImg(i);
        gImgs.push(img);
    }
    addKeywords(0, 'cartoons', 'toy story');
    addKeywords(1, 'nature', 'dance');
    addKeywords(2, 'trump', 'president', 'usa', 'love');
    addKeywords(3, 'dog', 'dogs', 'cute', 'love');
    addKeywords(4, 'baby', 'cute', 'sleep', 'dog');
    addKeywords(5, 'baby', 'angry');
    addKeywords(6, 'cat', 'keyboard', 'sleep');
    addKeywords(7, 'suit', 'man', 'hands');
    addKeywords(8, 'clown', 'hat');
    addKeywords(9, 'baby', 'fun');
    addKeywords(10, 'bold', 'v', 'man');
    addKeywords(11, 'dance', 'kids', 'happy');
    addKeywords(12, 'you', 'haim', 'hecht');
    addKeywords(13, 'trump', 'point', 'president');
    addKeywords(14, 'shout', 'shouting', 'mad');
    addKeywords(15, 'baby', 'wonder', 'shock');
    addKeywords(16, 'dog', 'yoga');
    addKeywords(17, 'obama', 'usa', 'president', 'teeth');
    addKeywords(18, 'men', 'kiss', 'boxing');
    addKeywords(19, 'man', 'fun');
    addKeywords(20, 'leo', 'wine', 'handsom');
    addKeywords(21, 'man', 'sunglasses');
    addKeywords(22, 'oprah', 'dress', 'red');
    addKeywords(23, 'man', 'fun');

}

function addKeywords(id) {
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === id) {
            continue
        } else {
            gImgs[id].keywords.push(arguments[i]);
        }
    }
}

function updateColor(color) {
    var text = gMeme.txts[gTextFocus];
    text.color = color; 
    gCtx.fillStyle = `${text.color}`
    gCtx.font = `${text.size}px Impact`
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 3;
    gCtx.strokeText(text.text, text.x, text.y);
    gCtx.fillText(text.text, text.x, text.y);
}

function updateFontSize(size) {
    var text = gMeme.txts[gTextFocus];
    text.size = size; 
    drawImage();
    renderCanvas();
}

function onKeyDown() {

}

function onKeyUp() {
    
}

function onKeyRight() {
    
}

function onKeyLeft() {
    
}

// function saveWords() {
//     localStorage.setItem(KEY_USERS, JSON.stringify(gUserSearchWord))
// }

// function getFromStorage(key) {
//     var val = localStorage.getItem(key);
//     return JSON.parse(val)
// }

function responMain() {
    var x = document.getElementById("top-navRespo");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}






