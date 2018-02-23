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
var turn = 0;


/*
Sætter alle 5 elementer i dice-array til et tilfældigt tal mellem 1 og 6
 */
function throwdice(){
    for(var i = 0; i < dice.length; i++){
        if(holds[i]==false) dice[i] = Math.ceil(Math.random()*6);
    }
    turn++;
}

/*
Hjælpefunktion til at finde antallet af terninger med værdien 1-6
 */
function frequency() {
    var frequencies = [0, 0, 0, 0, 0, 0 ,0];
    for (var i = 1; i < 6; i++) {
        frequencies[i] = 0;
        for (var j = 0; j < dice.length; j++) {
            if (i === j) {
                frequencies[i] = frequencies[i] + 1;
            }
        }
    }
    return frequencies;
}

/*
Bruges til x antal af en værdi
 */
function sameValuePoints(facevalue) {
    var points = 0;
    for (var i = 0; i < this.dice.length; i++){
        if (this.dice[i] === facevalue) {
            points = points + facevalue;
        }
    }
    return points;
}

/*
Returnerer point for et par
*/
function onePairPoints() {
    var points = 0;
    var frequencies[] = this.frequency();
    for (var i = 0; i < 7; i++) {
        if (frequencies[i] >= 2) {
            points = 2 * i;
        }
    }
    return points;
}

/*
Returnerer point for to par
Pairs variablen tæller antallet af par
 */
function twoPairPoints() {
    var points = 0;
    var frequencies[] = this.frequency();
    var pairs = 0;
    for (var i = 0; i < 7; i++) {
        if (frequencies[i] >= 2) {
            points = points + 2 * i;
            pairs += 1;
        }
    }
    if (pairs !== 2) {
        points = 0;
    }
    return points; 
}

/*
Returnerer point for tre ens
 */
function threeSamePoints() {
    var points = 0;
    var frequencies[] = this.frequency();
    for (var i = 0; i < 7; i++) {
        if (frequencies[i] >= 3) {
            points = 3 * i;
        }
    }
    return points;
}

/*
Returnerer point for fire ens
 */
function fourSamePoints() {
    var points = 0;
    var frequencies[] = this.frequency();
    for (var i = 0; i < 7; i++) {
        if (frequencies[i] >= 4) {
            points = 4 * i;
        }
    }
    return points;
}

/*
Returnerer point for fuldt hus
 */
function fullHousePoints() {
    var points = 0;
    var threeSame = this.threeSamePoints();
    if (threeSame === 0) {
        return 0;
    }
    for (var i = 0; i < threeSame / 3; i++) {
        if (frequencies[i] >= 2) {
            points = threeSame + 2 * i;
        }    
    }
    return points;
}

/*
Returnerer point fra en small straight
Checker om der er præcis en af 1, 2, 3, 4 og 5
 */
function smallStraightPoints() {
    var points = 15;
    var frequencies[] = this.frequency();
    for (var i = 1; i < 6; i++) {
        if (frequencies[i] !== 1) {
            points = 0;
        }
    }
    return points;
}

/*
Returnerer point fra en large straight
Checker om der er præcis en af 2, 3, 4, 5 og 6
 */
function largeStraightPoints() {
    var points = 20;
    var frequencies[] = this.frequency();
    for (var i = 2; i < 7; i++) {
        if (frequencies[i] !== 1) {
            points = 0;
        }
    }
    return points;
}

function chancePoints() {
    var points = 0;
    for (var i = 0; i < this.dice.length; i++) {
        points = points + this.dice[i];
    }
    return points;
}

function yaztyPoints() {
    var points = 0;
    var frequencies[] = this.frequency();
    for (var i = 0; i < 7; i++) {
        if (frequencies[i] === 5) {
            points = 50;
        }
    }
    return points;
}

function holdDie(die){
    holds[die] = true;
}

function freeDie(die){
    holds[die] = false;
}

function freqFaceValue(){
    for(var i = 0; i < dice.length; i++){
}
