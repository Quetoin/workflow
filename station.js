class Station {
	
	constructor(tablePar,map){

		//Initialise les propriétés
		this.name = tablePar.name;
		this.number = tablePar.number;
		this.address = tablePar.address;
		this.lat = tablePar.position.lat;
		this.lng = tablePar.position.lng;
		this.map = map;
		this.bike_stands = tablePar.bike_stands;
		this.available_bikes = tablePar.available_bikes;
		this.currentIcon = "";
		this.butReserver = document.getElementById("butReserver");
		this.statutStation = document.getElementById("statutStation");

		// Initialise les méthodes
		this.initEventMarker();
	}


	initEventMarker(){

			// on teste les vélos dispo, en fonction l'icône change de couleur
			if(this.available_bikes == 0){
				this.currentIcon = redIcon;

			} else if(this.available_bikes <= 6 && this.available_bikes > 0){
				this.currentIcon = yellowIcon;

			} else if(this.available_bikes >= 7){
				this.currentIcon = blueIcon;
			}

			// Création du marqueur pour la station et de l'évènement onClick.
		this.marker = L.marker([this.lat,this.lng], {icon:this.currentIcon}).on("click", () => {

			// Si div résa affichée, alors on clear le canvas et on affiche dispos
			if(isResaOrDispo == "resa"){
				canvas1.ctx.clearRect(0,0,canvas1.canvas.width,canvas1.canvas.height);
				document.getElementById("reservation").style.display="none";
      			document.getElementById("disponibilites").style.display="flex";
			}

			if(screen.width <= 959){
				location.href= "#disponibilites"; // la page scroll sur disponibilités
			}
			
			
			stationEnCours = this;

			// On remplit les données de dispos de la station
			document.getElementById("nomStation").innerHTML = this.name;
			document.getElementById("adresseStation").innerHTML = this.address;
			document.getElementById("placesStation").innerHTML = this.bike_stands;
			document.getElementById("velosStation").innerHTML = this.available_bikes;

			// On teste si station ouverte ou non, pour afficher statut et bouton réserver ou non
			if(this.available_bikes ==0){
				this.statutStation.innerHTML = "Fermé";
				this.statutStation.style.backgroundColor= "red";
				this.butReserver.style.display = "none";
				
			}else{
				this.statutStation.innerHTML = "Ouvert";
				this.statutStation.style.backgroundColor= "green";
				this.butReserver.style.display = "block";
			}
			
		});

		// on ajoute le marker de la station au cluster
		map1.markersCluster.addLayer(this.marker);
		
		// ajout d'un popup au mouseover pour indiquer le nb de vélos dispos
		this.marker.on("mouseover", () =>{
			this.marker.bindPopup(this.available_bikes+" vélos disponibles").openPopup();
		});
	}

}



// Format de récupération des données de JC Decaux :

// {"number":55,
// "contract_name":"toulouse",
// "name":"00055 - ST SERNIN G. ARNOULT",
// "address":"2 RUE GATIEN ARNOULT",
// "position":{"lat":43.608951960496405,
// "lng":1.441003598726198},
// "banking":true,
// "bonus":false,
// "bike_stands":15,
// "available_bike_stands":15,
// "available_bikes":0,
// "status":"OPEN",
// "last_update":1583352559000}