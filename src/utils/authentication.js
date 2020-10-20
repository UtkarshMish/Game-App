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
}
export default userAuthenticated;
export const setName = (name) =>
{
  localStorage.setItem("name", name);
}