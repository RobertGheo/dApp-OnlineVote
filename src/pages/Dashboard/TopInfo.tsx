import * as React from 'react';
import { useGetAccountInfo, DappUI } from '@elrondnetwork/dapp-core';
import { contractAddress } from 'config';
//import { useLocation } from 'react-router-dom';

const TopInfo = () => {
  const { address, account } = useGetAccountInfo();

  //const addressR = address;
  //const apiElrond = 'https://api.elrond.com/accounts/';
  //const searchR = `${apiElrond}${addressR}`;

  //const query = new URLSearchParams(searchR);
  //const { JSON } = Object.fromEntries(query);

  return (
    <div className='text-white' data-testid='topInfo'>
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
    </div>
  );
};

export default TopInfo;
