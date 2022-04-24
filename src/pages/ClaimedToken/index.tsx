import * as React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';

const ClaimedToken = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();

  return (
    <div className='container-fluid p-1'>
      <div className='card bg-light m-3 p-lg-2 border-0'>
        <div className='text-dark bg-warning p-4 m-lg-2 my-3 rounded border border-secondary border-1'>
          <h1 className='text-center font-weight-bold pb-4'>
            You registered but you did not vote!
          </h1>
          <div className='card col-lg-7 my-4 p-2 bg-warning border-secondary boreder-1'>
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
          <div className='mb-2 mx-2 text-dark'>
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
