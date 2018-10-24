'use strict'
var gImgs = [];

var gMeme = {
    selectedImgId: 5,
    txts: [
        {
            line: 'I never eat Falafel', size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getImgs() {
    return gImgs;
}

function createImg(id) {
    var img = {
        id: id,
        url: `meme-imgs/${id}.jpg`,
        keywords: []
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

