const body = document.body;

const IMG_NUM = 5;

function paintImg(number){
    const img = new Image();
    img.src = `image/${number}.jpg`;
    img.classList.add("backImg");
    body.appendChild(img);
};

function genRanNum(){
    const number = Math.floor(Math.random() * 5) + 1;
    return number;
};

function init(){
    const randomNum = genRanNum();
    paintImg(randomNum);
};

init();