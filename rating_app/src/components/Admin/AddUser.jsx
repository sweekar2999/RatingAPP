import React, { useState } from 'react';
import axios from '../../services/axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/admin/users', form); // send data to backend
      alert('User added successfully!');
      navigate('/admin');
    } catch (err) {
      console.error('Add user error:', err);
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Add New User</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md">
        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border mb-4"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-4"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          className="w-full p-2 border mb-4"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4"
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full p-2 border mb-4"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">Normal User</option>
          <option value="owner">Store Owner</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
};

export default AddUser;
