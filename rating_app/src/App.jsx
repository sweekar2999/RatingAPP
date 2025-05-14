import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import AdminDashboard from './components/Admin/AdminDashboard';
import AddUser from './components/Admin/AddUser';
import AddStore from './components/Admin/AddStore';

import UserDashboard from './components/User/UserDashboard';
import OwnerDashboard from './components/Owner/OwnerDashboard';

import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<PrivateRoute element={AdminDashboard} allowedRoles={['admin']} />}
        />
        <Route
          path="/admin/add-user"
          element={<PrivateRoute element={AddUser} allowedRoles={['admin']} />}
        />
        <Route
          path="/admin/add-store"
          element={<PrivateRoute element={AddStore} allowedRoles={['admin']} />}
        />

        {/* User route */}
        <Route
          path="/user"
          element={<PrivateRoute element={UserDashboard} allowedRoles={['user']} />}
        />

        {/* Store Owner route */}
        <Route
          path="/owner"
          element={<PrivateRoute element={OwnerDashboard} allowedRoles={['owner']} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
