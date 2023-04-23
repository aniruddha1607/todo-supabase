import { createContext, useEffect, useState } from "react";
import { supabase } from '../CreateClient'

export const authContext = createContext({
    uid : '',
    token : '',
    isAuthenticated : false,
    email : '',
    // isPremium : null,
    authenticate: () => {},
    logout: () => {},
    setemail: () => {},
    // premium: () => {}

});

function AuthContextProvider({children}) {

    const[authToken, setAuthToken] = useState('');
    const[userId, setUserId] = useState('');
    const[email, setEmail] = useState('');
    // const[isPremium, setIsPremium] = useState(null);

    // token, recievedUserId, recievedemail
    async function authenticate() {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setAuthToken(session.user.id);
            setUserId(session.user.id)
            setEmail(session.user.email)
          })
        
    }

    function logout() {
        setAuthToken(null);
        setUserId(null)
        // setIsPremium(null)
    }
    

    // function premium() {
    //     setIsPremium(true);
    // }

    const value = {
        uid : userId,
        token : authToken,
        isAuthenticated : !!authToken,
        email : email,
        // isPremium : isPremium,
        authenticate : authenticate,
        logout : logout,
        // premium : premium
    }

    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export default AuthContextProvider;