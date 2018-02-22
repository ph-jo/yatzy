//Opdatering af felter, jquery herinde


//Opdaterer terninge pics efter nye results
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i = 0; i < dice.length; i++){
        if(holds[i] === false)  dieField[i].innerHTML = ("<img src=\"images/" + links[dice[i]-1] + "\">");
    }
}

function clear(){
    var fields = $(".results");
    fields.foreach(function(element){
        element.text = "";
    });
}

//funktioner der kører på page load
$(function(){

    //roll-button funktionalitet
  $(".roll").on("click", function() {
      throwdice();
      turn++;
      updateDice();

  });
  //save-function når man klikker på et result felt
  $(".clear").on("click", function() {
    clear();

  });


    //hold-funktionalitet når man clicker på terninger
    $(".die").on("click", function(){
        if(!$(this).hasClass("held")){
            $(this).addClass("held");
            holds[Number($(this).attr("id")-1)] = true;
        }else{
            $(this).removeClass("held");
            holds[Number($(this).attr("id")-1)] = false;
        }
    })
});