import React, { createContext, useState, useEffect } from 'react'
import { Global } from '../helpers/Global';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [counters, setCounters] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authUser();
    }, [])

    const authUser = async() => {
        //Sacar datos del user identificado del localStorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user")

        //Comprobar si tengo el token y el user
        if(!token || !user){
            setLoading(false)
            return false;
        }
        //Transformar los datos a un objeto de js
        const userObj = JSON.parse(user);
        const userId = userObj.id

        //Peticion ajax al backend que compruebe el token
        const request = await fetch(Global.url+"user/profile/"+userId, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })

        //Que me devulva los datos de usuario
        const data = await request.json()

        //Setear el estado de auth
        setAuth(data.user)

        //Peticion ajax al backend que compruebe el token
        const requestCounters = await fetch(Global.url+"user/counters/"+userId, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        })

        //Que me devulva los datos de usuario
        const dataCounters = await requestCounters.json()
        setCounters(dataCounters)
        setLoading(false)

    }

    return (<AuthContext.Provider value={{
        auth, 
        setAuth,
        counters,
        setCounters,
        loading
    }}> {children} </AuthContext.Provider>)
}

export default AuthContext;
