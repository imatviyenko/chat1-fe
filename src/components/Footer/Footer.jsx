import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css';
import References from '../../components/References/References'; // references to open source resources used in this projet

function TopBar() {
    return (
        <div className="chat1-footer">
            <References />
        </div>
    );
}

export default TopBar;
