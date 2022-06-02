let socket = io();

let Felix;

let catSprite = [];
let box;
let BG;
let velo = 8;
let BgPos = 0;
let boxes = [];


function preload() {
  BG = loadImage('assets/fondo.jpg');
  box = loadImage('assets/caja.jpg');
  catSprite = [loadImage('assets/gato1.png'),loadImage('assets/gato2.png')]
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    Felix = new CAT(30,660,catSprite);
    for (let i = 0; i <2; i++) {
        boxes.push(new OBJ(100+(1000*i),765,10,10,box))
        
    }
}

function draw() {
    background(0, 15);

    image(BG,BgPos,0);
    Felix.draw();
    
    BgPos-= velo;

    boxes.forEach(element => {
        element.draw();
    });


}

function mouseClicked() {
        console.log("hi");
        Felix.setSalto(true);
}
