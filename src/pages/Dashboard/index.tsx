import * as React from 'react';
//import Actions from './Actions';
import StatutsVote from './CheckVote';
import RegisterInfo from './Register';
//import TopInfo from './TopInfo';
//import Transactions from './Transactions';

const Dashboard = () => {
  return (
    <div className='container pt-5 mt-5'>
      <div className='col-10 col-md-10 col-lg-12 mx-auto'>
        <div className='card d-flex justify-content-center shadow bg-light rounded border-1'>
          <div className='card-header bg-light'>
            <div className='text-light'>
              <RegisterInfo />
            </div>
          </div>
          <div className='card-body d-felx flex-column p-4'>
            <StatutsVote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
