import React from 'react';

import './IconButton.css';

export default function IconButton({icon, iconAlt, label, onClick}) {
    return (
        <button className="chat1-button" onClick={onClick}>
            <img 
                src={icon} 
                className="chat1-button__icon" 
                alt={iconAlt}
            />
            <span className="chat1-button__label">{label}</span>
        </button>
    )
}


