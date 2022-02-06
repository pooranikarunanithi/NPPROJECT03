let userState;
if(window.localStorage.getItem("auth"))
{
  userState =JSON.parse(window.localStorage.getItem("auth"));
}  else{
  userState =null; 
}

// 2.create user reducer fuction
 export const authReducer=(state = userState ,action) => {//{ type:'LOGGED_IN_USER4',payload:{name:'ryan',role:'seller'}}
    switch(action.type){
      case "LOGGED_IN_USER":
        return {...state, ...action.payload}
        case "LOGOUT":
          return action.payload;
          default:
            return state;
    }
  }
  export default authReducer;