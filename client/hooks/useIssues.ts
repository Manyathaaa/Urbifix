"use client";

import { useState, useEffect } from "react";
import { Issue } from "@/types/issue";
import api from "@/lib/api";

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const response = await api.get<Issue[]>("/issues");
      setIssues(response.data);
    } catch (err) {
      setError("Failed to fetch issues");
      console.error("Error fetching issues:", err);
    } finally {
      setLoading(false);
    }
  };

  const createIssue = async (issueData: any) => {
    try {
      const response = await api.post<Issue>("/issues", issueData);
      setIssues((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      throw new Error("Failed to create issue");
    }
  };

  const updateIssue = async (id: string, updates: any) => {
    try {
      const response = await api.patch<Issue>(`/issues/${id}`, updates);
      setIssues((prev) =>
        prev.map((issue) => (issue.id === id ? response.data : issue))
      );
      return response.data;
    } catch (err) {
      throw new Error("Failed to update issue");
    }
  };

  const deleteIssue = async (id: string) => {
    try {
      await api.delete(`/issues/${id}`);
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    } catch (err) {
      throw new Error("Failed to delete issue");
    }
  };

  return {
    issues,
    loading,
    error,
    createIssue,
    updateIssue,
    deleteIssue,
    refetch: fetchIssues,
  };
}
