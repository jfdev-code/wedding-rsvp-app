import React, { useState } from 'react';

const RSVPForm = ({ guest, setGuest }) => {
  const [confirmed, setConfirmed] = useState(guest.confirmed);
  const [plusOne, setPlusOne] = useState(guest.plusOne);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(guest.dietaryRestrictions);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/guests/${guest._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmed, plusOne, dietaryRestrictions }),
    });
    const data = await response.json();
    if (response.ok) {
      setGuest(data);
      alert('RSVP updated successfully!');
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome, {guest.name}!</h2>
      <label>
        Will you attend?
        <select value={confirmed} onChange={(e) => setConfirmed(e.target.value === 'true')}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>
      <label>
        Number of additional guests:
        <input
          type="number"
          value={plusOne}
          onChange={(e) => setPlusOne(Number(e.target.value))}
          min="0"
        />
      </label>
      <label>
        Dietary restrictions:
        <input
          type="text"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
        />
      </label>
      <button type="submit">Confirm RSVP</button>
    </form>
  );
};

export default RSVPForm;