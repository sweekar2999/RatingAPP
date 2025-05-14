import React, { useState } from 'react';
import { useStores } from '../../context/StoreContext';
const RatingForm = ({ storeId, initialRating }) => {
  const [rating, setRating] = useState(initialRating || '');
  const [loading, setLoading] = useState(false);
  const { submitRating } = useStores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitRating(storeId, parseInt(rating));
      alert('Rating submitted!');
    } catch (err) {
      console.error('Rating error:', err);
      alert('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <select
        className="border p-1 mr-2"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      >
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default RatingForm