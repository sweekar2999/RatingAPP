import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import Navbar from '../Navbar';

const OwnerDashboard = () => {
  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('/owner/dashboard');
      setStoreInfo(res.data);
    } catch (err) {
      console.error('Failed to fetch owner dashboard:', err);
      alert('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading store ratings...</p>;

  if (!storeInfo) return <p className="p-6 text-red-600">No store assigned yet.</p>;

  return (
    <div>
        <Navbar/>
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">{storeInfo.store_name}</h2>
        <p className="text-gray-600">Store ID: {storeInfo.store_id}</p>
        <p>⭐ Average Rating: {storeInfo.average_rating || 'No ratings yet'}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Ratings Received</h3>
        {storeInfo.ratings.length === 0 ? (
          <p>No ratings submitted yet.</p>
        ) : (
          <ul className="space-y-2">
            {storeInfo.ratings.map((r, i) => (
              <li key={i} className="border-b pb-2">
                <strong>{r.user_name}</strong> ({r.email}) rated: <span className="text-blue-600 font-semibold">{r.rating}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
};

export default OwnerDashboard;
