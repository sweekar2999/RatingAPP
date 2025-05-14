import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/login', form);
      const { token } = res.data;

      const decoded = JSON.parse(atob(token.split('.')[1]));

      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);

      if (decoded.role === 'admin') navigate('/admin');
      else if (decoded.role === 'owner') navigate('/owner');
      else navigate('/user');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="signup-section">
          <p className="signup-text">Don't have an account?</p>
          <button
            onClick={handleSignupRedirect}
            className="signup-button"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
