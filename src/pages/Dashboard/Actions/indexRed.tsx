import * as React from 'react';
import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  useGetNetworkConfig,
  logout,
  DappUI
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  GasLimit,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contractAddressHex1 } from 'config';
import { routeNames } from 'routes';

const ActionsRed = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;
  const handleLogout = () => {
    logout(`${window.location.origin}${routeNames.votedSuccessful}`);
  };

  const [hasVoted, setVoteStatus] = React.useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddressHex1),
      func: new ContractFunction('didUserPing'), //did user vote smart contract function
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
            setVoteStatus(Boolean(decoded));
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
  }, [hasPendingTransactions]);
  const { sendTransactions } = transactionServices;

  const sendPingTransaction = async () => {
    const pingTransaction = {
      value: '0',
      gasLimit: new GasLimit(4000000),
      data: 'ESDTTransfer@564f5445554b323032342d656363306463@01@766f74656c61626f7572',
      receiver: contractAddressHex1
    };

    await refreshAccount();
    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Vote transaction',
        errorMessage: 'An error has occured during Vote',
        successMessage: 'Vote transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const [isBtnDisabled, setIsBtnDisabled] = React.useState(false);
  async function showStatutVote() {
    if (hasVoted) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }
  function disableModal() {
    setIsBtnDisabled(false);
  }
  showStatutVote();

  return (
    <div className='d-flex col justify-content-center not-allowed disabled'>
      {!hasVoted && (
        <div
          className='card row w-100 border-danger shadow mx-auto'
          onClick={sendPingTransaction}
        >
          <button type='button' className='btn btn-danger m-2'>
            Vote
          </button>
          <a href='/' className='text-dark'></a>
        </div>
      )}
      {hasVoted && (
        <div className='d-flex col justify-content-center not-allowed disabled'>
          <div className='card row w-100 border-danger shadow mx-auto not-allowed disabled'>
            <button className='btn btn-danger m-2  not-allowed disabled'>
              Voted
            </button>
            {isBtnDisabled && (
              <Modal show={true} className='p-5'>
                <Modal.Header className='badge badge-danger'>
                  <div className='h3 p-2 mx-2 mt-2 mb-0 text-center'>
                    Labour Party Ballot Box
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
                <Modal.Footer onClick={disableModal}>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionsRed;
