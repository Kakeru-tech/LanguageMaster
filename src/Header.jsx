import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import AuthModal from './AuthModal/AuthModal';

const Header = ({ OpenSidebar, userValified, setUserValified }) => {

  const [showModal, setShowModal] = useState(false);

  const loginClicked = () => {
    if (!userValified) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>

      <div className='header-right'>
        {userValified
          ? <div className='icon_valified'>Kakeru</div>
          : <BsPersonCircle
            className='icon'
            onClick={loginClicked}
          />
        }

      </div>

      {showModal && <AuthModal
        setUserValified={setUserValified}
        setShowModal={setShowModal}
      />}


    </header>
  )
}

export default Header;