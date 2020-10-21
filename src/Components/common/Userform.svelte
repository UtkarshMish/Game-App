<script>
  import { createEventDispatcher } from "svelte";
  import { PlayIcon } from "svelte-feather-icons";
  const dispatch = createEventDispatcher();
  export let valueHolderA = "Enter: ";
  export let handleSubmit = null;
  export let valueA = "";
  export let valueB = "";
  export let valueC = "";
  let name = null;
  let years = null;
  let Errors = [{ error: null }, { error: null }];
  function setAge(e) {
    const today = new Date();
    const birthday = new Date(e.target.value);
    years = parseInt(today.getFullYear() - birthday.getFullYear());
    if (years != null && years > 3 && years < 100) {
      valueB = years;
      Errors[0].error = null;
    } else Errors[0].error = "Enter a valid age (year between 1925 & 2017).";
  }
  function checkName(e) {
    name = String(e.target.value);
    const regex = new RegExp(/^[A-Za-z]+[A-Za-z ]*$/);
    if (name != null && regex.test(name)) {
      Errors[1].error = null;
      valueA = name;
    } else {
      Errors[1].error = "Enter a Valid Name";
    }
  }
</script>

<style>
  .submit {
    border-radius: 1rem;
    background: linear-gradient(to right, #134124bd 25%, #23241479 75%);
    color: whitesmoke;
    font: 1.25rem bolder;
    outline: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    max-width: fit-content;
  }
  .submit:hover {
    transform: translateY(-0.1rem);
  }
  .submit:active {
    transform: translateY(0.1rem);
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    height: 3rem;
    width: 15rem;
    border-radius: 1rem;
    outline: none;
    font-size: x-large;
    margin: 1rem;
    background-color: beige;
    align-self: center;
    background: rgba(44, 44, 3, 0.801);
    color: azure;
    transition: all 0.2s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
  input:focus {
    transform: scale(1.1);
  }
  input[type="radio"] {
    height: 26px;
    width: 26px;
  }
  label {
    display: flex;
    white-space: nowrap;
    align-items: center;
  }
  label {
    border: 1px solid azure;
    padding: 0 3%;
    border-radius: 1rem;
    margin: auto 1px;
  }
  div.game__type {
    display: flex;
    font-size: large;
    color: azure;
    justify-content: center;
  }
  input::placeholder {
    color: rgba(240, 255, 255, 0.74);
  }
  input::selection {
    background-color: rgb(202, 194, 194);
  }
  li {
    color: rgb(219, 73, 47);
    margin: 1px;
    font-size: large;
  }
</style>

<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    maxlength="30"
    class="form__input-text"
    placeholder={valueHolderA}
    on:input={checkName}
    required />
  <input type="date" on:input={setAge} required />
  <div class="game__type">
    <label for="single-player">Single Player
      <input
        type="radio"
        name="game_type"
        value="single-player"
        id="single-player"
        bind:group={valueC}
        checked
        required /></label>
    <label for="multi-player">Multi Player
      <input
        type="radio"
        name="game_type"
        value="multi-player"
        id="multi-player"
        bind:group={valueC} /></label>
  </div>
  <ul style="text-align:left;">
    {#each Errors as errorValues}
      {#if errorValues.error}
        <li>{errorValues.error}</li>
      {/if}
    {/each}
  </ul>
  <button type="submit" class="submit">
    <PlayIcon size="32" />
    <span>Start Game</span>
  </button>
</form>
