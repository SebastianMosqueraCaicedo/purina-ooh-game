let socket = io();

let Felix;
let screens = 0;
let catSprite = [];
let Counters = [];
let box;
let tuto;
let BG;
let final;
let started = false;

let velo = 8;
let BgPos = -0;
let boxes = [];
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

function hitboxesContact(a,b){

  if (dist(a.x+106,a.y+106,b.x+53,b.y+53) < 160){
    screens = 2;
    console.log("touch")
  }

}

function preload() {
  BG = loadImage('assets/fondo.png');
  final = loadImage('assets/pantallafinal.jpg');
  box = loadImage('assets/caja.jpg');
  tuto = loadImage('assets/tuto.png');
  catSprite = [loadImage('assets/gato1.png'),loadImage('assets/gato2.png')];
  Counters = [loadImage('assets/count1.png'),loadImage('assets/count2.png'),
  loadImage('assets/count3.png')];
}


function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);

    Felix = new CAT(30,660,catSprite);

    for (let i = 0; i < 2; i++) {
      boxes.push(new OBJ(1200+(i*1000),765,1,1,box))
    }
    



    inputName = createInput('');
    inputName.position(windowWidth / 2.25, 250);
    inputName.size(300);
    inputName.hide();

    inputEmail = createInput('');
    inputEmail.size(300);
    inputEmail.position(windowWidth / 2.25, 350);
    inputEmail.hide();

    buttonSkip = createButton('Omitir');
    buttonSkip.position(windowWidth / 2.25, 450);
    buttonSkip.size(300);
    buttonSkip.hide();
    buttonSkip.mousePressed(buttonSkipAction);

    buttonContinue = createButton('Continuar');
    buttonContinue.position(windowWidth / 2.25, 550);
    buttonContinue.hide();
    buttonContinue.size(300);
    buttonContinue.mousePressed(buttonContinueAction);

    startTime = `${hour}:${minutes}:${seconds}`;
        startInteraction = Date.now();
        hasStart = true;
}

let statecounter = 0;
let backcount = 30;

function draw() {
    background(20,0,0);

    

    switch (screens) {
      
      
      case 0:

      image(BG,BgPos,0);
      image(tuto,0,0);

        break;
      
      case 1: 

      image(BG,BgPos,0);

      if (started=== false) {
        image(Counters[statecounter],0,0);
        backcount--;
        if (backcount === 0) {
          statecounter ++;
          backcount = 30;
        }
        if (statecounter === 3){
          started = true
        }
      }


      if (started===true){
      
      Felix.draw();

      boxes.forEach(e => {
        e.draw();
        hitboxesContact(Felix.getpos(),e.getPos())
      });


      if (BgPos- 2000< BG.width * -1 ) {
        screens = 2;
      }
      BgPos-= velo;
    }
        break;

        case 2:

        image(final,0,0);
        textSize(22);

        text('name', windowWidth/2.25, 240);
        fill(0);


        textSize(22);
        text('e-mail', windowWidth/2.25, 340);
        fill(0);
        
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
       
       if (started) {Felix.setSalto(true);
       }
       
        if (!started) {
          screens = 1
        }
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
