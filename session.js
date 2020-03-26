class Session{
	
	constructor(){
		this.nomClient = "";
		this.prenomClient ="";
		this.inputNom = document.getElementById("inputNom");
		this.inputPrenom = document.getElementById("inputPrenom");

		this.verifSessionStorage();
	}

	verifLocalStorage(){
		if(localStorage.getItem("nomClient")){
			this.inputNom.value = localStorage.getItem("nomClient");
			this.nomClient = localStorage.getItem("nomClient");
		}
		if(localStorage.getItem("prenomClient")){
			this.inputPrenom.value = localStorage.getItem("prenomClient");
			this.prenomClient = localStorage.getItem("prenomClient");
		}
	}

	verifSessionStorage(){
		if(sessionStorage.getItem("nameStation")){

			document.getElementById("ifResa").style.display = "block";
			document.getElementById("ifNoResa").style.display = "none";
			document.getElementById("span_name_station").innerHTML = sessionStorage.getItem("nameStation");
			document.getElementById("span_nom_prenom").innerHTML = sessionStorage.getItem("prenomClient")+" "+sessionStorage.getItem("nomClient");
			
			if(sessionStorage.getItem("timeEnd")){
				document.getElementById("tps_restant").innerHTML = "";
				let timerEnd = sessionStorage.getItem("timeEnd");
				timer1.callCountdownResa(timerEnd);
			}
		}
		
	}

	initLocalStorage(){
		if(localStorage.getItem("nomClient") !== this.inputNom.value){
			localStorage.setItem("nomClient",this.inputNom.value);
	    	localStorage.setItem("prenomClient",this.inputPrenom.value);
		}
	}

	initSessionStorage(nameStation){
		sessionStorage.setItem("nameStation",nameStation);
		sessionStorage.setItem("prenomClient",this.inputPrenom.value);
		sessionStorage.setItem("nomClient",this.inputNom.value);
	}

}