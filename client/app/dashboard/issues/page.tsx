"use client";

import { useIssues } from "@/hooks/useIssues";
import IssueCard from "@/components/IssueCard";
import { useState } from "react";
import Link from "next/link";

export default function IssuesPage() {
  const { issues, loading } = useIssues();
  const [filter, setFilter] = useState("all");

  const filteredIssues = issues?.filter((issue) => {
    if (filter === "all") return true;
    return issue.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading issues...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Issues</h1>
            <p className="text-gray-600">
              Track and manage your reported issues
            </p>
          </div>
          <Link href="/report" className="btn-primary">
            Report New Issue
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex space-x-4 border-b">
            {[
              { key: "all", label: "All Issues" },
              { key: "pending", label: "Pending" },
              { key: "in-progress", label: "In Progress" },
              { key: "resolved", label: "Resolved" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Issues Grid */}
        {filteredIssues && filteredIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8">
              <p className="text-gray-500 text-lg mb-4">
                {filter === "all"
                  ? "No issues found"
                  : `No ${filter} issues found`}
              </p>
              <Link href="/report" className="btn-primary">
                Report Your First Issue
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
