import React, { useState, useEffect } from 'react';

const AdminPanel = ({ setIsAdmin }) => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', plusOne: 0, dietaryRestrictions: '' });

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const response = await fetch(`/api/guests?password=${process.env.REACT_APP_ADMIN_PASSWORD}`);
    const data = await response.json();
    if (response.ok) {
      setGuests(data);
    }
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/guests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newGuest,
        password: process.env.REACT_APP_ADMIN_PASSWORD,
      }),
    });
    if (response.ok) {
      setNewGuest({ name: '', plusOne: 0, dietaryRestrictions: '' });
      fetchGuests();
    } else {
      alert('Failed to add guest');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <button onClick={() => setIsAdmin(false)}>Logout</button>
      <form onSubmit={handleAddGuest}>
        <input
          type="text"
          placeholder="Guest name"
          value={newGuest.name}
          onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Plus one"
          value={newGuest.plusOne}
          onChange={(e) => setNewGuest({ ...newGuest, plusOne: Number(e.target.value) })}
          min="0"
        />
        <input
          type="text"
          placeholder="Dietary restrictions"
          value={newGuest.dietaryRestrictions}
          onChange={(e) => setNewGuest({ ...newGuest, dietaryRestrictions: e.target.value })}
        />
        <button type="submit">Add Guest</button>
      </form>
      <div className="guest-list">
        <h3>Guest List</h3>
        {guests.map((guest) => (
          <div key={guest._id}>
            {guest.name} - Confirmed: {guest.confirmed ? 'Yes' : 'No'} - Plus One: {guest.plusOne} - Dietary: {guest.dietaryRestrictions}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;