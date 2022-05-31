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
	constructor(xPos, yPos, vel, img){
		this.xPos = xPos;
		this.yPos = yPos;
		// hitbox
		this.wide = 10;
		this.high = 10;
		// siempre vuelve a esta posicion
		this.initialPos = yPos;
		this.vel = vel;
		this.img = img;

		this.jmp = 10;
	}

	// TODO: "animaciones"
	draw(){
		image(this.img, xPos, yPos, this.wide, this.high);
	}

	// TODO salto bonito, como se hace?
	jump(input){
		if(input && this.yPos <= this.initialPos){
			this.yPos += this.jmp;
		}
		if(this.jmp >= -10){
			this.jmp -= 2;
		}
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
