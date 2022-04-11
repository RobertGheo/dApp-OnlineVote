import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <div className='card-body flex-column p-4'>
            <div className='card-deck py-2 px-2'>
              <div className='card rounded border-1 mx-3  mb-2 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
              <div className='card rounded border-1 mx-3 mb-2 bg-secondary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                </div>
              </div>
            </div>
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
