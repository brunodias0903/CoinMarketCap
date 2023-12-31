import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = ({ url, method }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.baseURL = "https://api.coingecko.com/api/v3";

  const fetchData = () => {
    axios[method](url)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, [url, method]);

  return { response, error, loading };
}

export default useAxios;