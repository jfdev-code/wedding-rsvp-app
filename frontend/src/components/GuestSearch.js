import React, { useState } from 'react';

const GuestSearch = ({ setGuest, setIsAdmin }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (password) {
      // Check admin password
      const response = await fetch(`/api/guests?password=${password}`);
      if (response.ok) {
        setIsAdmin(true);
      } else {
        alert('Invalid admin password');
      }
      return;
    }
    if (name) {
      const response = await fetch(`/api/guests/search?name=${encodeURIComponent(name)}`);
      const data = await response.json();
      if (response.ok) {
        setGuest(data);
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Admin password (for admin only)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default GuestSearch;