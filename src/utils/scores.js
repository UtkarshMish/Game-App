
export function getScores()
{
  const score = JSON.parse(localStorage.getItem("scores")) || [];
  return score;
}
export function setScores(score)
{

  localStorage.setItem("scores", JSON.stringify(score));
}
export function clearScore()
{
  localStorage.removeItem("scores");
}