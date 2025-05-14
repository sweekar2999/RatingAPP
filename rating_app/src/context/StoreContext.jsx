import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/axios';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const res = await API.get('/user/stores');
      setStores(res.data);
    } catch (err) {
      console.error('Failed to fetch stores:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await API.post('/user/ratings', { store_id: storeId, rating });
      await fetchStores(); // refresh ratings after submit
    } catch (err) {
      console.error('Failed to submit rating:', err);
      throw err;
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <StoreContext.Provider value={{ stores, loading, submitRating }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = () => useContext(StoreContext);
