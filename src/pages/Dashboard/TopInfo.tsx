import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';
import Actions from './Actions/index';
import Actions1 from './Actions/index1';
//import { useLocation } from 'react-router-dom';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  return (
    <div className='text-white bg-primary' data-testid='topInfo'>
      <div className='mb-1'>
        <span className='opacity-6 mr-1'>Your address:</span>
        <span data-testid='accountAddress'> {address}</span>
      </div>
      <div className='mb-4'>
        <span className='opacity-6 mr-1'>Contract address:</span>
        <span data-testid='contractAddress'> {contractAddress}</span>
      </div>
      <div>
        <h3 className='py-2'>
          <DappUI.Denominate value={account.balance} data-testid='balance' />
        </h3>
      </div>
      <div className='card bg-primary border-light border-1'>
        <Actions />
      </div>
      <div className='card bg-danger border-light border-1'>
        <Actions1 />
      </div>
    </div>
  );
};

export default TopInfo;
