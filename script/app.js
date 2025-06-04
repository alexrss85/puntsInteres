    //Constants
    const dropZoneObj = document.querySelector(".dropZone");
    const totalPunts = document.querySelector("#totalPunts");
    const botoNetejar = document.getElementById("botoNetejar");

    //Variables
    let fitxer = [];
    let puntInteres = []; 
    let numId = 1;

    //Events

    //DRAG
    dropZoneObj.addEventListener("dragover", function(event){
        event.preventDefault();
        console.log("drag")
    });

    //DROP
    dropZoneObj.addEventListener("drop", function(event){
        event.preventDefault();
        console.log("drop");
        const file = event.dataTransfer.files;
        loadFile(file);

    });


    botoNetejar.addEventListener("click", () => {
        const confirmat = confirm("Estàs segur que vols esborrar tota la llista i els marcadors?");
        if (confirmat) {
            // Buida l'array de punts d'interès
            puntInteres = [];

            // Buida el div de la llista
            const llistat = document.querySelector(".llistat");
            llistat.innerHTML = "";

            // Actualitza el comptador
            totalPunts.textContent = `Número total: 0`;

            // Borra tots els punts del mapa
            map.borrarTotsElsPunts();
        }
    });


    //Carrega el fitxer
    const loadFile= function(files){
        if(files && files.length>0){
            const file = files[0];
            const extensio = file.name.split(".")[1];
            if(extensio.toLowerCase() === FILE_EXTENSION){
                console.log("El fitxer es "+FILE_EXTENSION)
                readCsv(file)
            }else{
                console.log("El ftixer no és correcte")
            }
            console.log(file)
        }


    }



    //Llegeix el fitxer

    const readCsv = function (file){
        // Read the file
        const reader = new FileReader();
        reader.onload = () => {
            //tindre la info
            console.log("Esta carregant...");
            fitxer = reader.result.trim().split("\n").slice(1);

            //carregar tota la info del csv
            loadData(fitxer);
    
            // Després de carregar tots els objectes
            console.log(puntInteres);
            //canviar el menu dels tipus de puntsInteres
            actualitzarMenuTipus(puntInteres);

            //render Llista
            mostrarLlistat(puntInteres);

            // Afegim punts al mapa
            puntInteres.forEach((punt) => {
                map.mostrarPunt(punt.latitud, punt.longitud, punt.nom, punt.direccio, punt.puntuacio,punt.id);
            });

    
        };
        reader.onerror = () => {
            showMessage("Error al llegir.", "error");
        };
        reader.readAsText(file,"UTF-8");
    }

