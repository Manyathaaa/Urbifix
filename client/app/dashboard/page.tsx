"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIssues } from "@/hooks/useIssues";
import IssueCard from "@/components/IssueCard";

export default function Dashboard() {
  const { user } = useAuth();
  const { issues, loading } = useIssues();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    if (issues) {
      setStats({
        total: issues.length,
        pending: issues.filter((issue) => issue.status === "pending").length,
        inProgress: issues.filter((issue) => issue.status === "in-progress")
          .length,
        resolved: issues.filter((issue) => issue.status === "resolved").length,
      });
    }
  }, [issues]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your recent activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Issues
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inProgress}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.resolved}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/report"
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report New Issue</h3>
              <p className="text-gray-600">
                Report a new city infrastructure problem
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/services"
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse Services</h3>
              <p className="text-gray-600">
                Access municipal services and applications
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/profile"
            className="card hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">My Profile</h3>
              <p className="text-gray-600">Update your account information</p>
            </div>
          </Link>
        </div>

        {/* Recent Issues */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Issues</h2>
            <Link
              href="/dashboard/issues"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </Link>
          </div>

          {issues && issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issues.slice(0, 6).map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No issues reported yet</p>
              <Link href="/report" className="btn-primary mt-4 inline-block">
                Report Your First Issue
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
