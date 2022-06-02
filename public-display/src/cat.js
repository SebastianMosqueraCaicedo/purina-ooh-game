/*
 * CAT
 *
 * se le entrega una posicion inicial en X y Y,
 * ademas de una imagen. El gato salta, modificando
 * solo su posicion en Y, y tendra una funcion
 * de contacto, que recibe un objeto obstaculo
 * y verifica el contacto, en caso si, retorna true
 *
*/

class CAT {
	constructor(xPos, yPos, img){
		this.xPos = xPos;
		this.yPos = yPos;
		// hitbox
		this.wide = 90;
		this.high = 90;
		// siempre vuelve a esta posicion
		this.img = img;
		//jp
		this.jumpCondition = false;
		this.jumpTime = 40;
		this.jmp = 10;

	}

	// TODO: "animaciones"
	draw(){
	//	image(this.img, this.xPos, this.yPos, this.wide, this.high);
	rect(this.xPos, this.yPos, this.wide, this.high);

	this.salting();

	}

	salting(){

		if (this.jumpCondition){
			this.jumpTime--;
			this.yPos -= this.jumpTime/5
		}

		if (this.jumpTime === -39){
			this.jumpCondition =false;
			this.jumpTime = 40
		}


	}

	setSalto(estado){
		this.jumpCondition = estado;
	}
	getSalto(){
		this.jumpCondition;
	}

	// recibe un arreglo de obstaculos y compara hitboxes
	contact(objArray){
		for(let i = 0; i < objArray.length; i++){
			if( (this.xPos+(this.wide/2) > 
				objArray[i].xPos-(objArray[i].wide/2) && 
				this.xPos-(this.wide/2) <
				objArray[i].xPos+(objArray[i].wide/2) &&
				this.yPos-(this.high/2) <
				objArray[i].yPos+(objArray[i].high/2))) {

				return true;
			} else {return false;}
		}
	}
}
