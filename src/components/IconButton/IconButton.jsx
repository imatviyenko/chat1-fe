import React from 'react';

import './IconButton.css';

export default function IconButton({icon, iconAlt, label, onClick, className}) {
    let _className = "chat1-button";
    if (className) _className += ` ${className}`;
    return (
        <button className={_className} onClick={onClick}>
            <img 
                src={icon} 
                className="chat1-button__icon"
                alt={iconAlt}
            />
            <span className="chat1-button__label">{label}</span>
        </button>
    )
}


