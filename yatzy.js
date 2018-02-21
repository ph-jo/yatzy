//yatzymetoder

// Regler for Yatzy med 5 terninger er givet ved:

//  I hver runde har spilleren 3 slag. Ved hvert terningslag må spilleren vælge de terninger fra, som han
// vil samle på. De resterende terninger bruges i næste slag.
//  Når spilleren har haft sine 3 kast, noteres hans/hendes point ud fra en valgfri kombination, og turen
// fortsætter til næste spiller.
//  På øverste del af pointblokken er målet at få så mange som muligt af hver (1´ere, 2´ere osv.) for at
// opnå sin bonus. For at få sin bonus, skal man have minimum 63 point (dvs. i gennemsnit 3 af
// 1´erne, 3 af 2´erne osv.). Bonus giver 50 point, som skrives i feltet under summen.
//  På nederste del af pointblokken opnås point således:

// o 1 par (2 ens højst 12)
// o 2 par (2 x 2 ens højst 22)
// o 3 ens (3 ens højst 18)
// o 4 ens (4 ens højst 24)
// o ”Lille Straight” (1, 2, 3, 4, 5 giver 15)
// o ”Stor Straight” (2, 3, 4, 5, 6 giver 20)
// o ”Fuldt Hus” (3+2 ens højst 28)
// o Chance (alle øjne lægges sammen, højst 30)
// o Yatzy (5 ens giver 50 point)

//  Alle point lægges sammen efter hver runde, og spilleren kan se sin totale score.

var dice = [0, 0, 0, 0, 0];
var holds = [false, false, false, false, false];

/*
Sætter alle 5 elementer i dice-array til et tilfældigt tal mellem 1 og 6
 */
function throwdice(){
    for(var i = 0; i < dice.length; i++){
        if(holds[i]==false) dice[i] = Math.ceil(Math.random()*6);

    }
}


function hold(){

}

