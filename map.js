class Map {
	constructor(){
		this.lat = 43.6043;
		this.lon = 1.4437;
		this.myMap = L.map("mapid");
		this.myIcon = null;
		this.markersCluster = [];

		this.initMap();
		this.ajaxRequest();
	}

	initMap(){
		this.myMap.setView([this.lat, this.lon], 13);

		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	    	maxZoom: 20,
	    	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
	      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    	id: 'mapbox/streets-v11',
	    	tileSize: 512,
	    	zoomOffset: -1
    	}).addTo(this.myMap);

    	this.markersCluster = new L.MarkerClusterGroup(); // Création des clusters
    	this.myMap.addLayer(this.markersCluster);
	}

	ajaxRequest(){
		let url = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=06b046dbdd366daa18f76a1caa4217f0b4755d85";
		let xhr = new XMLHttpRequest();
		var myMap2 = this.myMap;
		var station = [];
		myMapGlobal = this.myMap;

		xhr.onreadystatechange = function(){

			if (this.readyState == 4 && this.status == 200) {

				var stationsTable = JSON.parse(this.responseText);

				for (let i=0;i<stationsTable.length;i++){
					
					station[i] = new Station(stationsTable[i],myMapGlobal);
				}
			}
		}

		xhr.open("GET", url, true);
		xhr.send();
	}
}





