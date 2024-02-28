import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BAKND = "http://localhost:5005"

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [ isLoggedIn, setIsLoggenIn ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ user, setUser ] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('token', token)
    }

    const authenticateUser = async () => {

        const storeToken = localStorage.getItem('token');

        if(storeToken) {
            const response = await axios.get(`${API_BAKND}/auth/verify`, { headers: { AuthTokenCarier: `Bearer ${storeToken}`} } ) // NOTE!!! the declared AuthTokenCarier is casd insensitive... aka need to be small letters when refered in the backend. Somewhere they are toLowerCase()ed.
            const resUser = response.data
            // console.log("user response from the BAKND ==> ", resUser)
            setIsLoggenIn(true);
            setIsLoading(false);
            setUser(resUser);
        } else {
            setIsLoggenIn(false);
            setIsLoading(false);
            setUser(null)
        }
    }



    useEffect(() => {
        authenticateUser();
    }, [])
    
    return(
        <AuthContext.Provider value={{ storeToken, authenticateUser, isLoggedIn, isLoading, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext };