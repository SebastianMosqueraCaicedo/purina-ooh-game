let socket = io();

let Felix;
let screens = 0;
let catSprite = [];
let box;
let BG;
let velo = 8;
let BgPos = -20000;
//VARIABLES HTML
let inputName;
let inputEmail;
let buttonContinue;
let buttonSkip;
//VARIABLES DEL PARTICIPANTE
let participantEndpoint = 'http://localhost:5050/participant'
let participant = {
    "lead": false,
    "date": "",
    "name": "",
    "email": "",
    "start": "",
    "location": "Jardin Plaza",
    "timestamp": ""
};
let startTime = 0;
let startInteraction = 0;
let endInteraction = 0;
let date = new Date();
let [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
let [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
let userInput;
let sizeButton = 60;
let hasStart = false;

function buttonSkipAction() {
  screen = 2;
  gatherParticipantData(undefined);
  sendParticipant(participant);
}

function buttonContinueAction() {
  screen = 3;
  let participantData = {
    name: inputName.value(),
    email: inputEmail.value(),

  }


  gatherParticipantData(participantData);
  sendParticipant(participant);
  
}

function preload() {
  BG = loadImage('assets/fondo.png');
  catSprite = [loadImage('assets/gato1.png'),loadImage('assets/gato2.png')]
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    Felix = new CAT(30,660,catSprite);
    inputName = createInput('');
    inputName.position(windowWidth / 2, 150);
    inputName.size(300);
    inputName.hide();

    inputEmail = createInput('');
    inputEmail.size(300);
    inputEmail.position(windowWidth / 2, 250);
    inputEmail.hide();

    buttonSkip = createButton('Omitir');
    buttonSkip.position(windowWidth / 2, 350);
    buttonSkip.size(300);
    buttonSkip.hide();
    buttonSkip.mousePressed(buttonSkipAction);

    buttonContinue = createButton('Continuar');
    buttonContinue.position(windowWidth / 2, 450);
    buttonContinue.hide();
    buttonContinue.size(300);
    buttonContinue.mousePressed(buttonContinueAction);

    startTime = `${hour}:${minutes}:${seconds}`;
        startInteraction = Date.now();
        hasStart = true;
}

function draw() {
    background(0, 15);
    switch (screens) {
      case 0: 
      image(BG,BgPos,0);
      Felix.draw();
      if (BgPos < BG.width * -1 ) {
        screens = 1;
      }
      BgPos-= velo;
        break;

        case 1:
        inputEmail.show();
        inputName.show();
        buttonContinue.show();
        buttonSkip.show();
        break;
      
    
      default:
        break;
    }
    

}

function mouseClicked() {
        console.log("hi");
        Felix.setSalto(true);
}


// OBTIENE LA INFORMACIÓN DEL PARTICIPANTE AL TERMINAR EL JUEGO
function gatherParticipantData(p) {
  endInteraction = Math.floor((Date.now() - startInteraction) / 1000)
  console.log(participant)
  hasStart = false;
  if (p != undefined) {
      participant = {
          "lead": true,
          "date": `${month}/${day}/${year}`,
          "name": p.name,
          "email": p.email,
          "start": startTime,
          "location": "Jardin Plaza",
          "timestamp": endInteraction
      };
  } else {
      participant = {
          "lead": false,
          "date": `${month}/${day}/${year}`,
          "name": "",
          "email": "",
          "start": startTime,
          "location": "Jardin Plaza",
          "timestamp": endInteraction
      };
  }
}

async function sendParticipant(participant) {
  let bodyJSON = JSON.stringify(participant);
  const postRequest = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: bodyJSON
  }
  const request = await fetch(participantEndpoint, postRequest);
}
