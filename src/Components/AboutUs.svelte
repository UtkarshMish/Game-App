<script>
  import About from "./common/About.svelte";
</script>

<style>
  div.main__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  h3.main__heading {
    color: azure;
    font-size: xxx-large;
  }
</style>

<div class="main__container">
  <h3 class="main__heading">About</h3>
  <About />
</div>
