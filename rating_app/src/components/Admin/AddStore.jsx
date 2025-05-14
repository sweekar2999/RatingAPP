import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import Navbar from '../Navbar'; // Optional

const AddStoreForm = () => {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users list when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/admin/users');
        console.log('Fetched users:', res.data);
        
        if (res.data && Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error('Invalid response structure');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setErrorMessage('Error fetching users list');
      }
    };
    
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setErrorMessage('');

    try {
      // Log the data we're about to send for debugging
      const storeData = {
        name: storeName,
        email: email,
        address: address,
        owner_id: ownerId,
      };
      console.log('Sending store data:', storeData);

      const res = await axios.post('/admin/stores', storeData);

      // Handle both 200 and 201 status codes as success
      if (res.status === 201 || res.status === 200) {
        setMessage('Store added successfully!');
        // Clear form fields on success
        setStoreName('');
        setAddress('');
        setOwnerId('');
        setEmail('');
      }
    } catch (err) {
      console.error('Error adding store:', err);
      // Display the error message from the server if available
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Error adding store. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Add Store and Assign Owner</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="storeName" className="block text-sm font-semibold">Store Name</label>
          <input
            type="text"
            id="storeName"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ownerId" className="block text-sm font-semibold">Owner ID</label>
          <input
            type="text"
            id="ownerId"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            className="mt-2 p-2 w-full border rounded"
            required
            placeholder="Enter User ID manually"
          />
          <small className="text-gray-500">Note: ID must belong to a user with 'owner' role</small>
        </div>

        {users.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Available Owners:</label>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {users
                .filter(user => user.role === 'owner')
                .map(user => (
                  <div 
                    key={user.id} 
                    className="text-sm p-1 cursor-pointer hover:bg-gray-100"
                    onClick={() => setOwnerId(user.id)}
                  >
                    ID: {user.id} - {user.name || user.email}
                  </div>
                ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding Store...' : 'Add Store'}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p>
        )}
        
        {errorMessage && (
          <p className="mt-4 text-center text-sm text-red-600">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddStoreForm;