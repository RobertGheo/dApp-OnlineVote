import * as React from 'react';
import {
  DappUI,
  useGetAccountInfo,
  useGetNetworkConfig,
  transactionServices,
  useGetLoginInfo,
  logout
} from '@elrondnetwork/dapp-core';
import StatutsVote from '../Dashboard/CheckVote';
import TopInfo from '../Dashboard/TopInfo';
import Transactions from '../Dashboard/Transactions';
import { routeNames } from 'routes';

const VoteDone = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const isRegistered = Boolean(address);
  const { isLoggedIn } = useGetLoginInfo();

  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <div className='card-header bg-light'>
            <div className='container-fluid p-1'>
              <div className='card bg-light p-lg-5 border-0'>
                <div className='text-white bg-success p-lg-4 m-2 my-3 rounded border-1'>
                  <h1 className='text-center p-2 py-4 p-lg-4'>
                    Already Voted for U.K. General Election 2024
                  </h1>
                  <h1 className='text-center p-3 p-lg-4 '>
                    Thank you for voting.
                  </h1>
                  <div className='mx-4 my-2 pt-5 opacity-6'>
                    <span className='h4'>Your address and ID:&nbsp;</span>
                    <span data-testid='accountAddress'>
                      <a
                        className='text-white h5'
                        href={`${network.explorerAddress}/address/${address}`}
                        {...{
                          target: '_blank'
                        }}
                        rel='noopener noreferrer'
                        title='View in Explorer'
                      >
                        <DappUI.Trim
                          data-testid='accountAddress'
                          text={address}
                        />
                      </a>
                    </span>
                  </div>
                  <div className='mx-4 opacity-6'>
                    <span className='h5'>Your National ID:&nbsp;</span>
                    <span className='h5 font-weight-bold' data-testid=''>
                      AA000000A
                    </span>
                  </div>
                  <div className=''>
                    <h3 className='text-center mx-3 m-lg-4 py-5 px-lg-4'>
                      Thankfulness for maintaining that very spirit of
                      democracy, by actually casting your very vote; which
                      actually holds so very much importance.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body d-felx flex-column m-2 p-4'>
            <div className='card bg-light p-lg-5 border-0'>
              <div className='card bg-secondary p-2 p-lg-5 shadow'>
                <div className='card bg-warning p-2 m-2 col-9 col-md-6 col-lg-3'>
                  <h2 className='m-1 my-2 font-weight-bold text-center'>
                    Complaints
                  </h2>
                </div>
                <div className='pt-4 p-2 mt-4'>
                  <h3 className='text-left text-white mx-auro mr-lg-5 mb-0'>
                    If you wish to make a complaint about the elections or
                    referendum please use&nbsp;
                    <a
                      href=''
                      className='text-monospace font-weight-bold badge badge-warning '
                    >
                      this form.
                    </a>
                  </h3>
                </div>
              </div>
            </div>
            <div className='card-deck p-1'>
              <div className='card p-2 pt-3 bg-light border-0'>
                <div className='card bg-warning shadow border-primary border-1 p-2 pb-3 mb-2'>
                  <h3 className='text-center mt-2 text-primary'>
                    Conservative Party Votes
                  </h3>
                  <div className='card d-flex justify-content-center px-2 pt-1 m-3 bg-warning border-0'>
                    <h3 className='text-center'>45544444</h3>
                  </div>
                  <div className='card p-3 bg-warning border-0'>
                    <img
                      className='card-img-top img-fluid bg-primary p-1'
                      src='../images/Boris-Johnson-profile.jpg'
                    ></img>
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
                  </div>
                  <div className='card p-2 my-2 mx-2 bg-warning border-0'></div>
                </div>
              </div>
              <div className='card p-2 pt-3 bg-light border-0'>
                <div className='card bg-warning shadow border-danger border-1 p-2 pb-3 mb-2'>
                  <h3 className='text-center mt-2 text-danger'>
                    Labour Party Votes
                  </h3>
                  <div className='card d-flex justify-content-center px-2 pt-1 m-3 bg-warning border-0'>
                    <h3 className='text-center'>45544444</h3>
                  </div>
                  <div className='card p-3 bg-warning border-0'>
                    <img
                      className='card-img-top img-fluid bg-danger p-1'
                      src='../images/Keir-Starmer-profile.jpg'
                    ></img>
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
                  </div>
                  <div className='card p-2 my-2 mx-2 bg-warning border-0'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDone;
