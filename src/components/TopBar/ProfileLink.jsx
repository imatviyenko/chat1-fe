import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import AppContext from '../../context/AppContext';

export default function ProfileLink() {
    const profile = useContext(AppContext).profile;
    console.log(`ProfileLink -> profile: ${JSON.stringify(profile)}`);

    return (
    <Link to="/profile">{profile.displayName || profile.email}</Link>
    )
}