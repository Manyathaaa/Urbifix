export interface Service {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  department: string;
  requirements?: string[];
  documents?: ServiceDocument[];
  processingTime: string;
  fees?: number;
  isOnline: boolean;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ServiceDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
  format: string;
}

export interface ServiceApplication {
  id: string;
  serviceId: string;
  userId: string;
  status: ServiceApplicationStatus;
  submittedAt: string;
  processedAt?: string;
  completedAt?: string;
  documents: ServiceApplicationDocument[];
  notes?: string;
}

export interface ServiceApplicationDocument {
  id: string;
  documentId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface CreateServiceRequest {
  title: string;
  description: string;
  category: ServiceCategory;
  department: string;
  requirements?: string[];
  documents?: Omit<ServiceDocument, "id">[];
  processingTime: string;
  fees?: number;
  isOnline: boolean;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export interface UpdateServiceRequest {
  title?: string;
  description?: string;
  category?: ServiceCategory;
  department?: string;
  requirements?: string[];
  documents?: ServiceDocument[];
  processingTime?: string;
  fees?: number;
  isOnline?: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export type ServiceCategory =
  | "permits"
  | "licenses"
  | "certificates"
  | "payments"
  | "utilities"
  | "housing"
  | "business"
  | "transportation"
  | "health"
  | "education"
  | "other";

export type ServiceApplicationStatus =
  | "draft"
  | "submitted"
  | "under-review"
  | "approved"
  | "rejected"
  | "completed";

export const SERVICE_CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: "permits", label: "Permits" },
  { value: "licenses", label: "Licenses" },
  { value: "certificates", label: "Certificates" },
  { value: "payments", label: "Payments" },
  { value: "utilities", label: "Utilities" },
  { value: "housing", label: "Housing" },
  { value: "business", label: "Business" },
  { value: "transportation", label: "Transportation" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

export const SERVICE_APPLICATION_STATUSES: {
  value: ServiceApplicationStatus;
  label: string;
  color: string;
}[] = [
  { value: "draft", label: "Draft", color: "gray" },
  { value: "submitted", label: "Submitted", color: "blue" },
  { value: "under-review", label: "Under Review", color: "yellow" },
  { value: "approved", label: "Approved", color: "green" },
  { value: "rejected", label: "Rejected", color: "red" },
  { value: "completed", label: "Completed", color: "green" },
];
