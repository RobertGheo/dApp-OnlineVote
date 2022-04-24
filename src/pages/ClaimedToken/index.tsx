import * as React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';

const ClaimedToken = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  function popUpMessage() {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    window.location.reload();
  }

  return (
    <div className='container-fluid p-1'>
      <div className='card bg-light m-3 p-lg-2 border-0'>
        <div className='text-dark bg-warning p-4 m-lg-2 my-3 rounded border border-secondary border-1'>
          <h1 className='text-center font-weight-bold pb-4'>
            You registered but you did not vote!
          </h1>
          <div className='row'>
            <div className='card col-md-8 col-lg-8 col-xl-8 my-4 mx-lg-3 p-2 bg-warning border-secondary boreder-1'>
              <span className='h4 font-weight-bold'>Your address:</span>
              <span data-testid='accountAddress'>
                <a
                  className='text-dark h5'
                  href={`${network.explorerAddress}/address/${address}`}
                  {...{
                    target: '_blank'
                  }}
                  rel='noopener noreferrer'
                  title='View in Explorer'
                >
                  <DappUI.Trim data-testid='accountAddress' text={address} />
                </a>
              </span>
            </div>
            <div className='card bg-warning p-1 my-md-4 my-lg-0 mx-lg-1 col-md-4 col-lg-3 col-xl-3 border-0'>
              <button
                className='btn btn-success p-1 p-lg-2 m-2 m-lg-4 mb-3 mb-md-0 mx-md-3 mx-lg-4 mx-xl-5'
                onClick={popUpMessage}
              >
                <p className='h3 pt-1 text-center'>Refresh</p>
              </button>
            </div>
          </div>
          <div className='mb-2 mx-2 mt-4 mt-md-0 mt-lg-0 text-dark'>
            <span className='h5 opacity-6'>Your National ID:&nbsp;</span>
            <span className='h5 opacity-6 font-weight-bold' data-testid=''>
              AA000000A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimedToken;
