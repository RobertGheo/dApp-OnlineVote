import * as React from 'react';
import {
  useGetAccountInfo,
  DappUI,
  useGetNetworkConfig,
  transactionServices,
  refreshAccount
} from '@elrondnetwork/dapp-core';
import { GasLimit } from '@elrondnetwork/erdjs';
import { Form, Modal } from 'react-bootstrap';
import { contractClaim } from 'config';
import { ReactComponent as CopyAddress } from '../../assets/img/copyB.svg';

const RegisterInfo1 = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const isRegistered = Boolean(address);
  const /*transactionSessionId*/ [, setTransactionSessionId] = React.useState<
      string | null
    >(null);
  const { sendTransactions } = transactionServices;

  const claimVotedToken = async () => {
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
        processingMessage: 'Processing Claim Vote transaction',
        errorMessage: 'An error has occured during Claim',
        successMessage: 'Claim Vote transaction successful'
      },
      redirectAfterSign: false
    });
    if (sessionId != null) {
      setTransactionSessionId(sessionId);
    }
    twoInOneCall();
  };

  //-- Registered button functionality part
  const [idNational, setIdNational] = React.useState(null ? '' : String); //set Id input state
  const [isBtnDisabled, setIsBtnDisabled] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [isTimePass, setIsTimePass] = React.useState(true);

  React.useEffect(() => {
    if (idNational.length < 9) {
      setIsBtnDisabled(true);
    } else {
      setIsBtnDisabled(false);
    }
  }, [idNational]);

  function handleIDChange(e: React.ChangeEvent<any>) {
    setIdNational(e.target.value);
  }

  function twoInOneCall() {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    setIdNational(() => '');
    setSuccess(false);
  }
  function popUpMessage() {
    setSuccess(true);
    fetch('https://api.r3d4.fr/faucet/list', {
      method: 'POST',
      headers: {
        Accept: 'appliaction/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        formdata: {
          network: 'D',
          token: '2',
          address: address,
          amount: '0.0005'
        }
      })
    });
    reset();
  }
  //set the CountDown Timer
  const [time, setTime] = React.useState(59);
  const tick = () => {
    if (time === 0) {
      setIsTimePass(false);
      //reset();
    } else {
      setTime(time - 1);
      setIsTimePass(true);
    }
  };
  const reset = () => setTime(59);
  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  //

  function copyToClipboard() {
    const elem = document.createElement('textarea');
    elem.value = address;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

  return (
    <div className='container-fluid p-1'>
      {isRegistered && (
        <>
          <div className='card-header bg-light m-3 p-lg-2 border-0'>
            <div className='text-dark bg-light p-4 m-lg-2 my-3 border rounded border-info border-1'>
              <div className='mb-3'>
                <h1 className='text-center font-weight-bold'>
                  Register to Vote
                </h1>
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
                        onClick={popUpMessage}
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
                            Your ID will be verified and registered in few
                            moments:&nbsp;{idNational}
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              disabled={isTimePass}
                              className='btn btn-success p-2 px-3 mx-3 my-2 rounded'
                              onClick={claimVotedToken}
                            >
                              <h3 className='my-1 mx-1'>
                                {time}&nbsp; To continue
                              </h3>
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
              <div className='p-2 m-1 p-lg-3 mt-lg-5 bg-light border rounded border-info border-1'>
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
          <div className='card-body bg-light m-3 p-lg-2 border-0'>
            <div className='text-light bg-info p-3 m-lg-2 my-3 border rounded border-info border-1'>
              <div className='mx-lg-5 pt-lg-4'>
                <p className='h5'>
                  For claiming your right to vote, you need to have a small
                  amount of xEgld to cover the transaction fee when interacting
                  with the smart contracts ballot box.
                </p>
                <div className='card mt-4 px-md-0 px-lg-4 bg-info border-0'>
                  <div className='row'>
                    <div className='col-md-5 col-lg-3'>
                      <div className='card bg-info border-dark border-0 '>
                        <p className='h6 m-2 text-center'>Copy your address:</p>
                      </div>
                    </div>
                    <div className='col-md-10 col-lg-7'>
                      <div className='card bg-info mt-md-0 border-dark border-0'>
                        <div className='h6 text-center m-2 m-lg-2 m-md-2'>
                          <DappUI.Trim
                            data-testid='accountAddress'
                            id='copyAddress'
                            text={account.address}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className='btn col-sm-12 col-md-1 col-lg-1'
                      onClick={copyToClipboard}
                    >
                      <CopyAddress />
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-lg-4 mt-2 my-lg-2 mx-lg-5 bg-info'>
                <div className='card p-2 bg-info border-0'>
                  <p className='h3 text-warning text-center'>
                    On the Faucet, select Devnet and claim 0.001 xEgld.
                  </p>
                </div>
                <div className='row'>
                  <div className='col-md-8 col-lg-9'>
                    <div className='card bg-info border-dark border-1'>
                      <p className='h4 m-2'>
                        Access this Faucet to recieve xEgld to cover your vote
                        process
                      </p>
                    </div>
                  </div>
                  <div className='col-md-4 col-lg-3'>
                    <div className='card bg-warning mt-4 mt-md-0 border-dark border-1'>
                      <div className='text-center m-2 m-lg-2 m-md-4'>
                        <a
                          href='https://r3d4.fr/faucet'
                          className='h4 stretched-link text-dark text-decoration-none'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Claim xEgld
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterInfo1;
