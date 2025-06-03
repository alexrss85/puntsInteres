    const dropZoneObj = document.querySelector(".dropZone");

    let fitxer = [];
    let puntInteres = []; 
    let numId = 0;


    dropZoneObj.addEventListener("dragover", function(event){
        event.preventDefault();
        console.log("drag")
    });

    dropZoneObj.addEventListener("drop", function(event){
        event.preventDefault();
        console.log("drop");
        const file = event.dataTransfer.files;
        loadFile(file);

    });

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




    const readCsv = function (file){
        // Read the file
        const reader = new FileReader();
        reader.onload = () => {
            //tindre la info
            console.log("esta carregant");
            fitxer = reader.result.trim().split("\n").slice(1);
            loadData(fitxer);
            getInfoCountry(  )
        };
        reader.onerror = () => {
            showMessage("Error al llegir.", "error");
        };
        reader.readAsText(file,"UTF-8");
    }

    const loadData = function(fitxer){
        //itera cada linia del fitxer
        fitxer.forEach( (linia) => {
            numId++;
            //fa un array separant per ;
            const dades= linia.split(CHAR_CSV);
            switch(dades[TIPUS].toLowerCase()){
                case "espai":
                    console.log("Instacia objecte PuntInteres");
                    const espaiObj = new PuntInteres (numId,dades[PAIS],dades[CIUTAT],dades[NOM],dades[DIRECCIO])
                    puntInteres.push(espaiObj);
                    break;

                    // classes Museu i Atraccio extends PuntInteress

                case "museu":
                    console.log("Instacia objecte Museu");
                    const museuObj = new Museu (numId,dades[PAIS],dades[CODI])
                    puntInteres.push(museuObj);
                    break;
                
                case "atraccio":
                    console.log("Instacia objecte Atraccio");
                    const atraccioObj = new Atraccio (numId,dades[PAIS],dades[CODI])
                    puntInteres.push(atraccioObj);
                    break;

                default:
                    throw new Error( () => {
                        alert("Has afegit un tipus que no és correcte.")
                    });
            }   
        });
        console.log(puntInteres)
    }


    //BANDERA  i DADES
    const getInfoCountry = async function(){
        const resposta = await fetch("https://restcountries.com/v3.1/alpha/{code}"); //CODI DEL PAIS

        //
    }

    // const pintarEspai = function(item){
    //     const pi = document.createElement("div")
    //     pi.textContent = item.//el camp que volguem
    // }

    const pintarMuseu = function(item){
        
    }

    const pintarAtraccio = function(item){
        
    }

    const renderitzarLlista = function (puntInteres){
        fitxer.forEach( (item) => {
            numId++;
            switch(item.tipus.toLowerCase()){
                case "espai":
                    pintarEspai(item);
                    break;

                case "museu":
                    pintarMuseu(item);
                    break;
                
                case "atraccio":
                    pintarAtraccio(item);
                    break;

                default:
                    throw new Error( () => {
                        alert("Has afegit un tipus que no és correcte.")
                    });
            }
        });
    }



    const map = new Mapa();


