describe('Player', function() {
  it("returns the player's mark", function() {
    var testPlayer = new Player("Prince", "X");
    expect(testPlayer.mark).to.equal("X");
  });
});

describe('Space', function() {
  it("returns the player's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.xCoord).to.equal(1);
  });
  it("returns the player's mark", function() {
    var testSpace = new Space(1,2);
    expect(testSpace.yCoord).to.equal(2);
  });
  it("lets a player mark a space", function() {
    var testPlayer = new Player("Prince", "X")
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    expect(testSpace.player).to.equal(testPlayer);
  });
  it("does not allow an already marked space to be marked again", function() {
    var testPlayer = new Player("Prince", "X")
    var testPlayer2 = new Player("Grandma", "O");
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    testSpace.markBy(testPlayer2);
    expect(testSpace.player).to.equal(testPlayer);
  });
  it("pushes a marked space into the player's marked spaces array", function() {
    var testPlayer = new Player("Prince", "X")
    var testPlayer2 = new Player("Grandma", "O");
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    expect(testPlayer.spaces).to.eql([testSpace])
  });
  it("pushes a marked space into the player's marked xcoords array", function() {
    var testPlayer = new Player("Prince", "X")
    var testPlayer2 = new Player("Grandma", "O");
    var testSpace = new Space(1,2);
    testSpace.markBy(testPlayer);
    expect(testPlayer.xCoords).to.eql([testSpace.xCoord])
  });
});

describe('Board', function() {
  it('creates 9 spaces when it is intialized', function() {
    var testBoard = new Board();
    expect(testBoard).to.equal(testBoard);
  });
});

describe('Game', function() {
  it('initializes a game', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    expect(testGame.player1).to.equal(testPlayer1);
  });

  it('determines the turn', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    expect(testGame.turn).to.equal(testPlayer1);
  });

  it('changes the turn', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    testGame.changeTurn();
    expect(testGame.turn).to.equal(testPlayer2);
  });

  it('determines if there is a winner vertically', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    testGame.board.space11.markBy(testPlayer1)
    testGame.board.space12.markBy(testPlayer1)
    testGame.board.space13.markBy(testPlayer1)
    expect(testGame.winner()).to.equal(testPlayer1)
  });

  it('determines if there is a winner horizontally', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    testGame.board.space23.markBy(testPlayer1)
    testGame.board.space13.markBy(testPlayer1)
    testGame.board.space33.markBy(testPlayer1)
    expect(testGame.winner()).to.equal(testPlayer1)
  });

  it('determines if there is a winner diagonally', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    testGame.board.space11.markBy(testPlayer1)
    testGame.board.space22.markBy(testPlayer1)
    testGame.board.space33.markBy(testPlayer1)
    expect(testGame.winner()).to.equal(testPlayer1)
  });

  it('determines if there is a tie', function() {
    var testPlayer1 = new Player("Prince", "X");
    var testPlayer2 = new Player("Grandma", "O");
    var testGame = new Game(testPlayer1, testPlayer2);
    testGame.board.space11.markBy(testPlayer1)
    testGame.board.space21.markBy(testPlayer2)
    testGame.board.space31.markBy(testPlayer1)
    testGame.board.space12.markBy(testPlayer2)
    testGame.board.space22.markBy(testPlayer1)
    testGame.board.space32.markBy(testPlayer1)
    testGame.board.space13.markBy(testPlayer2)
    testGame.board.space23.markBy(testPlayer1)
    testGame.board.space33.markBy(testPlayer2)
    expect(testGame.winner()).to.equal(false)
  });
});
