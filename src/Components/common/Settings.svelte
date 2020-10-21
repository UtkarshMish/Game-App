<script>
  import { clearAuthentication, setName } from "../../utils/authentication";
  import { Volume2Icon, VolumeXIcon } from "svelte-feather-icons";
  import { age, name, sound_on } from "../../store/store";
  import { redirect } from "page";
  import { setSound } from "../../utils/sound";
  let newName = $name;
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
  function setNewName() {
    const itemCheck = new RegExp().compile("^[A-Za-z]+[A-za-z ]*$");
    if (newName && itemCheck.test(newName))
      name.update((newValue) => (newValue = newName));
    else if (newName.length < 2) {
      name.update((newValue) => (newValue = localStorage.getItem("name")));
    }
  }
  function toggleSound() {
    sound_on.update((sound) => (sound = !sound));
    setSound($sound_on);
  }
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
  .option:not(:last-child) {
    border-bottom: 3px groove #00ff377d;
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
    margin-top: 45%;
    align-self: flex-end;
    border-radius: 2rem;
    border: 5px groove greenyellow;
  }
  span {
    align-self: normal;
    font-size: 1.2rem;
    text-align-last: center;
  }
  div.sound_option {
    width: fit-content;
  }
</style>

<div class="game__options">
  <div class="heading">
    <h1>Game Settings</h1>
  </div>
  <div class="option">
    <label for="difficulty" id="difficulty">Select Difficulty: </label>
    <select name="difficulty" id="difficulty">
      <option value={DIFFICULTY.EASY}>{DIFFICULTY.EASY}</option>
      <option value={DIFFICULTY.MEDIUM}>{DIFFICULTY.MEDIUM}</option>
      <option value={DIFFICULTY.HARD}>{DIFFICULTY.HARD}</option>
    </select>
  </div>
  <form on:submit|preventDefault={handleNameChange} class="option">
    {#if showName}
      <input
        on:keyup={setNewName}
        type="text"
        bind:value={newName}
        pattern="^[A-Za-z ]+$"
        label="Enter Only Alphabets"
        maxlength={20}
        required />
    {/if}
    <button type="submit">{!showName ? 'Change Name' : 'Set'}</button>
  </form>
  <div class="option">
    <span>Music </span>
    <div class="sound_option" on:click={toggleSound}>
      {#if $sound_on}
        <Volume2Icon size="32" />
      {:else}
        <VolumeXIcon size="32" />
      {/if}
    </div>
  </div>
  <div class="option" on:click={handleQuit}>
    <button class="quit-button">QUIT GAME</button>
  </div>
</div>
