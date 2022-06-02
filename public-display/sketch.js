//let socket = io();

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


/*
function movementButton(event, eventMessage, posX, posY) {
    ellipse(posX, posY, 50, 50);
    if (dist(pmouseX, pmouseY, posX, posY) < 50) {
        socket.emit(event, eventMessage);
        setTimeout(() => {
            event = '0'
            socket.emit('damage', event)
        }, 2000);
    }
};*/


/*
socket.on('positions', (positions) => {

    character.x = map(positions.x, 0, 100, 0, windowWidth);
    character.y = map(positions.y, 0, 100, 0, windowHeight);

});
*/