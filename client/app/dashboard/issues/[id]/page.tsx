"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Camera,
} from "lucide-react";
import { useIssues } from "@/hooks/useIssues";
import { Issue, ISSUE_PRIORITIES, ISSUE_STATUSES } from "@/types/issue";

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { issues } = useIssues();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (issues && params.id) {
      const foundIssue = issues.find((i) => i.id === params.id);
      setIssue(foundIssue || null);
    }
  }, [issues, params.id]);

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">Issue not found</p>
            <button onClick={() => router.back()} className="btn-primary mt-4">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const priority = ISSUE_PRIORITIES.find((p) => p.value === issue.priority);
  const status = ISSUE_STATUSES.find((s) => s.value === issue.status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Issue Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Info */}
            <div className="card">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {issue.title}
                </h2>
                <div className="flex gap-2 ml-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(
                      issue.priority
                    )}`}
                  >
                    {priority?.label}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                      issue.status
                    )}`}
                  >
                    {status?.label}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{issue.description}</p>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{issue.location.address}</span>
              </div>

              {/* Timestamps */}
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  Reported on {new Date(issue.createdAt).toLocaleDateString()}
                </span>
                {issue.resolvedAt && (
                  <span className="ml-4">
                    • Resolved on{" "}
                    {new Date(issue.resolvedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Images */}
              {issue.images && issue.images.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Photos
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {issue.images.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Issue ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Comments */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Updates & Comments
              </h3>

              {issue.comments && issue.comments.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {issue.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {comment.userName}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-6">No updates yet</p>
              )}

              {/* Add Comment */}
              <div className="border-t pt-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment or update..."
                  className="input mb-3"
                  rows={3}
                />
                <button className="btn-primary" disabled={!comment.trim()}>
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Issue Meta */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">
                Issue Information
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">ID</span>
                  <p className="font-mono text-sm">{issue.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="capitalize">
                    {issue.category.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Priority</span>
                  <p>{priority?.label}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <p>{status?.label}</p>
                </div>
                {issue.assignedTo && (
                  <div>
                    <span className="text-sm text-gray-500">Assigned To</span>
                    <p>{issue.assignedTo}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-2">
                <button className="btn-secondary w-full">Edit Issue</button>
                <button className="btn-secondary w-full">Share Issue</button>
                <button className="btn-secondary w-full">Report Problem</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
