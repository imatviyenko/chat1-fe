import React from 'react';

import './HomePage.css';

import TopBar from '../../components/TopBar/TopBar'; // TopBar component
import Contacts from '../../components/Contacts/Contacts'; // Contacts component
import Chats from '../../components/Chats/Chats'; // Chats component
import CurrentChat from '../../components/CurrentChat/CurrentChat'; // CurrentChat component
import References from '../../components/References/References'; // references to open source resources used in this projet

export default function HomePage() {
  return (
    <div className="chat1-homePage">
        <TopBar />

        <div className="chat1-homePage__content">
          
          <div className="chat1-homePage__content_left">
            <div className="chat1-homePage__containerContacts">
              <Contacts />
            </div>
            <div className="chat1-homePage__containerChats">
              <Chats />
            </div>
          </div>

          <div className="chat1-homePage__content_right">
            <div className="chat1-homePage__containerCurrentChat">
              <CurrentChat />
            </div>
          </div>

        </div>
        
        <div>
          <References />
        </div>

    </div>
  );
}
