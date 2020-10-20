<script>
  import { clearScore } from "../../utils/scores";
  import { scores } from "../../store/store";
  function handleClear() {
    scores.set([]);
    clearScore();
  }
</script>

<style>
  div.scoreboard {
    display: flex;
    justify-content: center;
  }
  div.score-container {
    border-top: 4px groove #660b0bde;
    border-radius: 1.2rem;
  }
  table,
  td,
  th {
    border-collapse: collapse;
    border: 3px groove chocolate;
  }
  table {
    border-radius: 2vmax;
  }
  th {
    background: chocolate;
  }
  td,
  th {
    padding: 1rem;
    font-size: large;
  }
  td[name="Won"] {
    background: rgba(172, 255, 47, 0.664);
  }
  td[name="Lost"] {
    background: rgba(255, 0, 0, 0.658);
  }
</style>

{#if $scores != null && $scores.length !== 0}
  <div class="score-container">
    <div class="score-heading">
      <h2>Score Board</h2>
      <button on:click={handleClear}>Clear Scores</button>
    </div>
    <div class="scoreboard">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {#each $scores as { name, score }}
            <tr>
              <td>{name}</td>
              <td name={score}>{score}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}
