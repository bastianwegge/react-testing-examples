// src/components/Navbar.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';

// component to test
import Navbar from './Navbar';

// create a dummy user profile
// const user = {
//   email: 'johndoe@me.com',
//   email_verified: true,
//   sub: 'google-oauth2|2147627834623744883746',
// };
// you could use this user by passing it to the defaultUseAuth0 mock object

// import the auth0 hook
import { useAuth0 } from '@auth0/auth0-react';

// intercept the useAuth0 function and mock it
jest.mock('@auth0/auth0-react');

// create a default mock of useAuth
const defaultUseAuth0 = {
  isAuthenticated: false,
  logout: jest.fn(),
  // user: user,
  loginWithRedirect: jest.fn(),
};

describe('components/navbar', () => {
  it('Renders "Log in" with required props', async () => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({ defaultUseAuth0, ...{ isAuthenticated: false } });

    render(<Navbar />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('Renders "Log out" when logged in', async () => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({ defaultUseAuth0, ...{ isAuthenticated: true } });
    render(<Navbar />);
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });
});
