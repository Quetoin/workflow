class Canvas{
	constructor(el){
		this.canvas = el;
		this.ctx = this.canvas.getContext("2d");
    this.posX = 0;
    this.posY = 0;
    this.isDrawing = false;
    this.canvas.width = 250;
    this.canvas.height = 250;

    // On récupère le décalage du canevas en x et y par rapport aux bords
// de la page
    this.getEvent();
	}

  getEvent(){
    // On ajoute les gestionnaires d'évènements pour mousedown, mousemove
    // et mouseup
    this.canvas.addEventListener('mousedown', e => {
      this.posX = e.pageX - this.canvas.offsetLeft; // Récupère X au click
      this.posY = e.pageY - this.canvas.offsetTop; // Récupère Y au click
      this.isDrawing = true;
    });

    this.canvas.addEventListener('mousemove', e => {
      if (this.isDrawing === true) {
        // si mousedown, alors on dessine avec paramètres X et Y de mousedown + X et Y en tps réel quand mousemove
        this.drawLine(this.posX, this.posY, e.pageX - this.canvas.offsetLeft , e.pageY - this.canvas.offsetTop);
        this.posX = e.pageX - this.canvas.offsetLeft;
        this.posY = e.pageY - this.canvas.offsetTop;
      }
    });

    window.addEventListener('mouseup', e => {
      if (this.isDrawing === true) {
        // mouseup = on dessine la dernière position et on arrête
        this.drawLine(this.posX, this.posY, e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop);
        this.posX = 0;
        this.posY = 0;
        this.isDrawing = false;
        signature = true;
      }
    });

    this.canvas.addEventListener('touchstart', e => {
      let touchObj = e.changedTouches[0];
      this.posX = touchObj.pageX - this.canvas.offsetLeft; // Récupère X au click
      this.posY = touchObj.pageY - this.canvas.offsetTop; // Récupère Y au click
      this.isDrawing = true;
      e.preventDefault();


    });

    this.canvas.addEventListener('touchmove', e => {
      if (this.isDrawing === true) {
        let touchObj = e.changedTouches[0];
        // si mousedown, alors on dessine avec paramètres X et Y de mousedown + X et Y en tps réel quand mousemove
        this.drawLine(this.posX, this.posY, touchObj.pageX - this.canvas.offsetLeft , touchObj.pageY - this.canvas.offsetTop);
        this.posX = touchObj.pageX - this.canvas.offsetLeft;
        this.posY = touchObj.pageY - this.canvas.offsetTop;
        e.preventDefault();
      }
    });

    window.addEventListener('touchend', e => {
      if (this.isDrawing === true) {
        // mouseup = on dessine la dernière position et on arrête
        let touchObj = e.changedTouches[0];
        this.drawLine(this.posX, this.posY, touchObj.pageX - this.canvas.offsetLeft, touchObj.pageY - this.canvas.offsetTop);
        this.posX = 0;
        this.posY = 0;
        this.isDrawing = false;
        signature = true;
        e.preventDefault();
      }
    });

  }

  drawLine(x1, y1, x2, y2){
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 6;
    this.ctx.stroke();
  }

}



