import { useState } from 'react';
import { searchNasaImages } from '../../services/nasaApi';

export const useNasaSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query, yearStart, yearEnd) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchNasaImages(query, yearStart, yearEnd);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};