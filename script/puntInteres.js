class PuntInteres {
    static totalTasques = 0;
    
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
        this._id = id;
        this._esManual = esManual;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
        PuntInteres.totalTasques++;
    }
    
    get id() {
        return this._id;
    }
    
    set id(value) {
        this._id = value;
    }
    
    get esManual() {
        return this._esManual;
    }
    
    set esManual(value) {
        this._esManual = value;
    }
    
    static obtenirTotalElements() {
        return PuntInteres.totalTasques;
    }
}



class Atraccio extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }


}



class Museu extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda, descripcio) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
        this.descripcio = descripcio;
    }


}