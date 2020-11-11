<script>
  import { onMount } from "svelte";
  import { redirect } from "page";
  import userAuthenticated from "../utils/authentication";
  import ConnectGame from "./common/ConnectGame.svelte";
  import Scorelist from "./common/Scorelist.svelte";
  import { age, name } from "../store/store";
  import Settings from "./common/Settings.svelte";

  let isNotValid = true;
  onMount(async () => {
    isNotValid = !userAuthenticated($name, $age);
    if (isNotValid) {
      redirect("/details");
      return;
    }
  });
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
  div.game__settings {
    display: flex;
    width: inherit;
    max-width: 15%;
    border-left: 2px groove #660b0bde;
    margin-left: 1.5rem;
    padding: 0 5%;
    border-radius: 1vmax;
    justify-content: center;
  }
  h3 {
    font-size: 2.5rem;
    border-bottom: 4px groove whitesmoke;
    margin: 1.5rem 3.5rem;
    padding: 1.5rem;
  }

  @media only screen and (max-width: 900px) {
    .user__info,
    div.game__settings {
      border: none;
    }
    div.user__info,
    div.game__settings {
      max-width: unset;
    }
  }
</style>

{#if !isNotValid}
  <div class="game__container">
    <div class="user__info">
      <h3>Player Info</h3>
      <div class="info">
        <p>Player Name:&nbsp;</p>
        <p>{$name}</p>
      </div>
      <div class="info">
        <p>Age:&nbsp;</p>
        <p>{$age}</p>
      </div>
      <Scorelist />
    </div>
    <ConnectGame />
    <div class="game__settings">
      <Settings />
    </div>
  </div>
{/if}
