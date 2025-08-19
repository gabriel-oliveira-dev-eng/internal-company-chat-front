import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("access_token");

    const headers = config.headers || {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await apiClient({
        method,
        url,
        data,
        ...config,
        headers,
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error };
}
