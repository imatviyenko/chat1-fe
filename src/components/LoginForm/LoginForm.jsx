import React, {useRef} from 'react';
import './LoginForm.css';

import constants from '../../constants';

const LoginForm = ({onHandleLogin}) => {
    const inputRefUserEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const onClickHandler = ()=> {
        const userEmail = inputRefUserEmail && inputRefUserEmail.current && inputRefUserEmail.current.checkValidity() && inputRefUserEmail.current.value ;
        const password = inputRefPassword && inputRefPassword.current && inputRefPassword.current.checkValidity() && inputRefPassword.current.value;

        if (userEmail && password) {
            console.log('LoginForm -> onClickHandler -> filled in values pass validation');
            onHandleLogin(userEmail, password);
        }
    };

    return (
        <div className="chat1-loginform">
            <div className="chat1-loginform__row">
                <span className="chat1-loginform__fieldLabel">User email:</span>
                <input className="input" type="email" ref={inputRefUserEmail} className="chat1-loginform__fieldInput"></input>
            </div>
            <div className="chat1-loginform__row">
                <span className="chat1-loginform__fieldLabel">Password:</span>
                <input type="password" minLength={constants.MIN_PASSWORD_LENGTH} ref={inputRefPassword} className="chat1-loginform__fieldInput"></input>
            </div>
            <div className="chat1-loginform__row chat1-loginform__row_buttons">
                <button onClick={onClickHandler} className="chat1-loginform__loginButton">Login</button>
            </div>
        </div>
    )
};

export default LoginForm;