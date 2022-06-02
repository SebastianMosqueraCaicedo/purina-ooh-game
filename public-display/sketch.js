let socket = io();

let Felix;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    Felix = new CAT(0,windowHeight/2,0,0);
}

function draw() {
    background(0, 15);
    Felix.draw();

}

function mouseClicked() {
        console.log("hi");
        Felix.getSalto(true);
}
