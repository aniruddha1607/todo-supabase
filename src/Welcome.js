import React from 'react'
import { authContext } from "./utils/authContext";
import { useContext } from "react";

const Welcome = () => {
  const authCtx = useContext(authContext);
  console.log(authCtx)
  return (
    <div>Welcome</div>
  )
}

export default Welcome