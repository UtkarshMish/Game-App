<script>
  import { redirect, show } from "page";
  import { onMount } from "svelte";
  import userAuthenticated, {
    setAuthentication,
  } from "../utils/authentication";
  import Userform from "./common/Userform.svelte";
  import { age, game_type, name } from "../store/store";
  let isNotValid = true;
  onMount(() => {
    isNotValid = !userAuthenticated($name, $age);
    if (!isNotValid) redirect("/game");
  });
  const nameHolder = "Enter your Name: ";
  const handleSubmit = (errors) => {
    const { error: nameError } = errors[0];
    const { error: ageError } = errors[1];
    if (
      name.length !== 0 &&
      age.length !== 0 &&
      (nameError || ageError) == null
    ) {
      setAuthentication($name, $age, $game_type);
      show("/game");
    }
  };
</script>

<style>
  div.info__container {
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 45rem;
    min-width: 55rem;
    padding: 2.5rem 0;
    /* border: 1px groove #660b0bde; */
    border-image: space;
    -moz-box-shadow: inset 0rem 0rem 5rem #143a4962;
    -webkit-box-shadow: inset 0rem 0rem 5rem #143a4962;
    clip-path: polygon(
      0 10%,
      10% 0,
      90% 0,
      100% 10%,
      100% 90%,
      90% 100%,
      10% 100%,
      0% 90%,
      0% 10%
    );
    background-image: linear-gradient(
      to bottom,
      rgba(161, 79, 238, 0.384),
      rgba(182, 68, 68, 0.692)
    );
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  div.heading {
    text-align: center;
    font: bolder 2rem menu;
    color: greenyellow;
    border-bottom: 3px groove #143a4962;
    width: 100%;
    box-sizing: content-box;
  }
  div.body {
    font: xx-large;
  }
  h3.main__heading {
    margin: 2rem;
  }
</style>

{#if isNotValid}
  <div class="info__container">
    <div class="heading">
      <h3 class="main__heading">Enter Player Info</h3>
    </div>
    <div class="body">
      <Userform
        valueHolderA={nameHolder}
        bind:valueA={$name}
        bind:valueB={$age}
        bind:valueC={$game_type}
        {handleSubmit} />
    </div>
  </div>
{/if}
