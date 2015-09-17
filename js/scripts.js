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
    var spaceChecker2 = this.player1.spaces;
    var allSpaces = spaceChecker1.concat(spaceChecker2);

    if ((/1{3}|2{3}|3{3}/).exec(xChecker1) >= 3) {
        return true;
        // checks to see if there are 3 vertical spaces marked by one player
    } else if ((/1{3}|2{3}|3{3}/).exec(xChecker2) >= 3) {
        return true;
    } else if ((/1{3}|2{3}|3{3}/).exec(yChecker1) >= 3) {
        return true;
        // checks to see if there are 3 horizontal spaces marked by one player
    } else if ((/1{3}|2{3}|3{3}/).exec(yChecker2) >= 3) {
        return true;
    } else if ((spaceChecker1.indexOf(this.board.space11) !== -1) && (spaceChecker1.indexOf(this.board.space22) !== -1) && (spaceChecker1.indexOf(this.board.space33) !== -1)) {
        return true;
        // checks to see if there are 3 diagonal spaces marked by one player
    } else if ((spaceChecker2.indexOf(this.board.space11) !== -1) && (spaceChecker2.indexOf(this.board.space22) !== -1) && (spaceChecker2.indexOf(this.board.space33) !== -1)) {
        return true;
    } else if ((spaceChecker1.indexOf(this.board.space13) !== -1) && (spaceChecker1.indexOf(this.board.space22) !== -1) && (spaceChecker1.indexOf(this.board.space31) !== -1)) {
        return true;
    } else if ((spaceChecker2.indexOf(this.board.space13) !== -1) && (spaceChecker2.indexOf(this.board.space22) !== -1) && (spaceChecker2.indexOf(this.board.space31) !== -1)) {
        return true;
    // } else if (allSpaces.length === 9) {
    //     return false;
    //         // checks to see if all spaces have been marked
    } else {
        return false;
    };

};

Game.prototype.checkTie = function(totalTurns){
    var turn = this.turn;
    var player1 = this.player1;
    var player2 = this.player2;
    var winSpaces = [
        [this.board.space11,this.board.space12,this.board.space13],
        [this.board.space21,this.board.space22,this.board.space23],
        [this.board.space31,this.board.space32,this.board.space33],
        [this.board.space11,this.board.space22,this.board.space33],
        [this.board.space12,this.board.space22,this.board.space32],
        [this.board.space13,this.board.space23,this.board.space33],
        [this.board.space11,this.board.space22,this.board.space33],
        [this.board.space13,this.board.space22,this.board.space31]
    ];

    var result = winSpaces.every(function(winSpace) {
        var empties = 0;
        var player1Spaces = 0;
        var player2Spaces = 0;

        for (var i = 0; i<winSpace.length; i++) {
            var spaceMark = winSpace[i].player;

            if (spaceMark === undefined) {
                empties += 1;
            } else if (spaceMark === player1) {
                player1Spaces += 1;
            } else if (spaceMark === player2) {
                player2Spaces += 1;
            } else {
                console.log('spaceMark for loop ' + [i] + ' does not match players or undefined');
            };
        };

        if (empties === 1 && player1Spaces === 1) {
            return true;
        } else if (empties === 1 && player2Spaces === 1) {
            return true;
        } else if (player2Spaces === 2 && player1Spaces === 1) {
            return true;
        } else if (player2Spaces === 1 && player1Spaces === 2) {
            return true;
        } else if (totalTurns === 8 && player2Spaces === 2 && turn === player1) {
            return true;
        } else if (totalTurns === 8 && player1Spaces === 2 && turn === player2) {
            return true;
        } else {
            return false;
        };
    });
    return result;
};

$(document).ready(function() {
    $("form#player2-piece").hide();
    $("#gameDiv").hide();
    $("#click-to-play").hide()
    $("#player1-turn").hide();
    $("#player2-turn").hide();

    var player1 = new Player(null, null);
    var player2 = new Player(null, null);
    var game = new Game(null, null);
    var totalTurns = 0;

    $("form#player1-piece").submit(function(event){
        event.preventDefault();
        var player1Name = $("input#player1Name").val();
        var player1Character = $(".player1Character:selected").val();
        player1.name = player1Name;
        player1.mark = player1Character;
        $("form#player1-piece").hide();
        $("form#player2-piece").show();
    });

    $("form#player2-piece").submit(function(event){
        event.preventDefault();
        var player2Name = $("input#player2Name").val();
        var player2Character = $(".player2Character:selected").val();
        player2.name = player2Name;
        player2.mark = player2Character;
        $("form#player2-piece").hide();
        $("#click-to-play").show();
    });

    $("#click-to-play").click(function() {
        $("#click-to-play").hide();
        $("#gameDiv").show();
        game.player1 = player1;
        game.player2 = player2;
        game.turn = player1;
        $("#player1-turn").show();
        $("#player1-name").text(player1.name);
    });

    $("#space11").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space11.markBy(player);
        $("#space11").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            console.log("game won")
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space12").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space12.markBy(player);
        $("#space12").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space13").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space13.markBy(player);
        $("#space13").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space21").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space21.markBy(player);
        $("#space21").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space22").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space22.markBy(player);
        $("#space22").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space23").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space23.markBy(player);
        $("#space23").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space31").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space31.markBy(player);
        $("#space31").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space32").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space32.markBy(player);
        $("#space32").append('<img src="img/' + player.mark + '">');
        if (game.winner()) {
            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {
                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {
            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {
                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });

    $("#space33").click(function(event) {
        $(this).off(event);
        totalTurns += 1;
        var player = game.turn;
        game.board.space33.markBy(player);
        $("#space33").append('<img src="img/' + player.mark + '">');

        if (game.winner()) {

            if (confirm("Game over! " + player.name + " wins! Play a new game?")) {

                window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
            };
        } else {

            if (game.checkTie(totalTurns)) {
                if (confirm("Game ended in a draw! Play a new game?")) {

                    window.location.reload(); // while testing be sure to click cancel on this prompt. If you click ok it will refresh the page and prompt you again.
                };
            } else {
                game.changeTurn();
            };
        };
    });
});
