<script>
  import { clearAuthentication, setName } from "../../utils/authentication";

  import { age, name } from "../../store/store";
  import { redirect } from "page";

  let showName = false;
  function handleQuit() {
    clearAuthentication();
    name.set("");
    age.set("");
    redirect("/");
  }
  function handleNameChange() {
    if (showName == true) setName($name);
    showName = !showName;
  }
  const DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
  };
</script>

<style>
  div {
    width: 100%;
    margin-bottom: 1vmax;
  }
  div.heading {
    border-bottom: 4px solid white;
    margin-bottom: 1rem;
  }
  .option {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    text-align-last: center;
  }
  label {
    font: bold message-box;
  }
  button {
    width: 100%;
  }
  button.quit-button {
    color: tomato;
    font-weight: bolder;
    font-size: x-large;
    margin-top: 25%;
    align-self: flex-end;
    border-radius: 2rem;
    border: 5px groove greenyellow;
  }
</style>

<div class="game__options">
  <div class="heading">
    <h1>Game Settings</h1>
  </div>
  <div class="option">
    <label for="difficulty">Select Difficulty: </label>
    <select name="difficulty">
      <option value={DIFFICULTY.EASY}>{DIFFICULTY.EASY}</option>
      <option value={DIFFICULTY.MEDIUM}>{DIFFICULTY.MEDIUM}</option>
      <option value={DIFFICULTY.HARD}>{DIFFICULTY.HARD}</option>
    </select>
  </div>
  <form on:submit|preventDefault={handleNameChange} class="option">
    {#if showName}
      <input
        type="text"
        bind:value={$name}
        pattern="^[A-Za-z ]+$"
        label="Enter Only Alphabets"
        required />
    {/if}
    <button type="submit">{!showName ? 'Change Name' : 'Set'}</button>
  </form>
  <div class="option" on:click={handleQuit}>
    <button class="quit-button">QUIT GAME</button>
  </div>
</div>
