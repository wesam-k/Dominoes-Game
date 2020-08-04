"use strict";

function dominoes() {
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
  //Random to Shuffle tiles
  function RandomShuffle() {
    return Math.floor(Math.random() * domBox.length);
  }

  // give 7 tiles for each player randomly
  function TileToPlayer() {
    for (let i = 0; i < 7; i++) {
      const TilesForPlayerA = domBox.splice(RandomShuffle, 1);
      playerA.push(TilesForPlayerA[0]);
      const TilesForPlayerB = domBox.splice(RandomShuffle, 1);
      playerB.push(TilesForPlayerB[0]);
    }
    return [playerA, playerB];
  }

  // start the game with on random tile
  function OneTileToStart() {
    const gameTable = domBox.splice(RandomShuffle(domBox), 1);
    return gameTable;
  }

  console.log(TileToPlayer());
  console.log(OneTileToStart());

  // find if player can play or not
  function findCorrectTile(playerArray, gameTable) {
    const index = playerArray.findIndex((playerTile) => {
      return (
        playerTile.includes(gameTable[0][0]) ||
        playerTile.includes(gameTable[gameTable.length - 1][1])
      );
    });

    return index;
  }
  // console.log(findCorrectTile())

  // adding one tile by players
  function playerAddingOneTile(correctTile, gameTable) {
    if (correctTile[0] === gameTable[0][0]) {
      gameTable.unshift(correctTile.reverse());
    } else if (correctTile[1] === gameTable[0][0]) {
      gameTable.unshift(correctTile);
    } else if (correctTile[0] === gameTable[gameTable.length - 1][1]) {
      gameTable.push(correctTile);
    } else if (correctTile[1] === gameTable[gameTable.length - 1][1]) {
      gameTable.push(correctTile.reverse());
    }
  }

  //rules for game
  function session(playerArray, gameTable, domBox) {
    const index = findCorrectTile(playerArray, gameTable);
    let correctTile = playerArray[index];
    while (correctTile === undefined) {
      if (domBox.length > 0) {
        let getTile = domBox.splice(RandomShuffle(domBox), 1);
        playerArray.push(getTile[0]);
        correctTile = findCorrectTile(playerArray, gameTable);
      } else {
        console.log(" there is no tile in box");
        return correctTile;
      }
    }

    playerAddingOneTile(correctTile, gameTable);
    playerArray.splice(index, 1);
    return correctTile;
  }
  // console.log(session())

  // who is winner
  function winner(playerA, playerB) {
    if (playerA.length === 0) {
      alert("player A is winner");
    } else if (playerB.length === 0) {
      alert("player B is winner");
    } else {
      alert("game over");
    }
  }

  function playGame(playerOne, playerTwo, gameTable, firstTile) {
    while (playerOne.length !== 0 && playerTwo.length !== 0) {
      let correctTileOne = session(playerOne, gameTable, firstTile);
      if (playerOne.length === 0) {
        break;
      }
      let correctTileTwo = session(playerTwo, gameTable, firstTile);
      if (correctTileOne === undefined && correctTileTwo === undefined) {
        alert("can't play");
        break;
      }
    }
    winner(playerOne, playerTwo);
  }

  const firstTile = OneTileToStart();
  playGame(playerA, playerB, gameTable, firstTile);


}
console.log(dominoes());
