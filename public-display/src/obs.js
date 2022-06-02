/*
 * OBJECT
 *
 * tiene posicion en X y Y, Ancho y Alto
 * y tiene una imagen, nada mas
 *
*/

class OBJ {
	constructor(xPos, yPos, wide, high, img){
		this.xPos = xPos;
		this.yPos = yPos;

		this.wide = wide;
		this.high = high;

		this.img;
	}
	
	draw(){
		// image(this.img, this.xPos, this.yPos, this.wide, this.high);
		rect(this.xPos, this.yPos, this.wide, this.high);
	}
}
