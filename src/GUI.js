//Opdatering af felter, jquery herinde


//Opdaterer terninge pics efter nye results
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i in dice){
        if(!$(".die").eq(i).hasClass("held")) {
            dice[i].value = Math.ceil(Math.random()*6);
            dieField[i].innerHTML = ("<img src=\"images/" + links[dice[i].value-1] + "\">");
        }

    }
    turn++;
}

function updateResults(){
  var results = getResults();
  for(i in results){
     if(!$(".results").eq(i).hasClass("locked")){
         $(".results")[i].value = results[i];
     }
  }
}



function clear(){
    var fields = $("input");
    for(i in fields){
        fields[i].value = ("");
    }
    $(".die").removeClass("held");
    $(".results").removeClass("fakelock");
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
        $(".results").removeClass("fakelock");

    });


    //knap til at genstarte spillet, rydder brættet
  $(".resetBtn").on("click", function() {
      clear();
      turn = 0;
      dice = [0, 0, 0, 0, 0, 0];
      total = 0;
      $("#throw")[0].innerText = "Roll the dice!";
        });

    //save-function når man klikker på et result felt
  $(".results").on("click", function() {
      if($(this).hasClass("locked") || turn === 0) return;


      //håndterer sum/bonus
      if($(this).hasClass("ofKind")){
          sum += Number($(this)[0].value);
          $("#sumField")[0].value = sum;

          if(sum >= 63 && $("#bonusField")[0].value < 0) $("#bonusField")[0].value = 50; total+= 50;
      }
      //gemmer total score og sætter værdi på total-felt
      total += Number($(this)[0].value);
      $("#totalField")[0].value = total;
      console.log($(this).hasClass("ofKind"));


      // $(this).
      // if($(".results")[this].indexOf($(this)) < 5){
      //     sum += Number($(this)[0].value);
      //     $("sumField")[0].value = sum;
      // }


      //Låser valgte felt og viser lignende effekt på alle felter, så brugeren ikke tror han kan klikke
      //på andre felter
      $(".results").addClass("fakelock");
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

        if(turn === 0 || turn === 3) return;

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
        if(Number(turn) < 3){
            $(".results").removeClass("fakelock");
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