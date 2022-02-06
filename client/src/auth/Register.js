import { useState } from "react";
import RegisterForm from '../components/RegisterFom';
import { toast } from "react-toastify";
import { register }from "../actions/auth"
import { useNavigate } from 'react-router-dom';

import { Redirect } from 'react-router';
//import { NavLink } from 'react-router-dom';

const Register = () => {
const [name, setName] =useState("");
const [email, setEmail] =useState("");
const [password, setPassword] =useState("");
const navigate = useNavigate();




const handleSubmit = async (e) => {
 e.preventDefault();
 try{
 //console.table({name,email,password});
   const res = await register({
       name,
       email,
       password,
   });
   
    console.log("REGISTER USER ===>", res);
    toast.success("Registered Successfully,Please Login");
    navigate("/login");
  

//<NavLink activeClassName="active" to="/login"></NavLink>
//<Redirect to='/login' />
}

catch(err){
    console.log(err);
    
     if (err.response.status === 400) toast.error(err.response.data);
} 
  };

  
    return(
        <>
        <div className= "container-fluid bg-secondary p-5 text-center">
            <h1>Register</h1>
        </div>
        
        <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <RegisterForm handleSubmit={handleSubmit} 
              name={name}
              setName={setName} 
              email={email} 
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>

        </>
        )
    };
    export default Register;