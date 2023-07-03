import { useEffect } from "react";
import { useState } from "react";
import useDebounce from "./useDebounce";

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async (query) => {
    try {
      setLoading(true);
      const res = await promise(query);
      setData(res.data?.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;
