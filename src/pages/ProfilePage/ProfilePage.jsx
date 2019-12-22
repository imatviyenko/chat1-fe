import React, { useContext } from 'react';

import './ProfilePage.css';

import TopBar from '../../components/TopBar/TopBar'; // TopBar component
import AppContext from '../../context/AppContext';

export default function ProfilePage() {
  const profile = useContext(AppContext).profile;
  console.log(`ProfilePage -> profile: ${JSON.stringify(profile)}`);

  return (
      <div className="chat1-profilePage">
        <TopBar />
        <header>
            <h1>My profile</h1>
        </header>

        <div className="chat1-profilePage__row">
          <span className="chat1-profilePage__fieldLabel">Display name:</span>
          <span className="chat1-profilePage__fieldStaticText">{profile.displayName}</span>
        </div>

        <div className="chat1-profilePage__row">
          <span className="chat1-profilePage__fieldLabel">Email:</span>
          <span className="chat1-profilePage__fieldStaticText">{profile.email}</span>
        </div>

      </div>
    );
}
