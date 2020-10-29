// src/components/NavBar.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Log in</button>}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;
