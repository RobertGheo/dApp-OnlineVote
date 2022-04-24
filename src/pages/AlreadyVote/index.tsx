import * as React from 'react';
import {
  DappUI,
  useGetAccountInfo,
  useGetNetworkConfig
} from '@elrondnetwork/dapp-core';
import { Modal } from 'react-bootstrap';

const VoteDone = () => {
  const { address } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const [success, setSuccess] = React.useState(false);

  function closePopMessage() {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    setSuccess(false);
  }
  function popUpMessage() {
    setSuccess(true);
  }

  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <div className='card-header bg-light'>
            <div className='container-fluid p-1'>
              <div className='card bg-light p-lg-5 border-0'>
                <div className='text-white bg-success p-lg-4 m-2 my-3 rounded border-1'>
                  <h1 className='text-center p-2 py-4 p-lg-4'>
                    You Voted for U.K. General Election 2024
                  </h1>
                  <h1 className='text-center p-3 p-lg-4 '>
                    Thank you for voting.
                  </h1>
                  <div className='mx-4 my-2 pt-4 opacity-6'>
                    <span className='h4'>Your address and ID:&nbsp;</span>
                    <span data-testid='accountAddress'>
                      <a
                        className='text-white h5'
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
                  <div className='mx-4 opacity-6'>
                    <span className='h6'>Your National ID:&nbsp;</span>
                    <span className='h6 font-weight-bold' data-testid=''>
                      AA000000A
                    </span>
                  </div>
                  <div className=''>
                    <h3 className='text-center mx-3 m-lg-2 py-3 px-lg-4'>
                      Thankfulness for maintaining that very spirit of
                      democracy, by actually casting your very vote; which
                      actually holds so very much importance.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body d-felx flex-column m-2 p-4'>
            <div className='card bg-light p-lg-5 border-0'>
              <div className='card bg-secondary p-2 p-lg-5 shadow'>
                <div className='card bg-warning p-2 m-2 col-8 col-sm-10 col-md-6 col-lg-4'>
                  <h2 className='m-1 my-2 font-weight-bold text-center'>
                    Complaints
                  </h2>
                </div>
                <div className='pt-4 p-2 mt-4'>
                  <h3 className='text-left text-white mx-auro mr-lg-5 mb-0'>
                    If you wish to make a complaint about the elections or
                    provide a feedback please access&nbsp;{''}&nbsp;
                    <a
                      onClick={popUpMessage}
                      className='btn text-monospace font-weight-bold badge badge-warning '
                    >
                      this form.
                    </a>
                    {success && (
                      <Modal show={true} className='p-5'>
                        <Modal.Header className='badge badge-secondary'>
                          <div className='h3 p-2 mx-2 mt-2 mb-0 text-center'>
                            Further development
                          </div>
                        </Modal.Header>
                        <Modal.Body className='h2 p-5 m-2 text-center'>
                          TSI Online Voting System will be updated and improved
                          in the following months.&nbsp; Thank you for your
                          time.
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className='btn-success p-2 px-3 mx-3 my-2 rounded h3'
                            onClick={closePopMessage}
                          >
                            Close
                          </button>
                        </Modal.Footer>
                      </Modal>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDone;
