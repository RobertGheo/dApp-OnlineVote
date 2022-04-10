import * as React from 'react';
import {
  DappUI,
  //useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import { Link } from 'react-router-dom';
import { contractAddress, dAppName } from 'config';
import { routeNames } from 'routes';

const Home = () => {
  const { network } = useGetNetworkConfig();
  //const { address, account } = useGetAccountInfo();
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
        <li className='list-group-item '>
          <div className='col-10 col-md-10 col-lg-12 mx-auto'>
            <div className='card-deck py-4 px-2'>
              <div className='card d-flex justify-content-center shadow border-primary bg-light rounded border-1'>
                <img
                  className='card-img-top img-fluid bg-primary p-2'
                  src='../images/Boris-Johnson-profile.jpg'
                  alt='Candidate profile 1'
                />
                <div className='card-body'>
                  <h4 className='card-title'>Card Title</h4>
                  <p className='card-text'>
                    This is a wider card with supporting text below as a natural
                  </p>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-6 mr-1'>Contract address:</span>
                    <span className='opacity-6 mr-1'>
                      <a
                        href={`${network.explorerAddress}/address/${contractAddress}`}
                        {...{
                          target: '_blank'
                        }}
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress'
                          text={contractAddress}
                        />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className='card d-flex justify-content-center shadow border-danger bg-light rounded border-1'>
                <img
                  className='card-img-top img-fluid bg-danger p-2'
                  src='../images/Keir-Starmer-profile.jpg'
                  alt='Candidate profile 2'
                />
                <div className='card-body'>
                  <h4 className='card-title'>Card Title</h4>
                  <p className='card-text'>
                    This is a wider card with supporting text below as a natural
                  </p>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-6 mr-1'>Contract address:</span>
                    <span className='opacity-6 mr-1'>
                      <a
                        href={`${network.explorerAddress}/address/${contractAddress}`}
                        {...{
                          target: '_blank'
                        }}
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress'
                          text={contractAddress}
                        />
                      </a>
                    </span>
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
