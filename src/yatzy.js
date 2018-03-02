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


var scores = [];
var dice = [
    { value: 0},
    { value: 0},
    { value: 0},
    { value: 0},
    { value: 0}
    ];
var turn = 0;
var total = 0;
var sum = 0;

/*
Hjælpefunktion til at finde antallet af terninger med værdien 1-6
 */
function frequency() {
    var frequencies = [0, 0, 0, 0, 0, 0];

    for(i in dice){
        frequencies[dice[i].value-1]++;
    }

    return frequencies;
}

/*
Bruges til x antal af en værdi
 */
function sameValuePoints(facevalue) {
    var points = 0;
    for (i in dice){
        if (this.dice[i].value === facevalue) {
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
    var frequencies = this.frequency();
    for (i in frequencies) {
        if (frequencies[i] >= 2 && points<(2*i+2)) {
                points = (2*i)+2;
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
    var frequencies = this.frequency();
    var pairs = 0;
    for (i in frequencies) {
        if (frequencies[i] >= 2) {
            points += (2*i)+2;
            pairs += 1;
        }
    }
    if (pairs === 2) return points;

    else return 0;

}

/*
Returnerer point for tre ens
 */
function threeSamePoints() {
    var points = 0;
    var frequencies = this.frequency();
    for (i in frequencies) {
        if (frequencies[i] >= 3) {
            points = (3*i)+3;
        }
    }
    return points;
}

/*
Returnerer point for fire ens
 */
function fourSamePoints() {
    var points = 0;
    var frequencies = this.frequency();
    for (i in frequencies) {
        if (frequencies[i] >= 4) points = (4*i)+4;
    }
    return points;
}

/*
Returnerer point for fuldt hus
 */
function fullHousePoints() {
    var low = 0, high = 0;
    var freq = this.frequency();
    for(i in freq){
        switch(freq[i]){
            case 2:
                low = (2*i)+2;
                break;
            case 3:
                high = (3*i)+3;
        }
    }
    if(low > 0 && high > 0){
        return low+high;
    }
    return 0;
}

/*
Returnerer point fra en small straight
Checker om der er præcis en af 1, 2, 3, 4 og 5
 */
function smallStraightPoints() {
    var freq = this.frequency();
    for(var i = 0; i < freq.length-1; i++){
        if(freq[i] != 1) return 0;
    }
    return 15;
}

/*
Returnerer point fra en large straight
Checker om der er præcis en af 2, 3, 4, 5 og 6
 */
function largeStraightPoints() {
    var freq = this.frequency();
    for(var i = 1; i < freq.length; i++){
        if(freq[i] != 1) return 0;
    }
    return 20;
}

function chancePoints() {
    var points = 0;
    for (i in dice) {
        points += this.dice[i].value;
    }
    return points;
}

function yaztyPoints() {
    var frequencies = this.frequency();
    for (i in frequencies) {
        if (frequencies[i] === 5) {
            return 50;
        }
    }
    return 0;
}


function getResults(){
    var resultArr = [];
    resultArr.push(sameValuePoints(1));
    resultArr.push(sameValuePoints(2));
    resultArr.push(sameValuePoints(3));
    resultArr.push(sameValuePoints(4));
    resultArr.push(sameValuePoints(5));
    resultArr.push(sameValuePoints(6));
    resultArr.push(onePairPoints());
    resultArr.push(twoPairPoints());
    resultArr.push(threeSamePoints());
    resultArr.push(fourSamePoints());
    resultArr.push(fullHousePoints());
    resultArr.push(smallStraightPoints());
    resultArr.push(largeStraightPoints());
    resultArr.push(chancePoints());
    resultArr.push(yaztyPoints());
    return resultArr;
}
