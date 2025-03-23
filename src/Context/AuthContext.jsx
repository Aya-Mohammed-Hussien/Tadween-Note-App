import axios from "axios";
import React, { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthContext({children}) {
  const [token, setToken] = useState(localStorage.getItem('userToken') || "");

// Function to handle registerForm
const registerUserFn = async(values)=>{
    try {
    const data =await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp` , values);
    console.log(data);
    return data ;
    } catch (error) {
     console.log('error from register form' , error);
     throw error ;
    }
}
// Function to handle loginForm
const loginUserFn = async(values)=>{
    try {
    const data =await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn` , values);
    console.log(data);
    setToken(data.data.token);
    localStorage.setItem('userToken' , data.data.token);
    return data ;
    } catch (error) {
     console.log('error from login form' , error);
     throw error ;
    }
}

  return <authContext.Provider value={{
    registerUserFn ,
    loginUserFn ,
    setToken,
    token,
  }}>
    {children}
  </authContext.Provider>;
}
