<script>
  import { onMount } from "svelte";
  import { redirect } from "page";
  import userAuthenticated from "../utils/authentication";
  import { setScores, getScores } from "../utils/scores";

  import ConnectGame from "./common/ConnectGame.svelte";
  import Scorelist from "./common/Scorelist.svelte";
  export let name = "";
  export let age = "";
  let scores = getScores();
  let isNotValid = true;
  onMount(async () => {
    name = String(localStorage.getItem("name")) || name;
    age = parseInt(localStorage.getItem("age")) || name;
    isNotValid = !userAuthenticated();
    if (isNotValid) {
      redirect("/");
      return;
    }
  });
  function updateScore(values) {
    scores = [...values];
    setScores(values);
  }
</script>

<style>
  .game__container {
    background: repeating-radial-gradient(
      ellipse at center,
      #000521b9,
      #aa11223a
    );
    color: whitesmoke;
    display: flex;
    min-height: 80vh;
    width: 100%;
    border-radius: 1vmax;
    flex-wrap: wrap;
  }
  .user__info {
    width: inherit;
    max-width: 20rem;
    border-right: 2px groove #660b0bde;
    border-radius: 1vmax;
  }
  div.info {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 2rem;
    font: message-box;
    justify-content: space-between;
  }
  @media only screen and (max-width: 900px) {
    .user__info {
      border: none;
    }
  }
</style>

{#if !isNotValid}
  <div class="game__container">
    <div class="user__info">
      <h3>Player Info</h3>
      <div class="info">
        <p>Player Name:&nbsp;</p>
        <p>{name}</p>
      </div>
      <div class="info">
        <p>Age:&nbsp;</p>
        <p>{age}</p>
      </div>
      {#if scores.length !== 0}
        <Scorelist {scores} />
      {/if}
    </div>
    <ConnectGame {name} {scores} {updateScore} />
  </div>
{/if}
