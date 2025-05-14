// import React, { useEffect, useState } from 'react';
// import axios from '../../services/axios';
// import Navbar from '../Navbar'; // Optional

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     total_users: 0,
//     total_stores: 0,
//     total_ratings: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get('/admin/dashboard');
//       console.log('Dashboard API response:', res.data); // ADD THIS LINE
//       setStats({
//         total_users: res.data.totalUsers,
//         total_stores: res.data.totalStores,
//         total_ratings: res.data.totalRatings,
//       });
//       setLoading(false);  // Set loading to false after data is fetched
//     } catch (err) {
//       console.error('Error fetching dashboard stats:', err);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Optional shared Navbar */}
//       <Navbar />

//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       {loading ? (
//         <p>Loading stats...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold">Total Users</h2>
//             <p className="text-2xl mt-2">{stats.total_users}</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold">Total Stores</h2>
//             <p className="text-2xl mt-2">{stats.total_stores}</p>
//           </div>
//           <div className="bg-white p-6 rounded shadow">
//             <h2 className="text-lg font-semibold">Total Ratings</h2>
//             <p className="text-2xl mt-2">{stats.total_ratings}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from '../../services/axios';
import Navbar from '../Navbar'; // Optional

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_stores: 0,
    total_ratings: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/admin/dashboard');
      console.log('Dashboard API response:', res.data); // ADD THIS LINE
      setStats({
        total_users: res.data.totalUsers,
        total_stores: res.data.totalStores,
        total_ratings: res.data.totalRatings,
      });
      setLoading(false);  // Set loading to false after data is fetched
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Optional shared Navbar */}
      <Navbar />

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl mt-2">{stats.total_users}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold">Total Stores</h2>
            <p className="text-2xl mt-2">{stats.total_stores}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold">Total Ratings</h2>
            <p className="text-2xl mt-2">{stats.total_ratings}</p>
          </div>
        </div>
      )}

      {/* Add Store Button to link to Add Store page */}
      <div className="mt-6">
        <Link to="/admin/add-store">
          <button className="bg-blue-500 text-white p-2 rounded">
            Add New Store
          </button>
        </Link>
      </div>
      <div className="mt-6">
        <Link to="/admin/add-user">
          <button className="bg-blue-500 text-white p-2 rounded">
            Add New User
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
