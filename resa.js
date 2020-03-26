class Reservation{


	constructor(){

		this.station = stationEnCours;

		this.nomClient = document.getElementById("inputNom").value;
		this.prenomClient = document.getElementById("inputPrenom").value;

		this.adresseStation = this.station.address;
		this.nomStation = this.station.name;

		this.testConditionResa();
		
	
	}

	testConditionResa(){

		if(this.nomClient && this.prenomClient && signature){
			// Si toutes les conditions sont remplies, on lance la résa
			this.writeDataResa(); // on écrit les données dans l'encart de résa
			this.initDataWeb();
			timer1.callCountdownResa("notCountdownFromSession"); // On lance le timer
      		isResaOrDispo = "resa";
      		location.href= "#sectionResa"; // scroll vers la réservation
      		signature = false;

		}else{

			alert("Vous n'avez pas rempli toutes les données nécessaires à la réservation");
		
		}

	}

	writeDataResa(){
		document.getElementById("span_name_station").innerHTML = this.nomStation;
		document.getElementById("span_nom_prenom").innerHTML = this.prenomClient+" "+this.nomClient;
		document.getElementById("ifResa").style.display = "block";
		document.getElementById("ifNoResa").style.display = "none";
	}

	initDataWeb(){
		//On écrit les données dans WebStorage
      	sessionEnCours.initLocalStorage();
      	sessionEnCours.initSessionStorage(this.nomStation);
	}
}