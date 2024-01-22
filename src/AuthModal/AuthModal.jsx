import { useState } from 'react';
import './AuthModal.css'

const AuthModal = ({ setShowModal, setUserValified }) => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const loginAttempt = () => {

        if (password === import.meta.env.VITE_APP_PW) {
            setUserValified(true);
            setShowModal(false);
        }
        else {
            setErrorMessage('*Incorrect password was input.');
        }
    }


    const loginDiscard = () => {
        setShowModal(false);
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>PASSWORD</h2>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type='password' required
                />
                <div className='errorMessage'>{errorMessage}</div>
                <button type="submit" onClick={loginAttempt}>Enable Editing</button>
                <button type="button" onClick={loginDiscard}>Discard</button>
            </div>
        </div>
    )
}

export default AuthModal;