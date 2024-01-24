import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../firebase";
import {setDoc,doc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user,setUser]=useState({})

    //creating a user with email and password
    function signUp(email,password){
         createUserWithEmailAndPassword(auth,email,password)
         //making a new collection named - users when the user signUp
         setDoc(doc(db,'users',email),{
            savedShows:[]
         })
    }

    function logIn(email,password){
        return signInWithEmailAndPassword(auth,email,password)

    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(()=>{
        //now checking if the user is logged in out not
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })

        return()=>{
            unsubscribe();
        }
    })


    //now we are adding all the values that we want access in the other components
  return <AuthContext.Provider value={{signUp,logIn,logOut,user}}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
  return useContext(AuthContext);
}
