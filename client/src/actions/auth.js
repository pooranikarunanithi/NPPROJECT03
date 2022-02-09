import axios from "axios";


export const register = async (user) =>
 await axios.post("api/register", user);

  export const login = async (user) =>
 await axios.post("api/login", user);

 // update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("user")) {
    let auth = JSON.parse(localStorage.getItem("user"));
    user.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    next();
  }
};


