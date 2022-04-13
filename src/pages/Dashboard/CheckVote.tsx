import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';
import Actions from './Actions';
import TopInfo from './TopInfo';

const StatutsVote = () => {
  const { address, account } = useGetAccountInfo();

  const isRegistered = Boolean(address);

  return (
    <div className='container-fluid p-1'>
      {isRegistered && (
        <div className='card-deck p-2'>
          <div className='card rounded border-1 mb-4 bg-primary'>
            <div className='card-body text-center p-4'>
              <TopInfo />
              <Actions />
            </div>
          </div>
          <div className='card rounded border-1 mb-4 bg-danger'>
            <div className='card-body text-center p-4'>
              <TopInfo />
              <Actions />
            </div>
          </div>
        </div>
      )}
      {!isRegistered && (
        <div className='card-deck p-2'>
          <div className='card rounded border-1 mb-4 bg-secondary'>
            <div className='card-body text-center p-4'>
              <TopInfo />
              <Actions />
            </div>
          </div>
          <div className='card rounded border-1 mb-4 bg-secondary'>
            <div className='card-body text-center p-4'>
              <TopInfo />
              <Actions />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatutsVote;
