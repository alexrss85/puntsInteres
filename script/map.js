class Mapa {

    #map;
    #currentLat;
    #currentLon;
    
    constructor() {
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
                    L.marker([lat, lon]).addTo(this.#map).bindPopup("Estás aquí").openPopup();

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

    mostrarPuntInicial() {

    }

    actualitzarPosInitMapa(lat, lon) {

    }

    mostrarPunt(lat, long, desc) {

    }

    borrarPunt() {

    }

}
