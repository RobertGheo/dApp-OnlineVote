import * as React from 'react';
import {
  DappUI,
  //useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import { Link } from 'react-router-dom';
import { contractAddress1, contractAddress2, dAppName } from 'config';
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
                    <h1 className='mb-3 font-weight-bold' data-testid='title'>
                      {dAppName}
                    </h1>

                    <h5 className='mb-2'>
                      An descentralised online voting system developed on the
                      Network.
                    </h5>
                    <h2 className='text-primary mt-3 font-weight-bold'>
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
            <div className='card-deck py-4 px-2 '>
              <div className='card d-flex justify-content-center shadow border-primary bg-light rounded border-1'>
                <img
                  className='card-img-top img-fluid bg-primary p-2'
                  src='../images/Boris-Johnson-profile.jpg'
                  alt='Candidate profile 1'
                />
                <div className='card-img-overlay'>
                  <p className='card-text text-right'>
                    <a
                      href='https://pocketmags.com/prospect-magazine/augsept-21/articles/1009926/the-prime-etonian'
                      className='text-light font-italic badge badge-primary'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Ilustration by Tim McDonagh
                    </a>
                  </p>
                </div>
                <div className='card-body'>
                  <h2 className='card-title font-weight-bold'>Boris Johnson</h2>
                  <p className='card-text'>
                    This is a wider card with supporting text below as a natural
                  </p>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-6 mr-1'>Contract address:</span>
                    <span className='opacity-6 mr-1'>
                      <a
                        href={`${network.explorerAddress}/address/${contractAddress1}`}
                        {...{
                          target: '_blank'
                        }}
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress1'
                          text={contractAddress1}
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
                <div className='card-img-overlay'>
                  <p className='card-text text-right'>
                    <a
                      href='https://pocketmags.com/eu/prospect-magazine/apr-2020/articles/737871/keir-starmer-the-case-for-the-defence'
                      className='text-light font-italic badge badge-danger'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Ilustration by Tim McDonagh
                    </a>
                  </p>
                </div>
                <div className='card-body'>
                  <h2 className='card-title font-weight-bold'>Keir Starmer</h2>
                  <p className='card-text'>
                    This is a wider card with supporting text below as a natural
                  </p>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-6 mr-1'>Contract address:</span>
                    <span className='opacity-6 mr-1'>
                      <a
                        href={`${network.explorerAddress}/address/${contractAddress2}`}
                        {...{
                          target: '_blank'
                        }}
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress2'
                          text={contractAddress2}
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
