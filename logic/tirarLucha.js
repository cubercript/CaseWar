// ==========================================================================
//                              RANDOMIZADOR DE LUCHA
// ==========================================================================

let popUpInfo = 0;
let lifeUser = 500;
let lifeBot = 500;
var autoFight = false;



lucharButton.onclick = () => {

    if(popUpInfo == 0){

        popUpInfo += 1;
        preLucha();

    } else {

        startRouletteBot();

    }

    selectArmaOff();


}


function preLucha(){

    // --> Abrimos popup de información de la lucha
    preFightBox.classList.remove('oculto');
    
    continueFight.onclick = () => {

        preFightBox.classList.add('oculto');
        startRouletteBot();

    }

}

function startRouletteBot(){
    // --> Preparamos la ruleta

    vs.classList.add("bg-lost");
    autoFight = false;

    // --> Forzar reinicio de la ruleta y sus animaciones para aplicarlas más adelante
    botRoulette.innerHTML = "";
    botRoulette.style.transform = "none";
    botRoulette.style.transition = "none";

    // --> Elegir armas aleatoriamente
    for(let i = 0; i < itemsMax; i++){

        // == ALEATORIEDAD == //
        var itemRandomBot = Math.floor(Math.random() * armas.length);

        // --> Implementar esas armas en la ruleta
        var itemDivBot = document.createElement('itemDivBot');
        itemDivBot.className = 'item';
        botRoulette.appendChild(itemDivBot);
        itemDivBot.innerHTML = "<img class='max' src='media/" + armas[itemRandomBot][5] + "'>";

        // --> Implementación de rarezas
        switch (armas[itemRandomBot][4]) {
            case "Raro":

                itemDivBot.classList.add('rare');
                break;

            case "Mítico":

                itemDivBot.classList.add('mystical');
                break;

            case "Legendario":

                itemDivBot.classList.add('legendary');
                break;
        
            default:
                itemDivBot.classList.add('common');
                break;
        }


        // --> Guardamos el item Ganador
        if(i == itemWinner){

            itemWinnerRandomBot = armas[itemRandomBot];

        }


    }

    // --> Hacemos que el navegador recalcule para que lea las animaciones
    // -- REFLOW -- //
    botRoulette.offsetWidth;


    // --> Una vez cargada completamente ejecutamos la animación
    botRoulette.style.transform = "translateX(-" + totalWidth + "px)";
    botRoulette.style.transition = "transform " + rouletteDurationS + "s cubic-bezier(0.1, 0.8, 0.1, 1)";


    // --> Aplicamos un TimeOut para que tarde en mostrar el resultado
    setTimeout(() => {

        // --> Implementamos el resultado en la tabla
        botWeapon.innerHTML = itemWinnerRandomBot[0];
        botDamage.innerHTML = itemWinnerRandomBot[1];
        botValue.innerHTML = itemWinnerRandomBot[2] + "€";
        botType.innerHTML = itemWinnerRandomBot[3];


        startFight();


    }, (rouletteDurationM) + 1000);
}



