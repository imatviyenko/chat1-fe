import React, {useRef, useState, useEffect} from 'react';
import './RegistrationForm.css';

import constants from '../../constants';

const RegistrationForm = ({onHandleRegister, userEmailFromCode}) => {
    console.log('RegistrationForm -> userEmailFromCode:', userEmailFromCode);
    const [userEmail, setUserEmail] = useState(userEmailFromCode);
    console.log('RegistrationForm -> userEmail:', userEmail);

    // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
    useEffect( ()=> {
        setUserEmail(userEmailFromCode);
    }, [userEmailFromCode]);
    
    const inputRefUserDisplayName = useRef(null);
    const inputRefPassword1 = useRef(null);
    const inputRefPassword2 = useRef(null);

    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const onClickHandler = ()=> {
        const userDisplayName = inputRefUserDisplayName && inputRefUserDisplayName.current && inputRefUserDisplayName.current.checkValidity() && inputRefUserDisplayName.current.value;
        const password1 = inputRefPassword1 && inputRefPassword1.current && inputRefPassword1.current.checkValidity() && inputRefPassword1.current.value;
        const password2 = inputRefPassword2 && inputRefPassword2.current && inputRefPassword2.current.checkValidity() && inputRefPassword2.current.value;

        if (userEmail && userDisplayName && password1 && password2) {
            if (password1 !== password2) {
                setPasswordMismatch(true);
                return;
            }

            console.log('RegistrationForm -> onClickHandler -> filled in values pass validation');
            onHandleRegister(userDisplayName, userEmail, password1);
        }
    };

    let passwordInputsClassName = 'chat1-registrationForm__fieldInput';
    if (passwordMismatch) {
        passwordInputsClassName += ' chat1-registrationForm__fieldInput_invalid';
    }

    return (
        <div className="chat1-registrationForm">
            <div className="chat1-registrationForm__row">
                <span className="chat1-registrationForm__fieldLabel">Display name:</span>
                <input type="text" minLength={constants.MIN_USER_DISPLAY_NAME_LENGTH} ref={inputRefUserDisplayName} className="chat1-registrationForm__fieldInput"></input>
            </div>
            <div className="chat1-registrationForm__row">
                <span className="chat1-registrationForm__fieldLabel">User email:</span>
                <input 
                    type="email" 
                    className="chat1-registrationForm__fieldInput"
                    value={userEmail}
                    readOnly={!!userEmailFromCode}
                    disabled={!!userEmailFromCode}
                    onChange={ e => setUserEmail(e.target.value) }
                >
                </input>
            </div>
            <div className="chat1-registrationForm__row">
                <span className="chat1-registrationForm__fieldLabel">Password:</span>
                <input type="password" minLength={constants.MIN_PASSWORD_LENGTH} ref={inputRefPassword1} className={passwordInputsClassName}></input>
            </div>
            <div className="chat1-registrationForm__row">
                <span className="chat1-registrationForm__fieldLabel">Confirm password:</span>
                <input type="password" minLength={constants.MIN_PASSWORD_LENGTH} ref={inputRefPassword2} className={passwordInputsClassName}></input>
            </div>            
            <div className="chat1-registrationForm__row chat1-registrationForm__row_buttons">
                <button onClick={onClickHandler} className="chat1-registrationForm__submitButton">Submit</button>
            </div>
        </div>
    )
};

export default RegistrationForm;