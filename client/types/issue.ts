export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  status: IssueStatus;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images?: string[];
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  comments?: IssueComment[];
}

export interface IssueComment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  category: IssueCategory;
  priority: IssuePriority;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images?: string[];
}

export interface UpdateIssueRequest {
  title?: string;
  description?: string;
  category?: IssueCategory;
  priority?: IssuePriority;
  status?: IssueStatus;
  assignedTo?: string;
}

export type IssueCategory =
  | "pothole"
  | "streetlight"
  | "water_leak"
  | "garbage"
  | "traffic_signal"
  | "sidewalk"
  | "drainage"
  | "park_maintenance"
  | "noise_pollution"
  | "other";

export type IssuePriority = "low" | "medium" | "high" | "urgent";

export type IssueStatus = "pending" | "in-progress" | "resolved" | "closed";

export const ISSUE_CATEGORIES: { value: IssueCategory; label: string }[] = [
  { value: "pothole", label: "Pothole" },
  { value: "streetlight", label: "Street Light" },
  { value: "water_leak", label: "Water Leak" },
  { value: "garbage", label: "Garbage/Waste" },
  { value: "traffic_signal", label: "Traffic Signal" },
  { value: "sidewalk", label: "Sidewalk" },
  { value: "drainage", label: "Drainage" },
  { value: "park_maintenance", label: "Park Maintenance" },
  { value: "noise_pollution", label: "Noise Pollution" },
  { value: "other", label: "Other" },
];

export const ISSUE_PRIORITIES: {
  value: IssuePriority;
  label: string;
  color: string;
}[] = [
  { value: "low", label: "Low", color: "green" },
  { value: "medium", label: "Medium", color: "yellow" },
  { value: "high", label: "High", color: "orange" },
  { value: "urgent", label: "Urgent", color: "red" },
];

export const ISSUE_STATUSES: {
  value: IssueStatus;
  label: string;
  color: string;
}[] = [
  { value: "pending", label: "Pending", color: "gray" },
  { value: "in-progress", label: "In Progress", color: "blue" },
  { value: "resolved", label: "Resolved", color: "green" },
  { value: "closed", label: "Closed", color: "red" },
];
