import Link from "next/link";
import { Clock, MapPin, AlertCircle } from "lucide-react";
import { Issue, ISSUE_PRIORITIES, ISSUE_STATUSES } from "@/types/issue";

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
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
    <Link href={`/dashboard/issues/${issue.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {issue.title}
          </h3>
          <div className="flex gap-2 ml-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                issue.priority
              )}`}
            >
              {priority?.label}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                issue.status
              )}`}
            >
              {status?.label}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {issue.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{issue.location.address}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
          </div>

          {issue.priority === "urgent" && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="font-medium">Urgent</span>
            </div>
          )}
        </div>

        {issue.images && issue.images.length > 0 && (
          <div className="mt-3">
            <div className="flex space-x-2">
              {issue.images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Issue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {issue.images.length > 3 && (
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-600">
                    +{issue.images.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
