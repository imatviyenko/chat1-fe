import React from 'react';

import './HomePage.css';

import References from '../../components/References/References';
import Collection1 from '../../components/Collection1/Collection1'; // sample component fetching sample data from MongoDB

export default function() {
  return (
    <div className="chat1-homepage">
        <header>
            <h1>Home</h1>
        </header>
        <p>
          <h2>Welcome to chats! </h2>
        </p>
        <Collection1 />
        <References />
    </div>
  );
}
