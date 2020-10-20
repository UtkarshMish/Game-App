<script>
  import router from "page";
  import AboutUs from "./Components/AboutUs.svelte";
  import Details from "./Components/Details.svelte";
  import Game from "./Components/Game.svelte";
  let page;
  router("/", () => (page = Details));
  router("/about", () => (page = AboutUs));
  router("/game", () => (page = Game));
  router.start();
</script>

<style>
  .App {
    text-align: center;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  :global(body) {
    background: linear-gradient(
      264.51deg,
      rgb(109, 85, 0) 4.38%,
      rgb(111, 0, 0) 11.51%,
      rgb(112, 0, 0) 25.06%,
      rgb(118, 3, 69) 36.04%,
      rgb(34, 39, 41) 47.63%,
      rgb(38, 0, 113) 59.03%,
      rgb(7, 148, 141) 69.96%,
      rgb(31, 147, 69) 83.74%,
      rgb(0, 73, 22) 95.62%
    );
    background-position: 58% 50%;
    background-size: 500%;
    animation: changeBackground 15s ease-out 0s alternate infinite;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  @keyframes changeBackground {
    0% {
      background-position: 22% 0%;
    }
    100% {
      background-position: 64% 54%;
    }
  }
</style>

<main>
  <div class="App">
    <svelte:component this={page} />
  </div>
</main>
