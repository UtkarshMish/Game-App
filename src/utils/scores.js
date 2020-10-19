export function getScores()
{
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  return scores;
}
export function setScores(scores)
{
  const values = JSON.stringify(scores);
  localStorage.setItem("scores", values);
}
export function clearScore()
{
  localStorage.removeItem("scores");
}