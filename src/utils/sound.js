export function playSound(isSet)
{
  if (isSet) {
    new Audio(
      "https://soundsnap-prod.nyc3.digitaloceanspaces.com/files/audio/er/transcode/441497-Small_Ratchet_Metallic_Sound_Gun_Cock.mp3?response-content-disposition=attachment%3B+filename%3D%22441497-Small_Ratchet_Metallic_Sound_Gun_Cock.mp3%22&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AD4PI63EK5AJWZMJZZKH%2F20201021%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20201021T053045Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=047ce1026ea51d97ecfe94eab499220affed30dd19c990d5e2f8c7eb53017ac8"
    ).play();
  }
}
export function setSound(setValue)
{
  localStorage.setItem("sound_on", setValue ? "true" : "");
}
export default playSound;