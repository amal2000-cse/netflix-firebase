import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({children}) => {
    const {user}=UserAuth()

    //now if the user is not logged in it will redirect us to homepage

    if(!user){
        return <Navigate to='/' />
    }
    else{
        return children
    }
 
}

export default ProtectedRoute