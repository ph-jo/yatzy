//Opdatering af felter, jquery herinde


//Opdaterer terninge pics efter nye results
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i in dice){
        if(!$(".die").eq(i).hasClass("held")) {
            dice[i].value = Math.ceil(Math.random()*6);
            console.log("<img src=\"images/" + links[dice[i].value-1] + "\">");
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
    $(".results").removeClass("fakelock locked");



    return;

}

//funktioner der kører på page load
$(function(){

    //knap til at genstarte spillet, rydder brættet
  $(".resetBtn").on("click", function() {
      clear();
      turn = 0;
      dice = [
          { value: 0},
          { value: 0},
          { value: 0},
          { value: 0},
          { value: 0}
      ];
      total = 0;
      $(".roll").removeClass("invis");
      $("#throw")[0].innerText = "Rul med terningerne!";
        });

    //save-function når man klikker på et result felt
  $(".results").on("click", function() {
      if($(this).hasClass("locked") || turn === 0) return;


      //håndterer sum/bonus
      if($(this).hasClass("ofKind")){
          sum += Number($(this)[0].value);
          $("#sumField")[0].value = sum;

          if(sum >= 63 && $("#bonusField")[0].value < 0){
              $("#bonusField")[0].value = 50;
              total+= 50;
          }
      }
      //gemmer total score og sætter værdi på total-felt
      total += Number($(this)[0].value);
      $("#totalField")[0].value = total;


      //Låser valgte felt og viser lignende effekt på alle felter, så brugeren ikke tror han kan klikke
      //på andre felter
      $(".results").addClass("fakelock");
      $(this).addClass("locked");

      //fjerner holds fra terninger
      freeAll();


      turn = 0;
      $("#throw")[0].innerText = "Rul med terningerne!";

      if(completionCheck()){
          if(confirm("Din score er: " + total + "\nTryk på OK for at starte et nyt spil.")) {
              $(".resetBtn").trigger("click");

          }
      }else{
          $(".roll").removeClass("invis");
      }
      return;
  });

    //hold-funktionalitet når man clicker på terninger
    $(".die").on("click", function(){
        //man burde ikke kunne holde før man slår med terningerne
        if(turn === 0 || turn === 3 || completionCheck()) return;

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
        if(completionCheck()) return;

        if(Number(turn) < 3){
            $(".results").removeClass("fakelock");
            updateDice();
            updateResults();
            console.log("lul");
            //Hvis man har slået for 3. gang, låses alle terninger
            if(turn === 3){
                holdAll();
                $(".roll").addClass("invis");

                $("#throw")[0].innerText = "Ikke flere kast, tryk på et felt forneden for at gemme score.";
            }else{
                var temp = 3-turn;
                $("#throw")[0].innerText = "Kast tilbage: " + temp + ". Klik på en terning for at låse den.";
            }
        }
        return;
    });

    //Hotkey funktionalitet, J(keycode 74) for rul og K for
    $(document).on("keydown", function(key){
        if(key.keyCode === 74){
            $(".roll").trigger("click");
        }
        if(key.keyCode === 75){
            $("")
        }
    });

    $(".skjul").on("click", function(){
        if(!$(".info").eq(0).hasClass("invis")){
            $(".info").addClass("invis");
            $(".guide").addClass("invis");


            return;
        }else{
            $(".info").removeClass("invis");
            $(".guide").removeClass("invis");
            return;
        }

    })
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

function completionCheck(){
    for(i in getResults()){
        if(!$(".results").eq(i).hasClass("locked")) return false;
    }
    return true;
}