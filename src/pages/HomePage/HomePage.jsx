import React from 'react';

import './HomePage.css';

import TopBar from '../../components/TopBar/TopBar'; // TopBar component
import Footer from '../../components/Footer/Footer'; // Footer component
import Contacts from '../../components/Contacts/Contacts'; // Contacts component
import Chats from '../../components/Chats/Chats'; // Chats component
import CurrentChat from '../../components/CurrentChat/CurrentChat'; // CurrentChat component


export default function HomePage() {
  return (
    <div className="chat1-homePage">

      <div className="chat1-homePage__headerRow">
        <TopBar />
      </div>

      <div className="chat1-homePage__contentRow">
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
      </div>

      <div className="chat1-homePage__footerRow">
        <Footer />
      </div>
      
    </div>
  );
}
