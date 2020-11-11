<script>
</script>

<style>
  main.home {
    max-width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  .home__container {
    margin-top: 25%;
  }
  .main__heading {
    font-size: 6rem;
    color: white;
  }
  a {
    text-decoration: none;
  }
  button {
    cursor: pointer;
    padding: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(to top, #fc3, #dd3) transparent;
    border-radius: 1rem;
    transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);
  }
  button:active {
    background: linear-gradient(
        to top,
        rgba(255, 204, 51, 0.836),
        rgba(221, 221, 51, 0.637)
      )
      transparent;
  }
  button:hover {
    transform: scale(1.05);
  }
</style>

<main class="home">
  <div class="home__container">
    <h5 class="main__heading">Connect Three</h5>
    <a href="./details"> <button>Let's Play !</button></a>
  </div>
</main>
