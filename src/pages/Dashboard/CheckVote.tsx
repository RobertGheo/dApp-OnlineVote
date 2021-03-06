import * as React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';
import BallotBox1 from 'pages/Home/ballotbox1';
import BallotBox2 from 'pages/Home/ballotbox2';
import ActionsBlue from './Actions/indexBlue';
import ActionsRed from './Actions/indexRed';

const StatutsVote = () => {
  const { address } = useGetAccountInfo();

  const isRegistered = Boolean(address);

  return (
    <div className='container-fluid p-1'>
      {isRegistered && (
        <div className='card-deck p-1'>
          <div className='card py-2 px-2 pt-3 bg-light border-0'>
            <div className='card bg-light shadow border-primary border-1 p-2 pb-3 mb-2'>
              <h3 className='text-center mt-2 text-primary'>
                Conservative Party Votes
              </h3>
              <div className='card d-flex justify-content-center px-2 mt-2 m-lg-3 bg-light border-0'>
                <div className='card mx-2 bg-light border-primary border-1'>
                  <h3 className='text-center pt-2 '>
                    <BallotBox1 />
                  </h3>
                </div>
              </div>
              <div className='card p-3 bg-light border-0'>
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
              <div className='card p-2 my-2 mx-2 bg-light border-0'>
                <ActionsBlue />
              </div>
            </div>
          </div>
          <div className='card p-2 pt-3 bg-light border-0'>
            <div className='card bg-light shadow border-danger border-1 p-2 pb-3 mb-2'>
              <h3 className='text-center mt-2 text-danger'>
                Labour Party Votes
              </h3>
              <div className='card d-flex justify-content-center px-2 mt-2 m-lg-3 bg-light border-0'>
                <div className='card mx-2 bg-light border-danger border-1'>
                  <h3 className='text-center pt-2'>
                    <BallotBox2 />
                  </h3>
                </div>
              </div>
              <div className='card p-3 bg-light border-0'>
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
              <div className='card p-2 my-2 mx-2 bg-light border-0'>
                <ActionsRed />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatutsVote;
