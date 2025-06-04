class Mapa {

    #map;
    #currentLat;
    #currentLon;
    
    constructor() {
        this.marcadors = {};
        this.#getPosicioActual();
        const mapCenter = [this.#currentLat, this.#currentLon];
        let zoomLevel = 13;
        this.#map = L.map('map').setView(mapCenter, zoomLevel);
        let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        tileLayer.addTo(this.#map);
    }

    #getPosicioActual() {
        let lat = CURRENT_LAT;
        let lon = CURRENT_LNG;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {  // Funció de fletxa per mantenir el context de 'this'
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;

                    // Coloca un marcador en la ubicació actual del usuari
                    this.mostrarPuntInicial(lat,lon);

                    // Centra el mapa en la ubicació actual
                    this.#map.setView([lat, lon], 13);  // 'this.#map' fa referència a l'objecte de la classe
                },
                (error) => {
                    console.error("Error en la geolocalización:", error);
                }
            );
        } else {
            console.error("La geolocalización no está disponible en este navegador.");
        }

        this.#currentLat = lat;
        this.#currentLon = lon;
    }


    //mostra el punt on estas
    mostrarPuntInicial(lat,lon) {
        L.marker([lat, lon]).addTo(this.#map).bindPopup("Estás aquí").openPopup();
    }



    //pinta el punt al mapa
    mostrarPunt(lat, long, nom, direccio, descripcio,id) {
        const popupContent = `<strong>${nom}</strong><p>${direccio}</p><p>${descripcio}</p>`;
        const marcador = L.marker([parseFloat(lat), parseFloat(long)]).addTo(this.#map).bindPopup(popupContent);
        // Guardem el marcador amb l'id
        this.marcadors[id] = marcador;  
    }

    //borra el punt del mapa
    borrarPunt(id) {
        // borrar del mapa 
        this.#map.removeLayer(this.marcadors[id]);  
        // eliminar el marcador de la llista de marcadors
        delete this.marcadors[id];  
    }

    //borra tots el marcadors
   borrarTotsElsPunts() {
        for (let id in this.marcadors) {
            this.#map.removeLayer(this.marcadors[id]);
        }
        this.marcadors = {};
    }



}
