// ==========================================================================
//                              RANDOMIZADOR DE ARMAS
// ==========================================================================

/* 

    1. Preparar variables
    2. Cargar la ruleta
    3. Ejecutarla en la función tirarCaja

*/

var itemWidth = 300; //--> Calcular el ancho del item para que encaje perfectamente con el translate
var itemsMax = 50;
var itemWinner = 45;
var itemWinnerRandom = "";

// --> Calculamos el ancho completo de la ruleta hasta el item ganador
var totalWidth = (itemWidth * itemWinner);


// --> La duración de la ruleta en segundos
var rouletteDurationS = 5;

// --> La duración de la ruleta en milisegundos
var rouletteDurationM = rouletteDurationS * 1000;

// --> Preparamos la ruleta
function setUpRoulette(){

    // --> Forzar reinicio de la ruleta y sus animaciones para aplicarlas más adelante
    roulette.innerHTML = "";
    roulette.style.transform = "none";
    roulette.style.transition = "none";

    // --> Elegir armas aleatoriamente
    for(let i = 0; i < itemsMax; i++){

        // == ALEATORIEDAD == //
        var itemRandom = Math.floor(Math.random() * armas.length);

        // --> Implementar esas armas en la ruleta
        var itemDiv = document.createElement('itemDiv');
        itemDiv.className = 'item';
        roulette.appendChild(itemDiv);
        itemDiv.innerHTML = "<img class='max' src='media/" + armas[itemRandom][5] + "'>";

        // --> Implementación de rarezas
        switch (armas[itemRandom][4]) {
            case "Raro":

                itemDiv.classList.add('rare');
                break;

            case "Mítico":

                itemDiv.classList.add('mystical');
                break;

            case "Legendario":

                itemDiv.classList.add('legendary');
                break;
        
            default:
                itemDiv.classList.add('common');
                break;
        }


        // --> Guardamos el item Ganador
        if(i == itemWinner){

            itemWinnerRandom = armas[itemRandom];

        }


    }

}


// --> Función tirar caja
tirarCajaButton.onclick = () => {

    // --> Si no puedes pagar una caja
    if(bank <= 99){

        bank = 500;
        money.innerHTML = "Dinero: " + bank + "€";
        resets = Number(resets) + 1;
        totalResets.innerHTML = "Resets: " + resets;


    }

    // --> Restamos dinero del banco
    bank = Number(bank) - 100;
    money.innerHTML = "Dinero: " + bank + "€";



    // --> Iniciamos la preparación de la ruleta
    setUpRoulette();


    // --> Hacemos que el navegador recalcule para que lea las animaciones
    // -- REFLOW -- //
    roulette.offsetWidth;


    // --> Una vez cargada completamente ejecutamos la animación
    roulette.style.transform = "translateX(-" + totalWidth + "px)";
    roulette.style.transition = "transform " + rouletteDurationS + "s cubic-bezier(0.1, 0.8, 0.1, 1)";


    // --> Aplicamos un TimeOut para que tarde en mostrar el resultado
    setTimeout(() => {

        // --> Implementamos el resultado en la tabla
        weapon.innerHTML = itemWinnerRandom[0];
        damage.innerHTML = itemWinnerRandom[1];
        value.innerHTML = itemWinnerRandom[2] + "€";
        type.innerHTML = itemWinnerRandom[3];

        selectArmaOn();


    }, (rouletteDurationM) + 1000);


    tirarCajaOff();


}


function tirarCajaOff(){

    tirarCajaButton.classList.add("oculto");

}

function tirarCajaOn(){

    tirarCajaButton.classList.remove("oculto");

    roulette.innerHTML = "";
    weapon.innerHTML = "";
    damage.innerHTML = "";
    value.innerHTML = "";
    type.innerHTML = "";

}

function selectArmaOn(){

    venderArmaButton.classList.remove("oculto");
    lucharButton.classList.remove("oculto");

}

function selectArmaOff(){

    venderArmaButton.classList.add("oculto");
    lucharButton.classList.add("oculto");

}