function startFight(){

    var user = itemWinnerRandom;
    var bot = itemWinnerRandomBot;

    var typeUser = 0;
    var typeBot = 0;

    var rarityUser = "";
    var rarityBot = "";

    var totalLuckyUser = 0;
    var totalLuckyBot = 0;


    // ====== Casos para suerte ====== //

    // --> Daño
    if(user[1] > bot[1]){

        // -- USER HACE MÁS DAÑO +10% -- //
        totalLuckyUser += 10;
        damage.classList.add('damage-win');
        damage.innerHTML += " +10% de suerte";
        damageTitle.classList.add('damage-win');

    } else if(user[1] < bot[1]){

        // -- BOT HACE MÁS DAÑO +10% -- //
        totalLuckyBot += 10;
        botDamage.classList.add('damage-win');
        botDamage.innerHTML += " +10% de suerte";
        botDamageTitle.classList.add('damage-win');

    } else {

        // -- LOS DOS HACEN EL MISMO DAÑO, NO SE APLICA SUERTE -- //

    }


    // --> Valor
    if(user[2] > bot[2]){

        // -- USER TIENE MÁS VALOR +5% -- //
        totalLuckyUser += 5;
        value.classList.add('value-win');
        value.innerHTML += " +5% de suerte";
        valueTitle.classList.add('value-win');

    } else if(user[2] < bot[2]){

        // -- BOT TIENE MÁS VALOR +5% -- //
        totalLuckyBot += 5;
        botValue.classList.add('value-win');
        botValue.innerHTML += " +5% de suerte";
        botValueTitle.classList.add('value-win');

    } else {

        // -- LOS DOS TIENEN EL MISMO VALOR, NO SE APLICA SUERTE -- //

    }


    // --> Tipo - user
    switch (user[3]){

        case "Corta distancia":

            typeUser = 0;

        break;

        case "Media distancia":

            typeUser = 1;

        break;

        case "Larga distancia":

            typeUser = 2;

        break;

        case "Tanque":

            typeUser = 3;

        break;

        case "Anti-tanque":

            typeUser = 4;

        break;

        case "Aéreo":

            typeUser = 5;

        break;

    }


    // --> Tipo - bot
    switch (bot[3]){

        case "Corta distancia":

            typeBot = 0;

        break;

        case "Media distancia":

            typeBot = 1;

        break;

        case "Larga distancia":

            typeBot = 2;

        break;

        case "Tanque":

            typeBot = 3;

        break;

        case "Anti-tanque":

            typeBot = 4;

        break;

        case "Aéreo":

            typeBot = 5;

        break;

    }
    


    // --> Tipo
    if(typeUser > typeBot){

        // -- USER ES MEJOR TIPO +50% -- //
        totalLuckyUser += 50;
        type.classList.add('type-win');
        type.innerHTML += " +50% de suerte";
        typeTitle.classList.add('type-win');

    } else if(typeUser < typeBot){

        // -- BOT ES MEJOR TIPO +50% -- //
        totalLuckyBot += 50;
        botType.classList.add('type-win');
        botType.innerHTML += " +50% de suerte";
        botTypeTitle.classList.add('type-win');

    } else {

        // -- LOS DOS TIENEN EL MISMO TIPO, NO SE APLICA SUERTE -- //

    }



    // --> Rareza - user
    switch (user[4]) {
        case "Común":
            
            rarityUser = 0;

        break;

        case "Raro":
            
            rarityUser = 1;

        break;

        case "Mítico":
            
            rarityUser = 2;

        break;

        case "Legendario":
            
            rarityUser = 3;

        break;
    
        
    }

    // --> Rareza - bot
    switch (bot[4]) {
        case "Común":
            
            rarityBot = 0;

        break;

        case "Raro":
            
            rarityBot = 1;

        break;

        case "Mítico":
            
            rarityBot = 2;

        break;

        case "Legendario":
            
            rarityBot = 3;

        break;
    
        
    }


    // --> Rareza
    if(rarityUser > rarityBot){

        // -- USER TIENE MEJOR RAREZA +5% -- //
        totalLuckyUser += 5;

    } else if(rarityUser < rarityBot){

        // -- BOT TIENE MEJOR RAREZA +5% -- //
        totalLuckyBot += 5;

    } else {

        // -- LOS DOS TIENEN LA MISMA RAREZA, NO SE APLICA SUERTE -- //

    }

    setTimeout(() => {

        fightBox.classList.remove("oculto");
        userLucky.innerHTML = "Suerte actual: +" + totalLuckyUser + "%";
        botLucky.innerHTML = "Suerte actual: +" + totalLuckyBot + "%";



        clickDice.onclick = () => {

            giroDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);

        }


        autoDiceButton.onclick = () => {

            autoFight = true;
            tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);

        }

    }, 4000);


}


