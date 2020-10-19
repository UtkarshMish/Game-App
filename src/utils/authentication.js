const userAuthenticated = (name, age) =>
{
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