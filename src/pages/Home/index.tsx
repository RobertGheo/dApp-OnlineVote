import * as React from 'react';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';

const Home = () => {
  return (
    <div className='container p-1 border-light bg-light'>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <div className='d-flex justify-content-center'>
            <div className='row  w-100 py-4 px-2'>
              <div className='col-10 col-md-10 col-lg-12 mx-auto'>
                <div className='card shadow border-info bg-light rounded p-1 border-2'>
                  <div className='card-body text-center'>
                    <h2 className='mb-3 h1' data-testid='title'>
                      {dAppName}
                    </h2>

                    <p className='mb-2'>
                      An descentralised online voting system developed on the
                      Network.
                    </p>
                    <h2 className='text-primary'>
                      Transparent - Secure - Immutable
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className='list-group-item'>
          <div className='d-flex justify-content-center px-4 py-4'>
            <div className='card row w-25  mx-auto'>
              <Link
                to={routeNames.unlock}
                className='btn btn-primary m-3 text-white'
                data-testid='loginBtn'
              >
                Login
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Home;
