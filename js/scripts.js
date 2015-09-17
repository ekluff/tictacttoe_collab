function Player(name, mark) {
    this.name = name;
    this.mark = mark;
    this.spaces = [];
    this.xCoords = [];
    this.yCoords = [];
};

function Space(xCoord, yCoord) {
    this.xCoord = xCoord;
    this.yCoord = yCoord;
};

// the markBy method will only mark a space if it hasn't been marked yet

Space.prototype.markBy = function(player) {
    if (this.player === undefined) {
        this.player = player;
        player.spaces.push(this);
        player.xCoords.push(this.xCoord);
        player.yCoords.push(this.yCoord);
    };
};

function Board() {
    var space11 = new Space (1,1);
    var space21 = new Space (2,1);
    var space31 = new Space (3,1);
    var space12 = new Space (1,2);
    var space22 = new Space (2,2);
    var space32 = new Space (3,2);
    var space13 = new Space (1,3);
    var space23 = new Space (2,3);
    var space33 = new Space (3,3);
    this.space11 = space11;
    this.space21 = space21;
    this.space31 = space31;
    this.space12 = space12;
    this.space22 = space22;
    this.space32 = space32;
    this.space13 = space13;
    this.space23 = space23;
    this.space33 = space33;
    var spaces = [space11,space21,space31,space12,space22,space32,space13,space23,space33];
    this.spaces = spaces;
};

function Game(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    var board = new Board();
    this.board = board;
    this.turn = player1;
};


Game.prototype.changeTurn = function() {
    if (this.turn === this.player1) {
        this.turn = this.player2;
    } else {
        this.turn = this.player1;
    };
};

Game.prototype.winner = function() {
    var xChecker1 = this.player1.xCoords.toString().split(",").join("");
    var xChecker2 = this.player2.xCoords.toString().split(",").join("");
    var yChecker1 = this.player1.yCoords.toString().split(",").join("");
    var yChecker2 = this.player2.yCoords.toString().split(",").join("");
    var spaceChecker1 = this.player1.spaces;
    var spaceChecker2 = this.player2.spaces;
    var allSpaces = spaceChecker1.concat(spaceChecker2);

    if ((/1{3}|2{3}|3{3}/).exec(xChecker1) >= 3) {
        return this.player1;
        // checks to see if there are 3 vertical spaces marked by one player
    } else if ((/1{3}|2{3}|3{3}/).exec(xChecker2) >= 3) {
        return this.player2;
    } else if ((/1{3}|2{3}|3{3}/).exec(yChecker1) >= 3) {
        return this.player1;
        // checks to see if there are 3 horizontal spaces marked by one player
    } else if ((/1{3}|2{3}|3{3}/).exec(yChecker2) >= 3) {
        return this.player2;
    } else if ((spaceChecker1.indexOf(this.board.space11) !== -1) && (spaceChecker1.indexOf(this.board.space22) !== -1) && (spaceChecker1.indexOf(this.board.space33) !== -1)) {
        return this.player1;
        // checks to see if there are 3 diagonal spaces marked by one player
    } else if ((spaceChecker2.indexOf(this.board.space11) !== -1) && (spaceChecker2.indexOf(this.board.space22) !== -1) && (spaceChecker2.indexOf(this.board.space33) !== -1)) {
        return this.player2;
    } else if ((spaceChecker1.indexOf(this.board.space13) !== -1) && (spaceChecker1.indexOf(this.board.space22) !== -1) && (spaceChecker1.indexOf(this.board.space31) !== -1)) {
        return this.player1;
    } else if ((spaceChecker2.indexOf(this.board.space13) !== -1) && (spaceChecker2.indexOf(this.board.space22) !== -1) && (spaceChecker2.indexOf(this.board.space31) !== -1)) {
        return this.player2;
    } else if (allSpaces.length === 9) {
        return false;
        // checks to see if all spaces have been marked
    } else {
        return null;
    }
}

$(document).ready(function() {
    $("form#player2-piece").hide();
    $("#gameDiv").hide();
    $("#click-to-play").hide()
    $("#player1-turn").hide();
    $("#player2-turn").hide();

    var player1 = new Player(null, null);
    var player2 = new Player(null, null);
    var game = new Game(null, null);


    $("form#player1-piece").submit(function(event){
        console.log("player 1 submitted");
        event.preventDefault();
        console.log("default prevented");

        var player1Name = $("input#player1Name").val();
        console.log(player1Name + "is player 1");
        var player1Character = $(".player1Character:selected").val();
        console.log(player1Character + "is player1 character");
        console.log(player1.name + " is player1.name");
        player1.name = player1Name;
        console.log("player1.name changed to " + player1.name)
        player1.mark = player1Character;

        $("form#player1-piece").hide();
        $("form#player2-piece").show();

    });

    console.log("after submit event, player1.name is " + player1.name);

    $("form#player2-piece").submit(function(event){
        event.preventDefault();
        console.log("player 2 function triggered");

        var player2Name = $("input#player2Name").val();
        var player2Character = $("input#player2Character").val();
        player2.name = player2Name;
        player2.mark = player2Character;

        $("form#player2-piece").hide();
        $("#click-to-play").show();

    });

    $("#click-to-play").click(function() {
        $("#click-to-play").hide();
        $("#gameDiv").show();
        console.log("clicked to play");
        game.player1 = player1;
        console.log("in click to play game is " + game);
        console.log("in click to play game.player1 is " + game.player1);
        game.player2 = player2;
        game.turn = player1;
        $("#player1-turn").show();
        $("#player1-name").text(player1.name);
    });

    $("#space11").click(function() {
        console.log("space 1 1 clicked");
        console.log("space 1 1 click event game is " + game);
        var player = game.turn;
        console.log("space 11 click game is " + game);
        console.log("space 11 click turn is " + game.turn);

        console.log("space 11 click player is " + player);
        game.board.space11.markBy(player);
        $("#space11").append('<img src="img/' + player.mark + '">');
        game.changeTurn();
    });

});
