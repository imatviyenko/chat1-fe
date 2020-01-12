import React, { useContext, useState, useRef, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import icons from '../../icons';
import './ProfilePage.css';

import constants from '../../constants';
import TopBar from '../../components/TopBar/TopBar'; // TopBar component
import AppContext from '../../context/AppContext';
import {ACTION_APP_ERROR} from '../../state/appReducer';
import AppReducerDispatchContext from '../../context/AppReducerDispatchContext';
import ServicesContext from '../../context/ServicesContext';
import {ACTION_PROFILE_FETCH} from '../../state/profileReducer';

export default function ProfilePage() {
  let history = useHistory();
  const dispatch = useContext(AppReducerDispatchContext);
  const services = useContext(ServicesContext);
  const profile = useContext(AppContext).profile;
  console.log(`ProfilePage -> profile: ${JSON.stringify(profile)}`);

  //const [currentProfile, setCurrentProfile] = useState(profileFromContext);
  const [profileUpdate, setProfileUpdate] = useState(null);
  const [editDisplayNameMode, setEditDisplayNameMode] = useState(false);
  const inputRefDisplayName = useRef(null);
  console.log(`ProfilePage -> editDisplayNameMode: ${editDisplayNameMode}`);

  // effect to call api to update chat in the database
  const effectFunc = () => { 
    const asynFunc = async () => {
        console.log(`ProfilePage.effect ->  profileUpdate: ${JSON.stringify(profileUpdate)}`);
        if (!profileUpdate) return;
        
        try {
            const result = await services.updateProfile(profileUpdate);
            if (result.status === constants.ERROR_SUCCESS) {
              dispatch({type: ACTION_PROFILE_FETCH, profile: result.profile});
            } else {
              dispatch({type: ACTION_APP_ERROR, message: 'Error updating chat', result}); // notify the app reducer that there has been an application error
              history.replace({ pathname: '/error'});
              return;
            }
        } catch (e) {
            console.error('CurrentChat -> error in effectFunc:');
            console.error(e);
        };
    };
    asynFunc();
  };
  useEffect(effectFunc, [profileUpdate]); // fire effect when profileUpdate object changes, ignore null value


  const updateDisplayName = () => {
    console.log(`ProfilePage.updateDisplayName invoked`);
    const updatedDisplayName = inputRefDisplayName && inputRefDisplayName.current && inputRefDisplayName.current.checkValidity() && inputRefDisplayName.current.value;

    console.log(`ProfilePage.updateDisplayName -> updatedDisplayName: ${updatedDisplayName}`);
    if (updatedDisplayName) {
      const _profile = {
          ...profile,
          displayName: updatedDisplayName
      };
      setProfileUpdate(_profile);
    }
  };  

  const displayNameElement = editDisplayNameMode ?
  (
      <>
          <input 
              type="text" 
              className="chat1-profilePage__fieldInput"
              onBlur={ () => setEditDisplayNameMode(false)}
              autoFocus
              ref={inputRefDisplayName}
              defaultValue={profile && profile.displayName}
          />
          <img 
              src={icons.updateIcon} 
              className="chat1-profilePage__icon_small" 
              alt="Update" 
              onMouseDown={ ()=> updateDisplayName()}
          />
      </>
  )
  :
  (
      <>
          <span className="chat1-profilePage__fieldStaticText" >{profile.displayName}</span> 
          {
            <img 
                src={icons.editIcon} 
                className="chat1-profilePage__icon_small" 
                alt="Edit" 
                onClick={ () => setEditDisplayNameMode(true)}
            />
          }
      </>
  );


  return (
      <div className="chat1-profilePage">
        <TopBar />
        <header>
            <h1>My profile</h1>
        </header>

        
        <div className="chat1-profilePage__row">
          <span className="chat1-profilePage__fieldLabel">Display name:</span>
          {displayNameElement}
        </div>

        <div className="chat1-profilePage__row">
          <span className="chat1-profilePage__fieldLabel">Email:</span>
          <span className="chat1-profilePage__fieldStaticText">{profile.email}</span>
        </div>

      </div>
    );
}
