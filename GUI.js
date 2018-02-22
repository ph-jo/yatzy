//Opdatering af felter, jquery herinde
function updateDice(){
    var links = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png"];
    var dieField = $(".die");
    for(var i = 0; i < dice.length; i++){
        dieField[i].innerHTML = ("<img src=\"" + links[dice[i]-1] + "\">")


    }
}

$(function(){
  $(".roll").on("click", function() {
      throwdice();
      turn++;
      updateDice();

  })

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