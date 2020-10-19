<script>
  import { onMount } from "svelte";

  export let name = name;
  onMount(() => {
    gameButtons = document.querySelectorAll("button");
    createMatrix();
  });
  let gameOver = false;
  let gameButtons = [];
  let gameMatrix = [[]];
  let playerOne = name;
  let playerTwo = "CPU";
  let gameOverMessage = null;
  let playerColor = "blue";
  let player = playerOne;
  let turn_info = player + " : Your turn to pick the chip";
  const reportWin = (row, column) => {
    gameOver = true;
    gameOverMessage =
      "GAME OVER ! " + player + " won at " + (row + 1) + " " + (column + 1);
    gameOver = true;
  };
  const switchPlayer = () => {
    if (gameOver) {
      turn_info = "Finished ! Refresh to play again !";
    } else {
      playerColor = player === playerTwo ? "blue" : "red";
      player = player === playerTwo ? playerOne : playerTwo;
      turn_info = player + " : Your Turn pick any  " + playerColor + " chip .";
    }
  };
  const createMatrix = () => {
    for (let i = 0, k = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        gameMatrix[i][j] = gameButtons[k];
        k++;
      }
      if (i + 1 != 5) gameMatrix[i + 1] = [];
    }
  };

  //CHECK LEFT SIDE
  const checkLeft = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          k++;
        } else {
          c = 0;
          k++;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK RIGHT SIDE
  const checkRight = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          k--;
        } else {
          c = 0;
          k++;
        }
      } else return 0;
    }
    return c;
  };

  //CHECK BOTTOM SIDE
  const checkBottom = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
        } else {
          c = 0;
          index++;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK Diagonal SIDE
  const checkDiagonalRight = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
          k--;
        } else {
          c = 0;

          index--;
        }
      } else return 0;
    }
    return c;
  };
  const checkDiagonalLeft = (index, k, color, c) => {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index++;
          k++;
        } else {
          c = 0;

          index--;
        }
      } else return 0;
    }
    return c;
  };
  //CHECK Middle SIDE
  const checkMiddle = (index, k, color, c) => {
    if (
      gameMatrix[index][k] &&
      gameMatrix[index][k - 1] &&
      gameMatrix[index][k + 1]
    ) {
      c =
        gameMatrix[index][k - 1].value === color
          ? gameMatrix[index][k + 1].value === color
            ? 3
            : null
          : null;
    }

    return c;
  };

  const checkIt = (count, index, k) => {
    if (count === 3) {
      reportWin(index, k);
    }
  };
  const checkMatrix = (index, k, color) => {
    let count = 0;
    count = checkBottom(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkMiddle(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
  };
  function handleClick(e) {
    e.target.value = playerColor;
    e.target.style.background = playerColor;
    e.target.disabled = true;
    const i = parseInt(e.target.getAttribute("key"));
    const k = parseInt(e.target.name);
    checkMatrix(k, i, playerColor);
    switchPlayer();
  }
</script>

<style>
  div {
    line-height: 1;
  }
  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: bolder;
  }
  h4 {
    font-style: italic;
    font-weight: bold;
    font-size: 1.05rem;
    color: peachpuff;
  }
  h5 {
    font-weight: 900;
    font-size: 1rem;
    background: linear-gradient(to right, #cad88a, #84b304);
    border-radius: 2rem;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
  .game-container {
    text-align: center;
  }
  table {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  .game {
    text-align: center;
  }
  button {
    display: inline-block;
    font-size: 4.85rem;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    text-decoration: none;
    border: 0.2rem solid black;
    background: rgb(107, 106, 106);
    transition: all 0.5s;
  }
  button:active {
    animation: slideIn 0.2s ease-in;
  }
  div.game-element {
    align-self: center;
    min-width: 25%;
    margin-left: 10%;
  }
  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: rotate(-180deg) scale(1.3);
    }

    100% {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
  @media only screen and (max-width: 900px) {
    button {
      font-size: xxx-large;
    }
  }
</style>

<div class="game-element">
  <div class="game-container">
    <h1>Welcome to Connect Three!</h1>
    <h4>The objective of the game is to connect three chips in a row!</h4>
    <h5 id="turn-info">{turn_info}</h5>
  </div>

  <div class="game">
    {#if gameOverMessage}
      <h3 id="game-over">{gameOverMessage}</h3>
    {/if}
    <table>
      {#each [0, 1, 2, 3, 4] as column}
        <tr name={column}>
          {#each [0, 1, 2, 3, 4, 5, 6] as row}
            <td>
              <button
                type="button"
                name={column}
                key={row}
                on:click={handleClick}
                disabled={gameOver} />
            </td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
</div>