// --> Hacemos un async para avisar que esta función puede contener pausas dentro de un bucle
async function giroDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight){

    clickDice.classList.add("oculto");

    let numberOfThrows = 20;

    // --> Pequeña animación de tirada de dado
    for(let i = 0; i < numberOfThrows; i++){

        let numberDice = Math.floor(Math.random() * 6);

        oneDice.classList.add("oculto");
        twoDice.classList.add("oculto");
        threeDice.classList.add("oculto");
        fourDice.classList.add("oculto");
        fiveDice.classList.add("oculto");
        sixDice.classList.add("oculto");

        oneDiceBot.classList.add("oculto");
        twoDiceBot.classList.add("oculto");
        threeDiceBot.classList.add("oculto");
        fourDiceBot.classList.add("oculto");
        fiveDiceBot.classList.add("oculto");
        sixDiceBot.classList.add("oculto");

        switch (numberDice){

            case 0:

                oneDice.classList.remove("oculto");
                fourDiceBot.classList.remove("oculto");

            break;

            case 1:

                twoDice.classList.remove("oculto");
                fiveDiceBot.classList.remove("oculto");
                

            break;

            case 2:

                threeDice.classList.remove("oculto");
                oneDiceBot.classList.remove("oculto");

            break;

            case 3:

                fourDice.classList.remove("oculto");
                sixDiceBot.classList.remove("oculto");

            break;

            case 4:

                fiveDice.classList.remove("oculto");
                twoDiceBot.classList.remove("oculto");

            break;

            case 5:

                sixDice.classList.remove("oculto");
                threeDiceBot.classList.add("oculto");

            break;

        }

        // --> Hacemos una pequeña espera para que de tiempo a ver el dado (animación más limpia)
        await new Promise(resolve => setTimeout(resolve, 100));

    }

    tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);
        

}




function tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight){

    clickDice.classList.add("oculto");

    // --> Administramos todos los números de un dado con el mismo valor de probabilidad 1
    let one = 1;
    let two = 1;
    let three = 1;
    let four = 1;
    let five = 1;
    let six = 1;

    oneDice.classList.add("oculto");
    twoDice.classList.add("oculto");
    threeDice.classList.add("oculto");
    fourDice.classList.add("oculto");
    fiveDice.classList.add("oculto");
    sixDice.classList.add("oculto");

    oneDiceBot.classList.add("oculto");
    twoDiceBot.classList.add("oculto");
    threeDiceBot.classList.add("oculto");
    fourDiceBot.classList.add("oculto");
    fiveDiceBot.classList.add("oculto");
    sixDiceBot.classList.add("oculto");

    /* 
    
        Hacemos una operación que mida el porcentaje ganado en decimales, por ejemplo: +55% -> 0,55
        este 0,55 se sumará al número 6 para que cuando se haga el randomicer pueda llegar de 6 - 6,55.

        Todo lo que sea superior a 6 contará como un 6 (6,05; 6,50;...), de esta manera aumentamos
        la probabilidad y la suerte.
    
    */

    var sixUser = six + (totalLuckyUser / 100);
    var sixBot = six + (totalLuckyBot / 100);

    var totalNumberUser = one + two + three + four + five + sixUser;
    var totalNumberBot = one + two + three + four + five + sixBot;

    let randomNumberUser = Math.random() * totalNumberUser;
    let randomNumberBot = Math.random() * totalNumberBot;


    if(randomNumberUser <= 1.49){

        // -- USER SACÓ 1 -- //
        oneDice.classList.remove("oculto");
        randomNumberUser = 1;
 
    } else if(randomNumberUser > 1.49 && randomNumberUser <= 2.49){

        // -- USER SACÓ 2 -- //
        twoDice.classList.remove("oculto");
        randomNumberUser = 2;

    } else if(randomNumberUser > 2.49 && randomNumberUser <= 3.49){

        // -- USER SACÓ 3 -- //
        threeDice.classList.remove("oculto");
        randomNumberUser = 3;

    } else if(randomNumberUser > 3.49 && randomNumberUser <= 4.49){

        // -- USER SACÓ 4 -- //
        fourDice.classList.remove("oculto");
        randomNumberUser = 4;

    } else if(randomNumberUser > 4.49 && randomNumberUser <= 5.49){

        // -- USER SACÓ 5 -- //
        fiveDice.classList.remove("oculto");
        randomNumberUser = 5;

    } else if(randomNumberUser > 5.49) {

        // -- USER SACÓ 6 -- //
        sixDice.classList.remove("oculto");

    }



    if(randomNumberBot <= 1.49){

        // -- BOT SACÓ 1 -- //
        oneDiceBot.classList.remove("oculto");
        randomNumberBot = 1;
 
    } else if(randomNumberBot > 1.49 && randomNumberBot <= 2.49){

        // -- BOT SACÓ 2 -- //
        twoDiceBot.classList.remove("oculto");
        randomNumberBot = 2;

    } else if(randomNumberBot > 2.49 && randomNumberBot <= 3.49){

        // -- BOT SACÓ 3 -- //
        threeDiceBot.classList.remove("oculto");
        randomNumberBot = 3;

    } else if(randomNumberBot > 3.49 && randomNumberBot <= 4.49){

        // -- BOT SACÓ 4 -- //
        fourDiceBot.classList.remove("oculto");
        randomNumberBot = 4;

    } else if(randomNumberBot > 4.49 && randomNumberBot <= 5.49){

        // -- BOT SACÓ 5 -- //
        fiveDiceBot.classList.remove("oculto");
        randomNumberBot = 5;

    } else if(randomNumberBot > 5.49) {

        // -- BOT SACÓ 6 -- //
        sixDiceBot.classList.remove("oculto");

    }


    // user / bot //
    let damageUser = user[1];
    let damageBot = bot[1];
    let CSSContainer = 90;
    

    // --> Pelea
    if(randomNumberUser < randomNumberBot){

        // -- USUARIO HA PERDIDO -- //
        lifeUser = lifeUser - damageBot;
        let lifeUserCSS = (lifeUser * CSSContainer) / 500;

        lifeUserContainer.style.width = lifeUserCSS + "%";

        if(lifeUserCSS <= 0){

            // -- USUARIO HA MUERTO -- //
            defeat.classList.remove("oculto");
            lifeUserContainer.style.width =  "0%";

            bank = Number(bank) - Number(user[2]) - Number(bot[2]);
            money.innerHTML = "Dinero: " + bank + "€";

            // --> Activamos animación de banco
            moneyEventLost.innerHTML = "-" + (Number(user[2]) + Number(bot[2])) + "€";
            moneyEventLost.classList.add("lost");
            moneyEventLost.style.transform = "translateY(50px)";
            moneyEventLost.style.opacity = "0";


            // --> Reseteamos la animación
            setTimeout(() => {

                moneyEventLost.innerHTML = "";
                moneyEventLost.classList.remove("lost");
                moneyEventLost.style.transform = "translateY(0px)";
                moneyEventLost.style.opacity = "1";

                fightBox.classList.add("oculto");

                lifeUser = 500;
                lifeUserContainer.style.width = "90%";

                lifeBot = 500;
                lifeBotContainer.style.width = "90%";

                tirarCajaOn();

            }, 2000); // --> Aplicamos el tiempo que dura la animación en CSS

        } else {

            if(autoFight){
                tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);
            }

        }


    } else if(randomNumberUser > randomNumberBot){

        // -- USUARIO HA GANADO -- //
        lifeBot = lifeBot - damageUser;
        let lifeBotCSS = (lifeBot * CSSContainer) / 500;

        lifeBotContainer.style.width = lifeBotCSS + "%";

        if(lifeBotCSS <= 0){

            // -- BOT HA MUERTO -- //
            victory.classList.remove("oculto");
            lifeBotContainer.style.width = "0%";

            bank = Number(bank) + Number(user[2]) + Number(bot[2]);
            money.innerHTML = "Dinero: " + bank + "€";

            // --> Activamos animación de banco
            moneyEvent.innerHTML = "+" + (Number(user[2]) + Number(bot[2])) + "€";
            moneyEvent.classList.add("win");
            moneyEvent.style.transform = "translateY(50px)";
            moneyEvent.style.opacity = "0";


            // --> Reseteamos la animación
            setTimeout(() => {

                moneyEvent.innerHTML = "";
                moneyEvent.classList.remove("win");
                moneyEvent.style.transform = "translateY(0px)";
                moneyEvent.style.opacity = "1";

                fightBox.classList.add("oculto");

                lifeUser = 500;
                lifeUserContainer.style.width = "90%";

                lifeBot = 500;
                lifeBotContainer.style.width = "90%";

                tirarCajaOn();

            }, 2000); // --> Aplicamos el tiempo que dura la animación en CSS

        } else {

            if(autoFight){
                tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);
            }

        }



    } else {

        // -- EMPATE -- //
        if(autoFight){
            tiradaDeDados(totalLuckyUser, totalLuckyBot, user, bot, autoFight);
        }

    }


    clickDice.classList.remove("oculto");




}



