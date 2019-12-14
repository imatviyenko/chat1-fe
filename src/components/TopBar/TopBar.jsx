import React from 'react';
import {Link} from 'react-router-dom';

import './TopBar.css';
import logo from './logo.ico';
import LogOutButton from './LogOutButton';

function TopBar() {
    return (
        <div className="chat1-topBar">

            <div className="chat1-topBar__leftSection">
                <div className="chat1-topBar__leftSectionElement">
                    <img src={logo} className="chat1-topBar__logo" alt="logo" />
                </div>
                <div className="chat1-topBar__leftSectionElement">
                    <h2><Link to="/">Home</Link></h2>
                </div>
            </div>

            <div className="chat1-topBar__middleSection">
                <h1 className="chat1-topBar__pageTitle">Let's chat</h1>
            </div>

            <div className="chat1-topBar__rightSection">
                <div className="chat1-topBar__rightSectionElement">
                    <Link to="/profile">My Profile</Link>
                </div>
                <div className="chat1-topBar__rightSectionElement">
                    <LogOutButton />
                </div>
            </div>
        </div>
    );
}

export default TopBar;
