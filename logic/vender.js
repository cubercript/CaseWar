// ==========================================================================
//                                  VENDER ARMAS
// ==========================================================================

venderArmaButton.onclick = () => {

    // --> Sumamos dinero al banco
    bank = Number(bank) + itemWinnerRandom[2];
    money.innerHTML = "Dinero: " + bank + "€";


    // --> Activamos animación de banco
    moneyEvent.innerHTML = "+" + itemWinnerRandom[2] + "€";
    moneyEvent.classList.add("win");
    moneyEvent.style.transform = "translateY(50px)";
    moneyEvent.style.opacity = "0";


    // --> Reseteamos la animación
    setTimeout(() => {

        moneyEvent.innerHTML = "";
        moneyEvent.classList.remove("win");
        moneyEvent.style.transform = "translateY(0px)";
        moneyEvent.style.opacity = "1";

    }, 2000); // --> Aplicamos el tiempo que dura la animación en CSS


    
    // --> Activamos y desactivamos botones
    tirarCajaOn();
    selectArmaOff();
    
}


