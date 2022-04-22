import React from 'react';
import { ReactComponent as Github } from '../../../assets/img/github_logo.svg';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';
import { ReactComponent as Twitter } from '../../../assets/img/twitter.svg';

const Footer = () => {
  return (
    <footer className='text-center mt-3 mb-2'>
      <div className='h6 '>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://elrond.com/'
        >
          &#169; 2022 Built with <HeartIcon className='mx-2' /> on the Elrond
          Network.
        </a>
        <h6 className='mt-2'>
          R.B{' '}
          <a
            href='https://github.com/RobertGheo/dApp-OnlineVote'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Github className='mx-2' />
          </a>
          <a
            href='https://twitter.com/robertbradu'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Twitter className='mx-2' />
          </a>
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
