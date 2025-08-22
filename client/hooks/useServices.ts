"use client";

import { useState, useEffect } from "react";
import { Service } from "@/types/service";
import api from "@/lib/api";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.get<Service[]>("/services");
      setServices(response.data);
    } catch (err) {
      setError("Failed to fetch services");
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const getService = async (id: string) => {
    try {
      const response = await api.get<Service>(`/services/${id}`);
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch service");
    }
  };

  return {
    services,
    loading,
    error,
    getService,
    refetch: fetchServices,
  };
}
