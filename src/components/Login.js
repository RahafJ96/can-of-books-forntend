import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import '../App.css';


function LoginButton() {
  
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  

  return !isAuthenticated && (
    <>
    <h1 className="text-center txtLongin">Welcome to Can of Books app</h1>
    <Button className="text-center btnLogin" onClick={loginWithRedirect} variant="secondary" size="lg">Log in</Button>
    
    </>

  );
}

export default LoginButton;