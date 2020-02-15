var score = 0;

function update(){
    update = setInterval(update, 1000);
}

function random(min, max){
    return Math.round(Math.random() * (max-min) + min);
}


function dropImage(){
	var length = random(100, ($(".scene").width()-100));
	var velocity = random(850, 10000);
	var size = random(50, 150);
	var thisImage;

	    thisImage = $('<div/>', {
	    	            class: "image",
	    	            style: "width" +size+"px; height:" +size+"px; left:" +length+ "px; transition: transform " +velocity+ "ms linear;"
	    });
        // thisImage.data("test", Math.round(Math,random()));
        thisImage.css({"background": "url('insider.png')", "background-size":"contain"});


    $(".scene").append(thisImage);
    setTimeout(function(){
    	thisImage.addClass("move");
    }, random(0, 5000));


    thisImage.one("webkitTransitionEnd msTransitionEnd transitionend", function(event){
        $(this).remove();
    });
}
dropImage();

$(document).on('click', '.image', function(){
    if($(this)){
        score +=1;
    }

$(".score").html(score);
$(this).remove();
});



game_on = setInterval(function(){
                for (i = 0; i < 10; i++) { 
                  dropImage();
                }  
              }, 5000);


function countdown() {
    var seconds = 60;
    function tick(){
        var counter = document.getElementById('counter');
        seconds--;
        counter.innerHTML = (seconds < 10 ? "0":"") + String(seconds) + "s";

        if (seconds > 0){
            setTimeout(tick, 1000);
            update;
        }
        else {
            alert("Game over. Your score is" +score);
            if (score > 99) {
                alert("Congratulation Mate! You won! :)");
            } else {
                alert("Try again Mate! Reach 100 score to win :)");               
            }
            clearInterval(game_on);
        }
    }
    tick();
}



  // $(document).on('click', '.start', function(){
     
countdown();
  // });



