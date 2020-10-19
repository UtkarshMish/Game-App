const userAuthenticated = () =>
{
  const name = String(localStorage.getItem("name")) || null;
  const age = parseInt(localStorage.getItem("age")) || null;
  if (name == null || age == null || name.length == 0 || !(112 < age < 3) || isNaN(age)) {
    return false;
  }
  return true;
}
export const clearAuthentication = () =>
{
  localStorage.clear();
}
export default userAuthenticated;