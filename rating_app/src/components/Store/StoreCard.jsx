import React, { useState } from 'react';
import RatingForm from '../Rating/RatingForm';

const StoreCard = ({ store }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{store.name}</h2>
      <p className="text-gray-600 mb-2">{store.address}</p>
      <p>⭐ Avg Rating: {store.average_rating || 'Not rated yet'}</p>
      <p>🧑‍💻 Your Rating: {store.user_rating ?? 'Not rated'}</p>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
      >
        {showForm ? 'Cancel' : 'Rate'}
      </button>

      {showForm && <RatingForm storeId={store.id} initialRating={store.user_rating} />}
    </div>
  );
};

export default StoreCard;
