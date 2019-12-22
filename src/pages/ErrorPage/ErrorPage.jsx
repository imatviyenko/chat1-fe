import React, {useContext} from 'react';

import './ErrorPage.css';

import TopBar from '../../components/TopBar/TopBar'; // TopBar component
import AppContext from '../../context/AppContext';

export default function ErrorPage() {
  const error = useContext(AppContext).error;
  console.log(`ErrorPage -> error: ${JSON.stringify(error)}`);

  return (
      <div className="chat1-errorPage">
        <TopBar />

        <h1>Application error</h1>

        <section>
          <header>
              <h2>Error message:</h2>
          </header>
          <p>
              {error.message}
          </p>
        </section>

        <section>
          <header>
              <h2>Last operation result:</h2>
          </header>
          <p>
              {JSON.stringify(error.result)}
          </p>
        </section>


      </div>
    );
}
