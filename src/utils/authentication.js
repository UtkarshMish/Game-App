const userAuthenticated = (name, age) =>
{
  if (name == null || age == null || name.length == 0 || !(112 < age < 3) || isNaN(age)) {
    return false;
  }
  return true;
}
export const clearAuthentication = () =>
{
  localStorage.removeItem("name");
  localStorage.removeItem("age");
  localStorage.removeItem("game_type");
}
export default userAuthenticated;
export const setName = (name) =>
{
  localStorage.setItem("name", name);
}
export const setAuthentication = (name, age, game_type) =>
{
  localStorage.setItem("name", name);
  localStorage.setItem("age", age);
  localStorage.setItem("game_type", game_type);
}