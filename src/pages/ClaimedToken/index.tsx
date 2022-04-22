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
          <h1 className='text-center pb-4'>
            You registered but you did not vote!
          </h1>
          <div className='my-4'>
            <span className='h4'>Your address:</span>
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
          <div className='mb-2 text-dark'>
            <span className='h5'>Your National ID:&nbsp;</span>
            <span className='h5 font-weight-bold' data-testid=''>
              AA000000A
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimedToken;
