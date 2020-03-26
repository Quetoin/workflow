class Diapo{
	constructor(){
		this.time = 5000;
		this.images = ["img0","img1","img2","img3","img4"];
		this.intervalDiapo = "";
		this.countDiapo = 0;

		this.elImg = document.getElementById("img");
		this.elPause = document.getElementById("pauseDiapo");
		this.elPlay = document.getElementById("playDiapo");
		this.tabTxt = document.getElementById("textes").getElementsByClassName("txts");
		this.tabCirle = document.getElementById("circlesDiapo").getElementsByClassName("fa-circle");
		this.isPlay = false;

		this.goLeft = document.getElementById("leftDiapo");
		this.goRight = document.getElementById("rightDiapo");

		this.initDiapo();
		this.addEventKeyboard();
	}

	timerDiapo(){
	 //Commence le timer du diapo, en changeant d'img toutes les 5s
		this.countDiapo++; // Augmente compteur

	    if(this.countDiapo == this.images.length){ // Si dernière img, on revient à la première
	    	this.countDiapo = 0;
	    }
	    this.elImg.src = "img/"+this.images[this.countDiapo]+".png";

	    this.isPlay = true;

	   	this.setCorrectWidth();
	    this.displayTxt();
	}

	initDiapo(){
	 // Démarre le setInterval
		this.intervalDiapo = setInterval(e =>this.timerDiapo(),this.time);
	}

	pause(){
	 // Bouton pause : on stoppe l'interval, cache le bouton et affiche "play"
		clearInterval(this.intervalDiapo);
		this.elPause.style.display = "none";
		this.elPlay.style.display = "inline";
		this.isPlay = false;
	}

	play(){
	 // Bouton play : on stoppe l'interval, cache le bouton et affiche "pause"
		this.intervalDiapo = setInterval(e =>this.timerDiapo(),this.time);
		this.elPause.style.display = "inline";
		this.elPlay.style.display = "none";
		this.isPlay = true;
	}

	moveBackward(){ // Flèche de gauche 
		clearInterval(this.intervalDiapo);

		if(this.countDiapo == 0){ // Si on est à la première img
			this.countDiapo = this.images.length-1; // Alors on remets la dernière du tableau
		}else{ // sinon, on recule de 1.
			this.countDiapo--;
		}

		this.elImg.src = "img/"+this.images[this.countDiapo]+".png";

		this.setCorrectWidth();
		this.displayTxt();

		if(this.isPlay){
			this.intervalDiapo = setInterval(e =>this.timerDiapo(),this.time);
		}
		
	}

	moveForward(){ // Flèche de droite
		clearInterval(this.intervalDiapo);

		if(this.countDiapo == this.images.length-1){ // Si on est à la dernière img
			this.countDiapo = 0; // Alors on revient à la première
		}else{
			this.countDiapo++; // Sinon, on avance de 1
		}
		
		this.elImg.src = "img/"+this.images[this.countDiapo]+".png";

		this.displayTxt();
		this.setCorrectWidth();

		if(this.isPlay){
			this.intervalDiapo = setInterval(e =>this.timerDiapo(),this.time);
		}
	}

	displayTxt(){

		for(let i=0;i<this.tabTxt.length;i++){

	    	if(this.countDiapo == i){
	    		this.tabTxt[this.countDiapo].style.display = "inherit";
	    		this.tabCirle[this.countDiapo].style.opacity = "0.6";
	    	}else{
	    		this.tabTxt[i].style.display = "none";
	    		this.tabCirle[i].style.opacity = "1";
	    	}
	    	
	    }
	}

	addEventKeyboard(){
		// ajoute event flèches gauche et droite
		document.addEventListener("keydown", e => {
			let nomTouche = e.key;
			if(nomTouche == "ArrowLeft"){
				this.moveBackward();
			}else if(nomTouche == "ArrowRight"){
				this.moveForward();
			}
		});
	}

	setCorrectWidth(){
		if(this.countDiapo == 4){
			this.elImg.style.width = "90%";
		} else{
			this.elImg.style.width = "auto";
		}
	}
}