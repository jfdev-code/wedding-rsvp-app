import React, { useState } from 'react';
import GuestSearch from './components/GuestSearch';
import RSVPForm from './components/RSVPForm';
import AdminPanel from './components/AdminPanel';
import './App.css';

const App = () => {
  const [guest, setGuest] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="App">
      <header>
        <h1>Sikia & Gohn's Wedding</h1>
        <p>August 7, 2025 | Capilla Club del Rancho</p>
        <a href="YOUR_GIFT_REGISTRY_LINK" target="_blank" rel="noopener noreferrer">
          Gift Registry
        </a>
      </header>
      <main>
        {isAdmin ? (
          <AdminPanel setIsAdmin={setIsAdmin} />
        ) : guest ? (
          <RSVPForm guest={guest} setGuest={setGuest} />
        ) : (
          <GuestSearch setGuest={setGuest} setIsAdmin={setIsAdmin} />
        )}
      </main>
    </div>
  );
};

export default App;