class Timer{
	constructor(ifNew,idEl){

		this.idEl = document.getElementById(idEl);
		this.totalTime = 1200000;
		this.countDownDate = 0;
		this.now = 0;
		this.distance = 0;

	}

	callCountdownResa(varCountDownDate){

		// Si l'appel de la méthode vient de l'ouverture de session, on reprend la fin du countdown
		if(varCountDownDate != "notCountdownFromSession"){
			this.countDownDate = varCountDownDate;
		}else{ // Si l'appel de la méthode vient d'une nouvelle réservation on calcule la fin de countdown
			this.countDownDate = new Date().getTime()+this.totalTime;
		}

		
		if(timerEnCours == false){ // si on n'a pas un timer en cours, alors, on set l'interval
			countdown = setInterval(e => this.initCountdownResa("notSessionStorage"),1000);
		}else{ // si on a un timer en cours, on clear l'interval et on en créé un nouveau
			this.idEl.innerHTML = "Temps restant : 20min";
			clearInterval(countdown);
			countdown = setInterval(e => this.initCountdownResa("notSessionStorage"),1000);
		}	
	}

	initCountdownResa(){

		timerEnCours = true;

		// Détermine maintenant
		this.now = new Date().getTime();

		// Calcul la distance entre la date de fin et maintenant
		this.distance = this.countDownDate - this.now;

		// Calcul le temps en minutes et secondes.
		let minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

		// affiche le résultat dans l'id tps restant.
		this.idEl.innerHTML = "Temps restant : "+minutes + "m " + seconds;
		
		sessionStorage.removeItem('timerEnd');
		sessionStorage.setItem("timeEnd",this.countDownDate);

		// Quand la résa est expiré, affiche un texte et arrête le timer
		if (this.distance <= 0) {
			this.idEl.innerHTML = "La réservation est expiré ";
			clearInterval(countdown);
		}
	}

}






