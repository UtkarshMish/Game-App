<script>
  import { onMount } from "svelte";
  import { getScores, setScores } from "../../utils/scores";
  import { name, scores, sound_on } from "../../store/store";
  import { playSound } from "../../utils/sound";
  let buttonDisabled = false;
  let gameButtons = [];
  let gameMatrix = [[]];
  const playerTwo = "CPU";
  let gameOverMessage = null;
  let playerColor = "blue";
  let player = $name;
  let rowValue = [...Array(7).keys()];
  let colValue = [...Array(5).keys()];
  let defaultColor = "rgb(107, 106, 106)";
  onMount(() => {
    scores.update((item) => (item = getScores()));
    gameButtons = document.querySelectorAll("button");
    createMatrix();
  });

  let turn_info;
  $: turn_info =
    (player == playerTwo ? playerTwo : $name) + " : Your turn to pick the chip";
  function reportWin(row, column) {
    buttonDisabled = true;
    gameOverMessage =
      "GAME OVER ! " + player + " won at " + (row + 1) + " " + (column + 1);
    buttonDisabled = true;
    scores.update(
      (item) =>
        (item = [
          ...$scores,
          {
            name: $name,
            score: player === $name ? "Won" : "Lost",
          },
        ])
    );
    setScores($scores);
  }
  function switchPlayer() {
    if (buttonDisabled && gameOverMessage) {
      turn_info = "Finished ! Reset to play again !";
    } else {
      playerColor = player === playerTwo ? "blue" : "red";
      player = player === playerTwo ? $name : playerTwo;
      turn_info = player + " : Your Turn pick any  " + playerColor + " chip .";
    }
  }
  function createMatrix() {
    for (let i = 0, k = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        gameMatrix[i][j] = gameButtons[k];
        k++;
      }
      if (i + 1 != 5) gameMatrix[i + 1] = [];
    }
  }

  //CHECK LEFT SIDE
  function checkLeft(index, k, color, c) {
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
  }
  //CHECK RIGHT SIDE
  function checkRight(index, k, color, c) {
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
  }

  //CHECK BOTTOM SIDE
  function checkBottom(index, k, color, c) {
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
  }
  //CHECK TOP SIDE
  function checkTop(index, k, color, c) {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index--;
        } else {
          c = 0;
          index--;
        }
      } else return 0;
    }
    return c;
  }
  //CHECK Diagonal SIDE
  function checkDiagonalTopRight(index, k, color, c) {
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
  }
  function checkDiagonalTopLeft(index, k, color, c) {
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
  }
  function checkDiagonalBottomLeft(index, k, color, c) {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index--;
          k++;
        } else {
          c = 0;

          index--;
        }
      } else return 0;
    }
    return c;
  }
  function checkDiagonalBottomRight(index, k, color, c) {
    for (let i = 0; i < 3; i++) {
      if (gameMatrix[index] && gameMatrix[index][k]) {
        if (gameMatrix[index][k].value === color) {
          c += 1;
          index--;
          k--;
        } else {
          c = 0;
          index--;
        }
      } else return 0;
    }
    return c;
  }
  //CHECK Middle SIDE
  function checkMiddle(index, k, color, c) {
    if (gameMatrix[index][k] && gameMatrix[index][k].value == color) {
      if (gameMatrix[index][k - 1] && gameMatrix[index][k + 1]) {
        c =
          gameMatrix[index][k - 1].value === color
            ? gameMatrix[index][k + 1].value === color
              ? 3
              : 0
            : 0;
      }
      if (gameMatrix[index - 1] && gameMatrix[index + 1] && c != 3) {
        c =
          gameMatrix[index - 1][k].value === color
            ? gameMatrix[index + 1][k].value === color
              ? 3
              : 0
            : 0;
        if (
          c != 3 &&
          gameMatrix[index - 1][k - 1] &&
          gameMatrix[index + 1][k + 1]
        ) {
          c =
            gameMatrix[index - 1][k - 1].value === color
              ? gameMatrix[index + 1][k + 1].value === color
                ? 3
                : 0
              : 0;
        }
        if (
          gameMatrix[index - 1][k + 1] &&
          gameMatrix[index + 1][k - 1] &&
          c != 3
        ) {
          c =
            gameMatrix[index - 1][k + 1].value === color
              ? gameMatrix[index + 1][k - 1].value === color
                ? 3
                : 0
              : 0;
        }
      }
      return c;
    }
    return c;
  }

  function checkIt(count, index, k) {
    if (count === 3) {
      reportWin(index, k);
    }
  }
  function checkMatrix(index, k, color) {
    let count = 0;
    count = checkTop(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkBottom(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkMiddle(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalTopRight(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalTopLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalBottomLeft(index, k, color, (count = 0));
    checkIt(count, index, k);
    count = checkDiagonalBottomRight(index, k, color, (count = 0));
    checkIt(count, index, k);
  }
  function handleClick(e) {
    playSound($sound_on);
    e.target.value = playerColor;
    e.target.style.background = playerColor;
    e.target.disabled = true;
    const i = parseInt(e.target.getAttribute("key"));
    const k = parseInt(e.target.name);
    checkMatrix(k, i, playerColor);
    switchPlayer($sound_on);
  }
  function handleReset() {
    buttonDisabled = false;
    player = $name;
    gameOverMessage = null;
    playerColor = "blue";
    turn_info = player + " : Your turn to pick the chip";
    for (let i = 0, k = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        gameMatrix[i][j].style.background = defaultColor;
        gameMatrix[i][j].value = "";
      }
    }
  }
  // RANDOM CPU PLAYER IMPLEMENTATIONS
  $: if (player === playerTwo) {
    let i, j;
    do {
      i = Math.floor((Math.random() * 108) % 4);
      j = Math.floor((Math.random() * 108) % 6);
    } while (gameMatrix[i][j].value !== null && gameMatrix[i][j].disabled);
    playSound();
    gameMatrix[i][j].value = playerColor;
    gameMatrix[i][j].style.background = playerColor;
    gameMatrix[i][j].disabled = true;
    checkMatrix(i, j, playerColor);
    switchPlayer();
  }
</script>

<style>
  div {
    line-height: 1;
  }
  button.reset-button {
    color: black;
    background: darkorange;
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
  button.options {
    display: inline-block;
    font-size: 3.8rem;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    text-decoration: none;
    border: 0.2rem solid black;
    background: rgb(107, 106, 106);
    transition: all 0.5s;
  }
  button.options:active {
    animation: slideIn 0.2s ease-in;
  }
  div.game-element {
    min-width: 25%;
    margin: 0 5%;
    flex: auto;
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
  @media only screen and (min-width: 900px) {
    button.options {
      font-size: 4.86rem;
    }
  }
</style>

<div class="game-element">
  <div class="game-container">
    <h1>Welcome to Connect Three!</h1>
    <h4>The objective of the game is to connect three chips in a row!</h4>
    {#if turn_info}
      <h5 id="turn-info">{turn_info}</h5>
    {/if}
  </div>

  <div class="game">
    {#if gameOverMessage}
      <h3 id="game-over">{gameOverMessage}</h3>
      <button class="reset-button" on:click={handleReset}>RESET GAME</button>
    {/if}
    <table>
      {#each colValue as column}
        <tr name={column}>
          {#each rowValue as row}
            <td>
              <button
                type="button"
                class="options"
                name={column}
                key={row}
                style="background:{defaultColor};"
                on:click={handleClick}
                disabled={buttonDisabled} />
            </td>
          {/each}
        </tr>
      {/each}
    </table>
  </div>
</div>
