export const getUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user?.token);
  return user;
};
