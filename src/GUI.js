//Opdatering af felter, jquery herinde


//Opdaterer terninge pics efter nye results
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i in dice){
        if(!holds[i]) dieField[i].innerHTML = ("<img src=\"images/" + links[dice[i]-1] + "\">");
    }
    console.log(turn);

    //Hvis man har slået for 3. gang, låses alle terninger
    if(turn === 3){
        console.log("lul");
        console.log($("#throw")[0].innerText);
        $(".die").addClass("held");
        holdAll();

        $("#throw")[0].innerText = "No more throws, please click a field to save your score";
    }else{
        var temp = turn+1;
        $("#throw")[0].innerText = "Throw: " + temp + " of 3";


    }
    // console.log($("#throw")[0].innerText);
}

function updateResults(){
  var results = $(".results");
  console.log(results);
};

function clear(){
    var fields = $(".results");
    for(var i in fields){
        fields[i].value = ("");
    }


    $(".results").removeClass("locked");
    return;

}

//funktioner der kører på page load
$(function(){

    //roll-button funktionalitet
  $(".roll").on("click", function() {
      throwdice();
      updateDice();
      return;


  });
    //knap til at genstarte spillet, rydder brættet
  $(".resetBtn").on("click", function() {
      clear();
        });

    //save-function når man klikker på et result felt
  $(".results").on("click", function() {
      if($(this).hasClass("locked")){
          return;
      }
      $(this).addClass("locked");
      freeAll();
      turn = 0;
      $("#throw").innerText = "You saved a score of ";
      return;

  });


    //hold-funktionalitet når man clicker på terninger
    $(".die").on("click", function(){
        if(!$(this).hasClass("held")){
            $(this).addClass("held");
            // holds[Number($(this).attr("id")-1)] = true;
            holdDie(Number($(this).attr("id")-1));
        }else{
            $(this).removeClass("held");
            // holds[Number($(this).attr("id")-1)] = false;
            freeDie(Number($(this).attr("id")-1));
        }
    })
});


//Sætter alle elementer i holds[] til true
//Tilføjer css-class "held" til alle terninger (die class)
function holdAll(){
    for(var i in holds){
        holds[i] = true;
    }
    $(".die").addClass("held");
}

//gør det modsatte af ovenstående funktion
function freeAll(){
    for(var i in holds){
        holds[i] = false;
    }
    $(".die").removeClass("held");
}