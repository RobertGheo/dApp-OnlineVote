import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as ElrondLogo } from './../../../assets/img/elrond.svg';

const Navbar = () => {
  const { address } = useGetAccountInfo();
  const handleLogout = () => {
    logout(`${window.location.origin}${routeNames.home}`);
  };

  const isLoggedIn = Boolean(address);

  const { search } = useLocation();
  const isCheckPage = Boolean(search);

  return (
    <BsNavbar className='navbar fixed-top navbar-expand-lg bg-light border-bottom border-info px-4 pr-5 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand ml-4'
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <ElrondLogo className='elrond-logo' />
          <span className='dapp-name text-info'>{dAppName}</span>
        </Link>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <NavItem>
              <div className='bg-light shadow border-1'>
                <div className='card d-flex flex-row bd-highlight bg-light border-1'>
                  <div className='p-0 bd-highlight'>
                    <button
                      className='btn btn-outline-info btn-lg '
                      onClick={handleLogout}
                    >
                      Close
                      <Link to={routeNames.unlock}>Login</Link>
                    </button>
                  </div>
                </div>
              </div>
            </NavItem>
          )}
          {!isLoggedIn && !isCheckPage && (
            <NavItem>
              <Link
                to={routeNames.unlock}
                className='btn btn-outline-primary bg-primary btn-lg m-3 text-light'
                data-testid='loginBtn'
              >
                Login
              </Link>
            </NavItem>
          )}
          {!isLoggedIn && !isCheckPage && (
            <NavItem>
              <Link
                to={routeNames.home}
                className='btn btn-outline-primary btn-lg m-3'
                data-testid='loginBtn'
              >
                Back
              </Link>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
