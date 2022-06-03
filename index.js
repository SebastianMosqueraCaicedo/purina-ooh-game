// Requerimientos
const express = require('express');
const { Server } = require( 'socket.io' );
const cors = require('cors');
// const { SerialPort, ReadlineParser} = require('serialport');
const app = express();
const httpServer = app.listen(5050);
const ioServer = new Server(httpServer);

//Aquí traemos firebase
const db = require('./firebaseConfig');

const addParticipant = async function (participant) {
    const res = await db.collection('participants').add(participant);
    console.log('Added document with ID: ', res.id);
}

// Usuarios
const staticDisplay = express.static('public-display');
const staticMovile = express.static('public-movile');
app.use('/display', staticDisplay);
app.use('/movile', staticMovile);
app.use(express.json());
app.use(cors({
    origin: '*'
}));

// info a guardar en servidor
/* cuanta gente pasa?
 * cuanta gente coge recompensa
 * cuanta gente coge codigo
 * cuanto tienpo se tardan?
 * estado de la maquina
*/
let emailArray = [];
let arregloMaquinas = [
	{numero:0, gifts:0, funcional:false}
]

// cantidad de personas que...
let cantPasa = 0;
let cantJuega = 0;
let cantGift = 0;
let cantCodigo = 0;

// tiempo que se tardan en completar
let arregloTiempo = [];
let tiempoPromedio = 0;

// funciones a comunicar con servidor
ioServer.on('connection', (socket) => {
	socket.on('nuevaMaquina', (numeroMaquina) => {
		arregloMaquinas.push({numero: numeroMaquina, gifts: 50, funcional:false});
	});

	socket.on('actualizaMaquina', (objetoMaquina) => {
		// busca la maquina por numero en el arreglo, y la actualiza
	});

	let tPromedio = () => {
		if (arregloTiempo.length > 0){
			let suma = 0;
			for (let i=0; i < arregloTiempo.length; i++){
				suma += arregloTiempo[i];
			}
			let end = suma / arregloTiempo.length;

			return end;
		} else {
			return 0
		}
	}
	// es redundante?
	tiempoPromedio = tPromedio;
})

// funciones a comunicar con arduino

/*const n1 = new Number(9600);

const protocolConfiguration = {
	path: '/dev/ttyACM0',
	baudrate: n1
}

const port = new SerialPort(protocolConfiguration);
const parser = port.pipe (new ReadlineParser());

parser.on('data', (data) => {

	let intData = parseInt(data);
	if (intData === 1) {
		ioServer.emit('jumping', true);
	}
})*/

app.post('/participant', (request, response) => {
    console.log(request.body)
    addParticipant(request.body);
    response.end();
    //console.log(players);
});