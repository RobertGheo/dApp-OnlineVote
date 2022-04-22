import * as React from 'react';
import { DappUI, useGetNetworkConfig } from '@elrondnetwork/dapp-core';
import { Link } from 'react-router-dom';
import { contractAddressHex, contractAddressHex1, dAppName } from 'config';
import { routeNames } from 'routes';
import BallotBox1 from './ballotbox1';
import BallotBox2 from './ballotbox2';

const Home = () => {
  const { network } = useGetNetworkConfig();

  //const { address, account } = useGetAccountInfo();
  return (
    <div className='container pt-5 mt-5 border-light bg-light border-1'>
      <ul className='list-group'>
        <li className='list-group-item'>
          <div className='d-flex justify-content-center'>
            <div className='row  w-100 py-4 px-2'>
              <div className='col-10 col-md-10 col-lg-12 mx-auto'>
                <div className='card shadow border-info bg-light rounded p-1 border-1'>
                  <div className='card-body text-center'>
                    <h1 className='mb-3 font-weight-bold' data-testid='title'>
                      {dAppName}
                    </h1>

                    <h5 className='mb-2'>
                      An descentralised online voting system developed on the
                      Elrond Network.
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
        <li className='list-group-item'>
          <div className='d-flex justify-content-center'>
            <div className='row  w-100 py-4 px-2'>
              <div className='col-10 col-md-10 col-lg-12 mx-auto'>
                <div className='card shadow border-info bg-light  border-1'>
                  <div className='card-header bg-light border-info border-1'>
                    <h1 className='text-center font-weight-bold mt-1'>
                      General Election in United Kindom - 2024
                    </h1>
                  </div>
                  <div className='card-body p-3'>
                    <h3 className='text-center font-weight-bold'>
                      The Race for U.K. Prime Minister:
                    </h3>
                    <h4 className='text-center'>
                      Two Parties and Two Leaders.
                    </h4>
                    <div className='col-12 col-md-10 col-lg-12 mx-auto'>
                      <div className='card-deck py-4 px-4'>
                        <div className='card-lg col col-lg-14'>
                          <div className='card-lg col d-flex justify-content-center p-1 shadow border-primary bg-primary rounded border-1'>
                            <div className='card bg-light border-primary border-1 p-2 m-0'>
                              <h3 className='text-center mt-3 text-primary'>
                                Conservative Party Votes
                              </h3>
                              <div className='card d-flex justify-content-center p-4 bg-light border-0'>
                                <h3 className='text-center'>
                                  <>
                                    <BallotBox1 />
                                  </>
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='card-lg col col-lg-14'>
                          <div className='card-lg col d-flex justify-content-center p-1 shadow border-danger bg-danger rounded border-1'>
                            <div className='card bg-light border border-danger border-1 p-2 m-0'>
                              <h3 className='text-center px-3 mt-3 text-danger'>
                                Labour Party Votes
                              </h3>
                              <div className='card d-flex justify-content-center p-4 bg-light border-0'>
                                <h3 className='text-center'>
                                  <BallotBox2 />
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className='text-center text-secondary'>
                      Autonomus Counting:&nbsp;
                    </h4>
                    <div className='d-flex justify-content-center'>
                      <div className='spinner-grow text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div
                        className='spinner-grow text-secondary'
                        role='status'
                      >
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div className='spinner-grow text-success' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div className='spinner-grow text-danger' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div className='spinner-grow text-warning' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div className='spinner-grow text-info' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                      <div className='spinner-grow text-dark' role='status'>
                        <span className='sr-only'>Loading...</span>
                      </div>
                    </div>
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
                  <h5 className='card-text'>Who is Boris Johnson?</h5>
                  <p className='card-text'>
                    Since 2019, Boris Johnson has served as Prime Minister of
                    the United Kingdom of Great Britain and Northern Ireland.
                    Previously Foreign Secretary (2016-2018), and London Mayor
                    (2008-2016).
                  </p>
                  <a
                    href='https://www.politics.co.uk/reference/johnson-boris/'
                    className='card bg-light border-1 border-primary text-primary p-1 mb-0 text-center text-decoration-none'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    more about Boris Johnson
                  </a>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-7 mr-1'>
                      Smart Contract Address:
                    </span>
                    <span className='opacity-7 mr-1'>
                      <a
                        className='text-primary'
                        href={`${network.explorerAddress}/address/${contractAddressHex}`}
                        {...{
                          target: '_blank'
                        }}
                        rel='noopener noreferrer'
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress1'
                          text={contractAddressHex}
                        />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className='card-lg p-lg-3 py-4'></div>
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
                  <h5 className='card-text'>Who is Keir Starmer?</h5>
                  <p className='card-text'>
                    Named after the founder and first leader of the Labour Party
                    (Keir Hardie), Sir Keir Starmer is now himself Labour party
                    leader and, in turn, Leader of Her Majesty’s Opposition.
                  </p>
                  <a
                    href='https://www.politics.co.uk/reference/keir-starmer/'
                    className='card bg-light border-1 border-danger text-danger p-1 mb-0 text-center text-decoration-none'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    more about Keir Starmer
                  </a>
                </div>
                <div className='card-footer'>
                  <div className='mt-3'>
                    <span className='opacity-7 mr-1'>
                      Smart Contract address:
                    </span>
                    <span className='opacity-7 mr-1'>
                      <a
                        className='text-danger'
                        href={`${network.explorerAddress}/address/${contractAddressHex1}`}
                        {...{
                          target: '_blank'
                        }}
                        rel='noopener noreferrer'
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='contractAddress2'
                          text={contractAddressHex1}
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
            <div className='card row w-25 border-primary shadow mx-auto'>
              <Link
                to={routeNames.unlock}
                className='btn btn-primary m-2 text-white'
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
