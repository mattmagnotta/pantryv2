import React,{useContext} from 'react'
import {UserProvider,UserContext, UserDispatchContext} from './Context'
import App from './App';

function Wrapper(){
  const userDetails = useContext(UserContext);
  const setUserDetails = useContext(UserDispatchContext);
  return (
    <UserProvider>
      <App/>
    </UserProvider>
  )
}
export default Wrapper
