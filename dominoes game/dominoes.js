const _ = require("lodash");

const showBoard = (playerA, playerB, domBox, gameTable) => {
  console.log("Player A:");
  console.log(playerA);
  console.log("Player B:");
  console.log(playerB);
  console.log("DomBox:");
  console.log(domBox);
  console.log("Table:");
  console.log(gameTable);
};

const randomShuffle = (domBox) =>
  Math.floor(Math.random() * Math.floor(domBox.length));

const distributeTiles = (domBox, playerA, playerB) => {
  // Distribute tiles to players
  for (let i = 0; i < 7; i++) {
    // Assign one tile to player A
    playerA.push(domBox.splice(randomShuffle(domBox), 1)[0]);
    // Assign one tile to player B
    playerB.push(domBox.splice(randomShuffle(domBox), 1)[0]);
  }
};

const isGameOver = (player) => {
  if (player.length === 0) {
    return true;
  }
};

const playTileOnSide = (tileToPlay, gameTable, playerHand) => {
  const tilePosition = playerHand.indexOf(tileToPlay);
  // Check if we can play on the left
  const tableTileLeft = gameTable[0][0];
  const tableTileRight = gameTable[gameTable.length - 1][0];

  if (tileToPlay[0] === tableTileLeft || tileToPlay[1] === tableTileLeft) {
    // Reverse the played tile if needed
    if (tileToPlay[1] !== tableTileLeft) {
      tileToPlay.reverse();
    }
    gameTable.unshift(tileToPlay);
    playerHand.splice(tilePosition, 1);
    return true;
    // Check if we can play on the right
  } else if (
    tileToPlay[0] === tableTileRight || tileToPlay[1] === tableTileRight
  ) {
    gameTable.push(tileToPlay);
    playerHand.splice(tilePosition, 1);
    return true;
  }
  return false;
};

const makeAMove = (playerHand, domBox, gameTable) => {
  // Which tile to put in place
  // On which side to put it on the game table
  // Or if you don't have a tile that can be played
  // Fetch from domBox until there is no tiles in domBox
  // ---------------------------------------------
  // playerA: [1-1] [2-3]
  // table: [0-1][1-5]
  // check if we can play
  // [1-1] -> 0 or 5 -> False
  // Go to the next tile
  // [2-3] -> 0 or 5 -> False
  // if no other tiles and there is tiles in domBox, then fetch from domBox
  // fetch from dombox: { [0-5] [6-6] [2-2] <-- }
  // PlayerA fetch from domBox: [2-2]
  // check if we can play
  // [2-2] -> 0 or 5 -> False
  // PlayerA: [1-1] [2-3] [2-2]
  // if no other tiles and there is tiles in domBox, then fetch from domBox
  // fetch from dombox: { [0-5] [6-6] <-- }
  // Player fetch from domBox: [6-6]
  // check if we can play
  // [6-6] -> 0 or 5 -> False
  // PlayerA: [1-1] [2-3] [2-2] [6-6]
  // if no other tiles and there is tiles in domBox, then fetch from domBox
  // fetch from dombox: { [0-5] <-- }
  // Player fetch from domBox: [0-5]
  // check if we can play
  // [0-5] -> 0 or 5 -> True

  let hasTileBeenPlayed = false;

  for (let i = 0; i < playerHand.length; i++) {
    // Select a tile
    const tileToPlay = playerHand[i];

    // Check if we can play on a side
    if (gameTable.length === 0) {
      gameTable.unshift(tileToPlay);
      playerHand.splice(i, 1);
      hasTileBeenPlayed = true;
      return;
    }

    hasTileBeenPlayed = playTileOnSide(tileToPlay, gameTable, playerHand);
  }
  // Fetch and play from domBox until you can play
  while (!hasTileBeenPlayed) {
    if (domBox.length === 0) {
      return;
    }
    const fetchedTileFromDomBox = domBox.splice(domBox.length - 1, 1)[0];
    playerHand.push(fetchedTileFromDomBox);
    hasTileBeenPlayed = playTileOnSide(
      fetchedTileFromDomBox,
      gameTable,
      playerHand
    );
  }
};

const showTheWinner = (playerA, playerB) => {
  if (playerA.length === 0) {
    console.log("Player A has won the game");
  } else if (playerB.length === 0) {
    {
      console.log("Player B has won the game");
    }
  } else {
    const totalHandPlayerA = playerA.reduce(
      (acc, curr) => acc + curr[0] + curr[1],
      0
    );
    const totalHandPlayerB = playerB.reduce(
      (acc, curr) => acc + curr[0] + curr[1],
      0
    );

    if (totalHandPlayerA < totalHandPlayerB) {
      console.log("Player A has won the game");
    } else if (totalHandPlayerA > totalHandPlayerB) {
      console.log("Player B has won the game");
    } else {
      console.log("Both players have the same total of points");
    }
  }
};

function startGame() {
  // Init variables
  const domBox = [
    [0, 0],
    [0, 1],
    [1, 1],
    [0, 2],
    [1, 2],
    [2, 2],
    [0, 3],
    [1, 3],
    [2, 3],
    [3, 3],
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [4, 4],
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [4, 6],
    [5, 6],
    [6, 6],
  ];
  const playerA = [];
  const playerB = [];
  const gameTable = [];

  let previousPlayerA;
  let previousPlayerB;
  // Distribute tiles
  distributeTiles(domBox, playerA, playerB);

  showBoard(playerA, playerB, domBox, gameTable);

  // While no winner
  let noOneHasWon = true;
  while (noOneHasWon) {
    // Check if game is not over
    if (isGameOver(playerA)) {
      break;
    }
    // Player A plays
    makeAMove(playerA, domBox, gameTable);
    // Check if game is not over
    if (isGameOver(playerB)) {
      break;
    }
    // Player B plays
    makeAMove(playerB, domBox, gameTable);

    showBoard(playerA, playerB, domBox, gameTable);

    // Check if game is blocked
    if (
      _.isEqual(playerA, previousPlayerA) || _.isEqual(playerB, previousPlayerB)
    ) {
      console.log("Blocked"); 
      break;
    } else {
      previousPlayerA = [...playerA];
      previousPlayerB = [...playerB];
    }
  }
  // Show the winner
  showTheWinner(playerA, playerB);
}

startGame();