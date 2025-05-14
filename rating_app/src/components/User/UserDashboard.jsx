import React, { useState } from 'react';
import { useStores } from '../../context/StoreContext';
import StoreCard from '../Store/StoreCard';
import Navbar from '../Navbar';
import { Search } from 'lucide-react'; // Using Lucide icon for search

const UserDashboard = () => {
  const { stores, loading } = useStores();
  const [query, setQuery] = useState('');

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(query.toLowerCase()) ||
    store.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome, User 👋</h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search stores by name or address..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Store Listings */}
        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading stores...</div>
        ) : filteredStores.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No matching stores found 😕</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
