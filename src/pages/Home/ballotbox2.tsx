import React from 'react';
import { useGetNetworkConfig } from '@elrondnetwork/dapp-core';
import {
  Address,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import { contractAddressHex1 } from 'config';

const BallotBox2 = () => {
  const { network } = useGetNetworkConfig();
  const [voteCounting, setVoteCounted] = React.useState<number>();

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddressHex1),
      func: new ContractFunction('getCurrentFunds')
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setVoteCounted(parseInt(decoded, 16));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  });

  return (
    <>
      <div className='text-black'>{voteCounting}</div>
      {}
    </>
  );
};
export default BallotBox2;
