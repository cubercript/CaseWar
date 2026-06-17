// ==========================================================================
//                                  VENDER ARMAS
// ==========================================================================

venderArmaButton.onclick = () => {

    // --> Sumamos dinero al banco
    bank = Number(bank) + itemWinnerRandom[2];
    money.innerHTML = "Dinero: " + bank + "€";

    
    // --> Activamos y desactivamos botones
    tirarCajaOn();
    selectArmaOff();
    
}


