import Link from "next/link";
import { Clock, Users, ExternalLink } from "lucide-react";
import { Service, SERVICE_CATEGORIES } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const category = SERVICE_CATEGORIES.find((c) => c.value === service.category);

  return (
    <Link href={`/dashboard/services/${service.id}`}>
      <div className="card hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-2">
            {service.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200 ml-2">
            {category?.label}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Processing time: {service.processingTime}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>Department: {service.department}</span>
          </div>

          {service.fees && service.fees > 0 && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">
                Fee: ${service.fees}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {service.isOnline && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 border border-green-200">
                Online
              </span>
            )}
            {service.fees === 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                Free
              </span>
            )}
          </div>

          <ExternalLink className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </Link>
  );
}
