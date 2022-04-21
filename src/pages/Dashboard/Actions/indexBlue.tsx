import * as React from 'react';
import {
  transactionServices,
  useGetAccountInfo,
  useGetPendingTransactions,
  refreshAccount,
  useGetNetworkConfig,
  logout
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  ContractFunction,
  GasLimit,
  ProxyProvider,
  Query
} from '@elrondnetwork/erdjs';
//import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contractAddressHex, contractAddressHex1, contractClaim } from 'config';
import { routeNames } from 'routes';

const ActionsBlue = () => {
  const account = useGetAccountInfo();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const { network } = useGetNetworkConfig();
  const { address } = account;
  const handleLogout = () => {
    logout(`${window.location.origin}${routeNames.votedSuccessful}`);
  };

  const [secondsLeft, setSecondsLeft] = React.useState<number>();
  const [hasPing, setHasPing] = React.useState<boolean>();
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);

  const mount = () => {
    if (secondsLeft) {
      const interval = setInterval(() => {
        setSecondsLeft((existing) => {
          if (existing) {
            return existing - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  //React.useEffect(mount, [hasPing]);

  React.useEffect(() => {
    const query = new Query({
      address: new Address(contractAddressHex),
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
      value: '0',
      gasLimit: new GasLimit(4000000),
      data: 'ESDTTransfer@564f5445554b323032342d353534646362@01@70696e67',
      receiver: contractAddressHex
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

  const pongAllowed = secondsLeft === 0 && !hasPendingTransactions;
  const notAllowedClass = pongAllowed ? '' : 'not-allowed disabled';

  const timeRemaining = moment()
    .startOf('day')
    .seconds(secondsLeft || 0)
    .format('mm:ss');

  const [success, setSuccess] = React.useState(false);

  function closeVoteStatus() {
    setSuccess(false);
  }

  function voteStatus() {
    setSuccess(true);
  }

  return (
    <div className='d-flex col justify-content-center'>
      {hasPing !== undefined && (
        <>
          {hasPing && !hasPendingTransactions ? (
            <div
              className='card row w-100 border-primary shadow mx-auto'
              onClick={sendPingTransaction}
            >
              <button type='button' className='btn btn-primary m-2'>
                Vote
              </button>
              <a href='/' className='text-dark'></a>
            </div>
          ) : (
            <>
              <div className='d-flex col justify-content-center not-allowed disabled'>
                <div className='card row w-100 border-primary shadow mx-auto not-allowed disabled'>
                  <button className='btn btn-primary not-allowed m-2 disabled'>
                    Voted
                  </button>
                  {!hasPing && (
                    <Modal show={true} className='p-5'>
                      <Modal.Header className='badge badge-primary'>
                        <div className='h3 p-2 mx-2 mt-2 mb-0 text-center'>
                          Conservative Party Votes Ballot Box.
                        </div>
                      </Modal.Header>
                      <Modal.Body className='h2 p-5 m-2 text-center'>
                        Your vote has successfully been recorded.
                      </Modal.Body>
                      <Modal.Footer>
                        <Link
                          to={routeNames.votedSuccessful}
                          className='btn-success p-2 px-3 mx-3 my-2 rounded h3'
                          onClick={handleLogout}
                        >
                          Close
                        </Link>
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

export default ActionsBlue;
