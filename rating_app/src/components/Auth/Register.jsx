import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';


const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user'
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/signup', form);
      console.log('Registered:', res.data);
      alert('Signup successful!');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={handleSubmit}
        className="register-form-container"
      >
        <h2 className="register-title">Create Account</h2>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            id="name"
            name="name"
            className="form-input"
            placeholder="John Doe"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="john@example.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            id="address"
            name="address"
            className="form-input"
            placeholder="123 Main St"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            name="role"
            className="form-select"
            onChange={handleChange}
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="owner">Store Owner</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Register
        </button>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
