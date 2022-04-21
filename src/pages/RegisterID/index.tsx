import * as React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  useGetNetworkConfig,
  transactionServices,
  refreshAccount
} from '@elrondnetwork/dapp-core';
import { GasLimit } from '@elrondnetwork/erdjs/out';
import { faClipboard, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Modal } from 'react-bootstrap';
import { contractAddress, contractClaim } from 'config';
//import { SmartContractResults, SmartContractAbi, TokenIdentifierValue, AddressValue } from '@elrondnetwork/erdjs/out';

const RegisterInfo = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const isRegistered = Boolean(address);

  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);
  const { sendTransactions } = transactionServices;
  const claimVotetToken = async () => {
    const claimTransaction = {
      value: '0',
      gasLimit: new GasLimit(4000000),
      data: 'claim',
      receiver: contractClaim
    };
    await refreshAccount();
    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: claimTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful'
      },
      redirectAfterSign: false
    });
    sendTok();
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
  };

  //-- Registered button functionality part
  const [idNational, setIdNational] = React.useState(null ? '' : String); //set Id input state
  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);
  const [stateIdRegister, setStateIdRegister] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (idNational.length < 9) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [idNational]);

  async function twoInOne() {
    await new Promise((resolve) => setTimeout(resolve, 20000));
    setIdNational(() => '');
    setSuccess(false);
    setStateIdRegister('2');
  }
  async function sendTok() {
    await new Promise((resolve) => setTimeout(resolve, 20000));
    setSuccess(true);
    setStateIdRegister('1');
  }

  function handleIDChange(e: React.ChangeEvent<any>) {
    setIdNational(e.target.value);
  }

  return (
    <div className='container-fluid p-1'>
      {isRegistered && !stateIdRegister && (
        <div className='card bg-light m-3 p-lg-2 border-0'>
          <div className='text-dark bg-light p-4 m-lg-2 my-3 border rounded border-info border-1'>
            <div className='mb-3'>
              <h1 className='text-center'>Register to Vote</h1>
            </div>
            <div className='my-4'>
              <form className='form-inline justify-content-center'>
                <div className='form-group mb-2'>
                  <Form.Group onChange={handleIDChange}>
                    <input
                      type='text'
                      autoComplete='off'
                      maxLength={9}
                      minLength={9}
                      className='form-control'
                      placeholder='National ID'
                      id='inputID'
                      value={idNational}
                    ></input>
                    <button
                      disabled={isBtnDisabled}
                      type='button'
                      className='btn btn-success'
                      onClick={claimVotetToken}
                    >
                      Register
                    </button>
                    {success && (
                      <Modal show={true} className='p-5'>
                        <Modal.Header className='badge badge-warning'>
                          <div className='h3 p-2 mx-2 mt-2 mb-0 text-center'>
                            User Authentication
                          </div>
                        </Modal.Header>
                        <Modal.Body className='h2 p-5 m-2 text-center'>
                          Your ID will be verifyed and registered in few
                          moments:&nbsp;{idNational}
                        </Modal.Body>
                        <Modal.Footer>
                          <div
                            className='spinner-grow text-success y-25 w-25'
                            role='status'
                          >
                            <span className='sr-only'>Loading...</span>
                          </div>
                          <button
                            className='btn-success p-2 px-3 mx-3 my-2 rounded h4'
                            onClick={twoInOne}
                          >
                            Close
                          </button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </Form.Group>
                </div>
              </form>
              <span className='text-center d-flex justify-content-center '>
                ID example format: AA000000A
              </span>
            </div>
            <div className='p-2 m-1 p-lg-3  mt-lg-5 bg-light border rounded border-info border-1'>
              <span className='h5'>Your address:&nbsp;</span>
              <span data-testid='accountAddress'>
                <a
                  className='text-dark'
                  href={`${network.explorerAddress}/address/${address}`}
                  {...{
                    target: '_blank'
                  }}
                  rel='noopener noreferrer'
                  title='View in Explorer'
                >
                  <DappUI.Trim
                    data-testid='accountAddress'
                    text={account.address}
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
      {stateIdRegister == '2' && (
        <div className='text-dark bg-warning p-4 m-2 my-3 rounded border-1'>
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
      )}
    </div>
  );
};

export default RegisterInfo;
