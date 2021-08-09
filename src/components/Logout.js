import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import '../App.css';


function LogoutButton() {
  const {
    isAuthenticated,
    logout,
  } = useAuth0();

  return isAuthenticated && (
    <Button  className="justify-content-end" variant="warning" size="md" onClick={() => {
      logout({ returnTo: window.location.origin });
    }}>Log out</Button>

  );
}

export default LogoutButton;