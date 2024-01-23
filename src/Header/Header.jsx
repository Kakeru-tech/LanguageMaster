import React, { useState } from 'react';
import { BsPersonCircle, BsJustify } from 'react-icons/bs';
import AuthModal from '../AuthModal/AuthModal';
import './Header.css'

const Header = ({ OpenSidebar, openSidebarToggle, userValified, setUserValified }) => {

  const [showModal, setShowModal] = useState(false);

  const loginClicked = () => {
    if (!userValified) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  return (
    <header className={!openSidebarToggle?'header':'header-hide'}>
      {!openSidebarToggle
        ? <></>
        : <div className='menu-icon'>
          <BsJustify className='icon' onClick={OpenSidebar} />
        </div>}



      <div className='header-right'>
        {userValified
          ? <div className='icon_valified'>Kakeru</div>
          : <div className='notLoginContainer'>
            <BsPersonCircle
              className='icon'
              onClick={loginClicked}
            />
            <div className='notLoginStr'>Read only mode</div>
          </div>
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