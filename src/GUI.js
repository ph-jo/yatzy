//Opdatering af felter, jquery herinde


//Opdaterer terninge pics efter nye results
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i in dice){
        if(!$(".die").eq(i).hasClass("held")) {
            dice[i] = Math.ceil(Math.random()*6);
            dieField[i].innerHTML = ("<img src=\"images/" + links[dice[i]-1] + "\">");
        }

    }
    turn++;
    console.log(dice);
}

function updateResults(){
  var results = getResults();
  for(i in results){
     if(!$(".results").eq(i).hasClass("locked")) $(".results")[i].value = results[i];
  }
}



function clear(){
    var fields = $(".results");
    for(i in fields){
        fields[i].value = ("");
    }
    $(".die").removeClass("held");

    $(".results").removeClass("locked");
    return;

}

//funktioner der kører på page load
$(function(){

//debug knap
    $(".debug").on("click", function() {
        console.log(getResults());
        return;

    });

    //debug roll
    $(".debugRoll").on("click", function(){


        updateDice();
        updateResults();

        for(var i in dice){
            console.log($(".die").eq(Number(i)).hasClass("held"));
            console.log($(".die").eq(i).attr("id"));
        }

    })


    //knap til at genstarte spillet, rydder brættet
  $(".resetBtn").on("click", function() {
      clear();


        });

    //save-function når man klikker på et result felt
  $(".results").on("click", function() {
      if($(this).hasClass("locked") || turn === 0){
          return;
      }
      $(this).addClass("locked");
      freeAll();
      turn = 0;

      $("#throw")[0].innerText = "Roll the dice!";
      $(".roll").removeClass("invis");
      return;

  });

    //hold-funktionalitet når man clicker på terninger
    $(".die").on("click", function(){
        //man burde ikke kunne holde før man slår med terningerne

        if(turn === 0) return;

        if(!$(this).hasClass("held")){
            $(this).addClass("held");
            return;
        }else{
            $(this).removeClass("held");
            return;
        }
    });


    //roll-button funktionalitet
    $(".roll").on("click", function() {
        console.log(turn);
        if(Number(turn) < 3){

            updateDice();
            updateResults();
            //Hvis man har slået for 3. gang, låses alle terninger
            if(turn === 3){
                holdAll();
                $(".roll").addClass("invis");

                $("#throw")[0].innerText = "No more throws, please click a field to save your score";
            }else{
                var temp = 3-turn;
                $("#throw")[0].innerText = "Rolls left: " + temp + ". Click on a die to lock its value.";
            }

        }
        return;

    });




});


//Sætter alle elementer i holds[] til true
//Tilføjer css-class "held" til alle terninger (die class)
function holdAll(){
    $(".die").addClass("held");
}

//gør det modsatte af ovenstående funktion
function freeAll(){
    $(".die").removeClass("held");
}