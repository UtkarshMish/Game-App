
export function playSound(isSet)
{
  if (isSet) {
    new Audio(
      "/sound/click_sound.mp3"
    ).play();
  }
}
export function setSound(setValue)
{
  localStorage.setItem("sound_on", setValue ? "true" : "");
}
export default playSound;