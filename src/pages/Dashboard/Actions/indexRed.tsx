import * as React from 'react';
import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
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
import { contractAddress1 } from 'config';

const ActionsRed = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;

  const [secondsLeft, setSecondsLeft] = React.useState<number>();
  const [hasPing, setHasPing] = React.useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddress1),
      func: new ContractFunction('getTimeToPong'),
      args: [new AddressValue(new Address(address))]
    });
    const proxy = new ProxyProvider(network.apiAddress);
    proxy
      .queryContract(query)
      .then(({ returnData }) => {
        const [encoded] = returnData;
        switch (encoded) {
          case undefined:
            setHasPing(true);
            break;
          case '':
            setSecondsLeft(0);
            setHasPing(false);
            break;
          default: {
            const decoded = Buffer.from(encoded, 'base64').toString('hex');
            setSecondsLeft(parseInt(decoded, 16));
            setHasPing(false);
            break;
          }
        }
      })
      .catch((err) => {
        console.error('Unable to call VM query', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const { sendTransactions } = transactionServices;

  const sendPingTransaction = async () => {
    const pingTransaction = {
      value: '1000000000000000000',
      data: 'ping',
      receiver: contractAddress1
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  const [success, setSuccess] = React.useState(false);

  function closeVoteStatus() {
    setSuccess(false);
  }
  function voteStatus() {
    setSuccess(true);
  }
  const notAllowedClass = success == false;

  return (
    <div className='d-flex col justify-content-center not-allowed disabled'>
      {hasPing !== undefined && (
        <>
          {hasPing && !hasPendingTransactions ? (
            <div
              className='card row w-100 border-danger shadow mx-auto'
              onClick={sendPingTransaction}
            >
              <button type='button' className='btn btn-danger m-2'>
                Vote
              </button>
              <a href='/' className='text-dark'></a>
            </div>
          ) : (
            <>
              <div className='d-flex col justify-content-center not-allowed disabled'>
                <div className='card row w-100 border-danger shadow mx-auto not-allowed disabled'>
                  <button
                    className={`btn btn-danger m-2  not-allowed disabled ${notAllowedClass}`}
                    onClick={voteStatus}
                  >
                    Voted
                  </button>
                  {success && (
                    <Modal show={true} className='p-5'>
                      <Modal.Header className='badge badge-danger'>
                        <div className='h3 p-2 mx-2 mt-2 mb-0 text-center'>
                          Labour Party Ballot Box
                        </div>
                      </Modal.Header>
                      <Modal.Body className='h2 p-5 m-2 text-center'>
                        Your vote has successfully been recorded.
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className='btn-success p-2 px-3 mx-3 my-2 rounded h4'
                          onClick={closeVoteStatus}
                        >
                          Close
                        </button>
                      </Modal.Footer>
                    </Modal>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ActionsRed;
