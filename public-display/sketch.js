let socket = io();

let Felix;

let catSprite = [];
let box;
let BG;
let velo = 8;
let BgPos = 0;


function preload() {
  BG = loadImage('assets/fondo.png');
  catSprite = [loadImage('assets/gato1.png'),loadImage('assets/gato2.png')]
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    Felix = new CAT(30,660,catSprite);
}

function draw() {
    background(0, 15);

    image(BG,BgPos,0);
    Felix.draw();
    
    BgPos-= velo;

}

function mouseClicked() {
        console.log("hi");
        Felix.setSalto(true);
}