//agafa la info del csv per tractar-la
const loadData = function(fitxer){

    fitxer.forEach( (linia) => {
        //incrementa l'ID per anar assignant a cada punt
        numId++;

        //separa les linies
        const dades= linia.split(CHAR_CSV);

        //segons el tipus museus,atraccio o espai genera un object i el afegeix a l'array puntsInteres;
        switch(dades[TIPUS].toLowerCase()){
            case "espai":
                console.log("Instacia objecte PuntInteres");
                const espaiObj = new PuntInteres(numId, esManual, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], parseFloat(dades[LAT]), parseFloat(dades[LON]), parseFloat(dades[PUNTUACIO]));
                puntInteres.push(espaiObj);
                break;

            case "museu":
                console.log("Instacia objecte Museu");
                const museuObj = new Museu(numId, esManual, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], parseFloat(dades[LAT]), parseFloat(dades[LON]), parseFloat(dades[PUNTUACIO]), dades[HORARIS], parseFloat(dades[PREU]), dades[MONEDA], dades[DESCRIPCIO] || "No disponible");
                puntInteres.push(museuObj);
                break;

            case "atraccio":
                console.log("Instacia objecte Atraccio");
                const atraccioObj = new Atraccio(numId, esManual, dades[PAIS], dades[CIUTAT], dades[NOM], dades[DIRECCIO], dades[TIPUS], parseFloat(dades[LAT]), parseFloat(dades[LON]), parseFloat(dades[PUNTUACIO]), dades[HORARIS], parseFloat(dades[PREU]), dades[MONEDA], dades[DESCRIPCIO] || "No disponible");
                puntInteres.push(atraccioObj);
                break;


            default:
                throw new Error( () => {
                    alert("Has afegit un tipus que no és correcte.")
                });
        }   
    });

}  





    //canvia les opcions del menu de filtre per tipus 
    function actualitzarMenuTipus(punts) {
        const select = document.getElementById("selectTipus");
        
        // Netejar totes les opcions excepte "Tots"
        select.innerHTML = '<option value="tots">Tots</option>';

        // Obtenir tipus únics
        const tipusSet = new Set();
        punts.forEach(punt => {
            if (punt.tipus) {
                tipusSet.add(punt.tipus);
            }
        });

        // Afegir cada tipus al select
        tipusSet.forEach(tipus => {
            const opcio = document.createElement("option");
            opcio.value = tipus;
            opcio.textContent = capitalitzar(tipus);
            select.appendChild(opcio);
        });
    }

    function capitalitzar(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

//mostra el llistat de punts d'Interes
function mostrarLlistat(puntsInteres) {
    const llistat = document.querySelector(".llistat");
    llistat.innerHTML = "";

    //Depenent el tipus assigna una classe
    puntsInteres.forEach((punt, index) => {
        const div = document.createElement("div");
        div.classList.add("punt");

         //guarda la info a mostrar
        let infoParts = [];

        if (punt.tipus.toLowerCase() === "espai"){
            div.classList.add("tipus-espai");
            infoParts.push(`${punt.ciutat}`, `Tipus: ${punt.tipus}`);
        } 
        if (punt.tipus.toLowerCase() === "atraccio"){
            div.classList.add("tipus-atraccio");
            infoParts.push(punt.ciutat, `Tipus: ${punt.tipus}`, `Horaris: ${punt.horaris}`, `Preu: ${punt.preu} ${punt.moneda || ""}`);
        }
        if (punt.tipus.toLowerCase() === "museu"){
            div.classList.add("tipus-museu");
            infoParts.push(punt.ciutat, `Espai: ${punt.direccio}`, `Horaris: ${punt.horaris}`, `Preu: ${punt.preu} ${punt.moneda || ""}`, `Descripció: ${punt.descripcio || "No disponible"}`);
        } 

      
        // Crea els divs per a cada info i els posa en fila
        const infoHtml = infoParts.map(info => `<div>${info}</div>`).join("");

        div.innerHTML = `
            <div class="info-text">
                <strong>${punt.nom}</strong>
                <div class="info-row">
                    ${infoHtml}
                </div>
            </div>
            <button class="boto-eliminar">Eliminar</button>
        `;

        const botoEliminar = div.querySelector(".boto-eliminar");

        botoEliminar.addEventListener("click", () => {
            const confirmat = confirm("Estàs segur que vols eliminar el punt d’interès?");
            if (confirmat) {

                //borra el marcador del mapa
                map.borrarPunt(punt.id);

                //borra el punt del array de puntsInteres i torna a mostrar el llistat
                const index = puntsInteres.findIndex(p => p.id === punt.id);
                puntsInteres.splice(index, 1);
                mostrarLlistat(puntsInteres);
            }
        });
        llistat.appendChild(div);
    });

    totalPunts.textContent = `Número total: ${puntsInteres.length}`;
}


//FILTRES 

//event al canviar el menu
document.querySelector("#selectTipus").addEventListener("change", aplicarFiltres);
document.querySelector("#selectOrdre").addEventListener("change", aplicarFiltres);
//event al escriure
document.querySelector("#inputNom").addEventListener("input", aplicarFiltres);

function aplicarFiltres() {
    const tipus = document.getElementById("selectTipus").value;
    const ordre = document.getElementById("selectOrdre").value;
    const text = document.getElementById("inputNom").value.toLowerCase();

    // // genera un array filtrant per tipus i per text(input)
    let resultats = puntInteres.filter(p =>
        (tipus === "tots" || p.tipus === tipus) &&
        p.nom.toLowerCase().includes(text)
    );

    // ordenar
    const ordres = {
        "nom_asc": (a, b) => a.nom.localeCompare(b.nom),
        "nom_desc": (a, b) => b.nom.localeCompare(a.nom),
        "puntuacio_asc": (a, b) => a.puntuacio - b.puntuacio,
        "puntuacio_desc": (a, b) => b.puntuacio - a.puntuacio
    };
    //ordenar llista de resultats
    resultats.sort(ordres[ordre]);

    // Actualitza la llista i els marcadors
    mostrarLlistat(resultats);
    map.borrarTotsElsPunts();
    resultats.forEach(p =>
        map.mostrarPunt(p.latitud, p.longitud, p.nom, p.direccio,p.descripcio, p.puntuacio, p.id)
    );
}


const map = new Mapa();


