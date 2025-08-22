"use client";

import { useServices } from "@/hooks/useServices";
import ServiceCard from "@/components/ServiceCard";
import { useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/types/service";

export default function ServicesPage() {
  const { services, loading } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredServices = services?.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Municipal Services
          </h1>
          <p className="text-gray-600">
            Browse and access city services online
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="md:w-64 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredServices?.length || 0} service
            {(filteredServices?.length || 0) !== 1 ? "s" : ""} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "all" &&
              ` in ${
                SERVICE_CATEGORIES.find((c) => c.value === selectedCategory)
                  ?.label
              }`}
          </p>
        </div>

        {/* Services Grid */}
        {filteredServices && filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8">
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "No services found matching your criteria"
                  : "No services available at the moment"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Categories Overview */}
        <div className="mt-12 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Service Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {SERVICE_CATEGORIES.map((category) => {
              const count =
                services?.filter((s) => s.category === category.value).length ||
                0;
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    selectedCategory === category.value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="font-medium text-sm">{category.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {count} service{count !== 1 ? "s" : ""}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
