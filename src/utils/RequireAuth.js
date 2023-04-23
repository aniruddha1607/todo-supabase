import { Navigate } from "react-router-dom";
import { authContext } from "./authContext";
import { useContext } from "react";
import { useState } from "react";
import { supabase } from "../CreateClient";
import { useEffect } from "react";

function RequireAuth({ children }) {
  const authCtx = useContext(authContext);
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session.user.id)
      console.log(session.user.id)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  if(!authCtx.isAuthenticated) {
    return <Navigate to='/login' />
  } 

  return children

  
}

export default RequireAuth