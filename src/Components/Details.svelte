<script>
  import { redirect, show } from "page";
  import { onMount } from "svelte";
  import userAuthenticated from "../utils/authentication";
  import Userform from "./common/Userform.svelte";
  import { age, name } from "../store/store";
  let isNotValid = true;
  onMount(() => {
    isNotValid = !userAuthenticated($name, $age);
    if (!isNotValid) redirect("/game");
  });
  const nameHolder = "Enter your Name: ";
  const handleSubmit = () => {
    if (name.length !== 0 && age.length !== 0) {
      localStorage.setItem("name", $name);
      localStorage.setItem("age", $age);
      show("/game");
    }
  };
</script>

<style>
  div.info__container {
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    min-width: 35%;
    padding: 2.5rem 0;
    /* border: 1px groove #660b0bde; */
    border-image: space;
    -moz-box-shadow: inset 0 0 10px black;
    -webkit-box-shadow: inset 0 0 10px black;
    box-shadow: inset 1rem 1rem 10rem #660b0bde;
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
  }
  div.heading {
    text-align: center;
    font: bolder 2rem menu;
    color: #f1d5f0;
    border-bottom: 3px groove #660b0bde;
    width: 100%;
    margin-top: -2rem;
    box-sizing: content-box;
  }
  div.body {
    font: normal large;
  }
</style>

{#if isNotValid}
  <div class="info__container">
    <div class="heading">
      <h3 class="main__heading">Enter Your Details</h3>
    </div>
    <div class="body">
      <Userform
        valueHolderA={nameHolder}
        bind:valueA={$name}
        bind:valueB={$age}
        {handleSubmit} />
    </div>
  </div>
{/if}
