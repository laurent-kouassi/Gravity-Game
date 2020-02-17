//  document.head.innerHTML += "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js\"></script>";
function injectScriptAndUse(func) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
    script.onload = func;
    head.appendChild(script);
  }

myStorage = window.localStorage;

injectScriptAndUse(function () {
    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            borderRadius: 50,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            left:888,
            top: 150
        },
        score: {
            position: 'absolute',
            color: 'white',
            fontSize: "50px",
            top: '50%',
            transform: 'translate(-50%, -50%)'
        },
        score1: {
            left: '25%',
        },
        score2: {
            left: '75%',
        },
        scoreBoard:{
            width: '60%',
            height: '50%',
            top: "50%", 
            left: "50%", 
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.8)',
            position: 'absolute',
            zIndex: '1000',
            color: 'white',
            visibility: "hidden",
            padding: 10
        },
        playerScore:{
            display: "inline-block",
            width: "50%",
            textAlign: "center",
            fontSize: "16px",
            marginTop: 50
            
        },
        resume:{
            textAlign: "center",
            cursor:"pointer" ,
            marginTop: 150
        }
      
    };

    var CONSTS = {
        gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,
        stickSpeed: 66,
        pause: true,
    };

    var PLAYERSCORES = {
        PLAYER1: 0,
        PLAYER2: 0,
        draw: function(){
            $('<span/>', {id: 'scoreBoard'}).css(CSS.scoreBoard)
            .appendTo('#pong-game');
            $('<p/>', {id: 'player1-score' , text: "Player one score is: " + this.PLAYER1})
            .css(CSS.playerScore)
            .appendTo('#scoreBoard');
            $('<p/>', {id: 'player2-score', text: "Player one score is: " + this.PLAYER2})
            .css(CSS.playerScore)
            .appendTo('#scoreBoard');
            $('<h2/>', {id: 'resume'}).css(CSS.resume).text("START")
            .appendTo('#scoreBoard');
        },
        calculateScores: function(){
            if(CONSTS.score1 == 5 || CONSTS.score5 == 5){
                CONSTS.score1 == 5 ? this.PLAYER1++ : this.PLAYER2++;
                this.show();
                CONSTS.score1 = 0; 
                CONSTS.score2 = 0;
                CONSTS.pause = true;
            }
        },
        show: function(){
            $('#player1-score').text("Player one score is: " + this.PLAYER1)
            $('#player2-score').text("Player one score is: " + this.PLAYER2)
            $('#scoreBoard').css({visibility:"visible"})
        },
        hide: function(){
            $('#score-1').text(CONSTS.score1);
            $('#score-2').text(CONSTS.score2);
            $('#scoreBoard').css({visibility:"hidden"})
        }

    };

    var player = function( name= "stick1" ){
        this.name= name;
        this.move= function(){
            CSS[this.name].top += CONSTS[(this.name+"Speed")];
            this.AtTop() && (CSS[this.name].top = 0);
            this.AtBottom() && (CSS[this.name].top = CSS.arena.height - CSS.stick.height);

        }
        this.AtTop = function(){
            return CSS[this.name].top <= 0;
        }
        this.AtBottom = function (){
            return CSS[this.name].top >= CSS.arena.height - CSS.stick.height;
        }

        this.cpu = function(){
            var direction = 1; 
            CSS[name].top +=  direction * Math.floor(Math.random() * Math.floor(50));
            this.AtTop() && (CSS[this.name].top = 0 );
            this.AtBottom() && (CSS[this.name].top = CSS.arena.height - CSS.stick.height );
        }

    }

    function start() {
        player1= new player("stick1");
        player2= new player("stick2");
        checkSavedScore();
        draw();
        setEvents();
        roll();
        loop();

    }


    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick))
        .appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick))
        .appendTo('#pong-game');
        $('<span/>', {id: 'score-1'}).css($.extend(CSS.score1, CSS.score)).text(CONSTS.score1)
        .appendTo('#pong-game');
        $('<span/>', {id: 'score-2'}).css($.extend(CSS.score2, CSS.score)).text(CONSTS.score2)
        .appendTo('#pong-game');
        PLAYERSCORES.draw();
        CONSTS.pause && (PLAYERSCORES.show())
    }

    function setEvents() {
        $(document).on('keydown', function (e) {
            switch(e.keyCode){
                case 87: CONSTS.stick1Speed = -CONSTS.stickSpeed;break; // W button
                case 83: CONSTS.stick1Speed = +CONSTS.stickSpeed;break; // S button
                case 38: CONSTS.stick2Speed = -CONSTS.stickSpeed;break; // Up button
                case 40: CONSTS.stick2Speed = +CONSTS.stickSpeed;break; // Down button
                case 80: gameSave(); break;             // P button
            }
            
        });

        $(document).on('keyup', function (e) {
            switch(e.keyCode){
                case 87: CONSTS.stick1Speed = 0;break;
                case 83: CONSTS.stick1Speed = 0;break;
                case 38: CONSTS.stick2Speed = 0;break;
                case 40: CONSTS.stick2Speed = 0;break;
            }
        });

        $('#resume').click(function (){
            CONSTS.pause= false;
            PLAYERSCORES.hide();
            loop();
        });
    }

    function loop() {
        window.pongLoop = setInterval(function () {
            
            // dealing with stick movement
            player1.move();
            $('#stick-1').css('top', CSS.stick1.top);

            player2.move();
            $('#stick-2').css('top', CSS.stick2.top);

            // dealing wih ball movement
            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;

            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            $('#pong-ball').css({top: CSS.ball.top,left: CSS.ball.left});

             // debounce from left stick or roll 
            if (CSS.ball.left <= CSS.stick.width ) {
                CSS.ball.top > CSS.stick1.top && CSS.ball.top < CSS.stick1.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || (CONSTS.score2++, roll());
            }

             // debounce from right stick or roll 
            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                CSS.ball.top > CSS.stick2.top && CSS.ball.top < CSS.stick2.top + CSS.stick.height && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || (CONSTS.score1++, roll());
            }

        if(CONSTS.pause){
            clearInterval(window.pongLoop);
        }
        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = CSS.arena.height/2 - CSS.ball.height/2;
        CSS.ball.left = CSS.arena.width/2 - CSS.ball.width/2;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
        

        // calculate player scores on every roll
        $('#score-1').text(CONSTS.score1);
        $('#score-2').text(CONSTS.score2);
        PLAYERSCORES.calculateScores();
        gameSave();
        
        
    }

    function gameSave(){
        // myStorage.clear();
        var scores= { score1: CONSTS.score1 , score2: CONSTS.score2 };
        var playerScores= { PLAYER1: PLAYERSCORES.PLAYER1 , PLAYER2: PLAYERSCORES.PLAYER2 };
        myStorage.setItem('scores',JSON.stringify(scores));
        myStorage.setItem('playerScores',JSON.stringify(playerScores));
    }
    function gameReset(){
        // myStorage.clear();
        var scores= { score1: 0 , score2: 0 };
        var playerScores= { PLAYER1: 0 , PLAYER2: 0 };
        myStorage.setItem('scores',JSON.stringify(scores));
        myStorage.setItem('playerScores',JSON.stringify(playerScores));
    }

    function checkSavedScore(){
        var scores = JSON.parse(myStorage.getItem('scores'));
        if(scores){
            CONSTS.score1 = scores.score1;
            CONSTS.score2 = scores.score2;
        }
        var playerScores = JSON.parse(myStorage.getItem('playerScores'));
        if(playerScores){
            PLAYERSCORES.PLAYER1 = playerScores.PLAYER1;
            PLAYERSCORES.PLAYER2 = playerScores.PLAYER2;
        }
        
    }


    start();
});