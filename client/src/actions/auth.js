import axios from "axios";


export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

  export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

 // update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("user")) {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth.user = user;
    localStorage.setItem("user", JSON.stringify(auth));
    next();
  }
};


