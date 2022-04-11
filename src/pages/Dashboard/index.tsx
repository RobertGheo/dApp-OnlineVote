import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  return (
    <div className='container'>
      <div className='row px-2'>
        <div className='col-10 col-md-10 col-lg-12 mx-auto'>
          <div className='card shadow-sm rounded border-1'>
            <div className='card-body flex-column p-4'>
              <div className='card-deck py-4 px-4'>
                <div className='card rounded border-1 mr-5  mb-2 bg-primary'>
                  <div className='card-body text-center p-4'>
                    <TopInfo />
                    <Actions />
                  </div>
                </div>
                <div className='card rounded border-0 mb-2 bg-secondary'>
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
    </div>
  );
};

export default Dashboard;
