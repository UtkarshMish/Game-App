<style>
  div {
    width: 100%;
    margin-bottom: 1vmax;
  }
  div.heading {
    border-bottom: 4px solid white;
    margin-bottom: 1rem;
  }
  div.option {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
  }
</style>

<div class="game__options">
  <div class="heading">
    <h1>Game Settings</h1>
  </div>
  <div class="option">
    <label for="difficulty">Select Difficulty</label>
    <select name="difficulty" id="">
      <option value="">EASY</option>
      <option value="">MEDIUM</option>
      <option value="">HARD</option>
    </select>
  </div>
</div>
