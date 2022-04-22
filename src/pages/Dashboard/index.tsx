import * as React from 'react';
import {
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import { contractClaim } from 'config';
import ClaimedToken from 'pages/ClaimedToken';
import RegisterInfo from '../RegisterID';
import StatutsVote from './CheckVote';

const Dashboard = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [voteClaim, setVoteClaimed] = React.useState<boolean>();
  /*
  const TokenIdentifier = 'VOTEUK2024-ecc0dc';
  const ApiUrl = 'https://devnet-api.elrond.com';
  const [stateTokenVote, setStateTokenVote] = React.useState(Boolean);  
  
  type ApiTokenAccount = {
    address: string;
    balance: string;
  };
  //API request//
  const searchToken = async () => {
    const candidateVote = await getCandidateVote();
    if (!candidateVote) {
      setStateTokenVote(false); //address does not have token vote
    } else {
      setStateTokenVote(true);
    }
  };

  const getCandidateVote = async () => {
    const res = await fetch(
      `${ApiUrl}/accounts/${address}/tokens/${TokenIdentifier}`
    );
    if (!res.ok) return null;
    const body = (await res.json()) as ApiTokenAccount[];
    return body || [];
  };
  searchToken();
  */

  //view smart contract function
  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractClaim),
      func: new ContractFunction('didUserPing'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setVoteClaimed(Boolean(decoded));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  });

  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <>
            {!voteClaim && (
              <div className='card-header bg-light'>
                <div className='text-light'>
                  <RegisterInfo />
                </div>
              </div>
            )}
            {voteClaim && (
              <>
                <div className='card-header bg-light'>
                  <div className='text-light'>
                    <ClaimedToken />
                  </div>
                </div>
                <div className='card-body d-felx flex-column p-4'>
                  <StatutsVote />
                  <div className='pt-1'></div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
