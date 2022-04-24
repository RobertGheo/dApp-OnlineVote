import * as React from 'react';
import {
  DappUI,
  logout,
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
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contractAddressHex, contractAddressHex1, contractClaim } from 'config';
import ClaimedToken from 'pages/ClaimedToken';
import { routeNames } from 'routes';
import RegisterInfo from '../RegisterID';
import StatutsVote from './CheckVote';

const Dashboard = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [voteClaim, setVoteClaimed] = React.useState<boolean>();
  const [hasVotedTory, setVotedTory] = React.useState<boolean>();
  const [hasVotedLabour, setVotedLabour] = React.useState<boolean>();
  const handleLogout = () => {
    logout(`${window.location.origin}${routeNames.votedSuccessful}`);
  };
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
  const verifyClaimVote = async () => {
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
  };

  const ballotboxTory = async () => {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const query = new Query({
      address: new Address(contractAddressHex),
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
            setVotedTory(Boolean(decoded));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  };

  const ballotboxLabour = async () => {
    const query = new Query({
      address: new Address(contractAddressHex1),
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
            setVotedLabour(Boolean(decoded));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  };

  ballotboxTory();
  ballotboxLabour();
  verifyClaimVote();

  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <>
            {!voteClaim && !hasVotedTory && !hasVotedLabour && (
              <div className='card-header bg-light'>
                <div className='text-light'>
                  <RegisterInfo />
                </div>
              </div>
            )}
            {voteClaim && !hasVotedTory && !hasVotedLabour && (
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
            {hasVotedTory && voteClaim && (
              <>
                <Modal show={true} className='p-5'>
                  <Modal.Header className='badge badge-primary badge-auto '>
                    <div className='card bg-primary p-2 mx-2 mt-2 mb-0 border-0'>
                      <h3 className='h3 text-center'>
                        Conservative Party Votes Ballot Box.
                      </h3>
                    </div>
                  </Modal.Header>
                  <Modal.Body className='h2 p-5 my-2 text-center'>
                    Your vote has successfully been recorded.
                    <div className='card pt-5 mt-4 border-0'>
                      <div className='card p-3 text-left shadow border-primary'>
                        <span className='h4'>Your address:</span>
                        <span data-testid='accountAddress'>
                          <a
                            className='text-primary h6'
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
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Link
                      to={routeNames.votedSuccessful}
                      className='btn-success p-2 px-3 mx-3 my-2 rounded h2'
                      onClick={handleLogout}
                    >
                      Close
                    </Link>
                  </Modal.Footer>
                </Modal>
              </>
            )}
            {hasVotedLabour && voteClaim && (
              <Modal show={true} className='p-5'>
                <Modal.Header className='badge badge-danger'>
                  <div className='card bg-danger p-2 mx-2 mt-2 mb-0 border-0'>
                    <h3 className='h3 text-center'>Labour Party Ballot Box</h3>
                  </div>
                </Modal.Header>
                <Modal.Body className='h2 p-5 m-2 text-center'>
                  Your vote has successfully been recorded.
                  <div className='card pt-5 mt-4 border-0'>
                    <div className='card p-3 text-left shadow border-danger'>
                      <span className='h4'>Your address:</span>
                      <span data-testid='accountAddress'>
                        <a
                          className='text-danger h6'
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
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Link
                    to={routeNames.votedSuccessful}
                    className='btn-success p-2 px-3 mx-3 my-2 rounded h2'
                    onClick={handleLogout}
                  >
                    Close
                  </Link>
                </Modal.Footer>
              </Modal>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
