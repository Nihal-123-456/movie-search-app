import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction();
      setData(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occured"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, fetchData, reset };
};

export default useFetch;
