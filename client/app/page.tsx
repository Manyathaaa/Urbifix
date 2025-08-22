import Link from "next/link";
import { MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <MapPin className="h-16 w-16" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Urbifix</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop platform for reporting city issues, accessing
            municipal services, and staying connected with your community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/report" className="btn-primary text-lg px-8 py-3">
              Report an Issue
            </Link>
            <Link
              href="/dashboard"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You Can Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Report Issues</h3>
              <p className="text-gray-600">
                Quickly report potholes, broken streetlights, water leaks, and
                other city infrastructure problems.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Services</h3>
              <p className="text-gray-600">
                Browse and access various municipal services from permit
                applications to waste management.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">
                Monitor the status of your reported issues and stay updated on
                resolution progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of citizens making their city better
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              href="/auth/login"
              className="border-2 border-white hover:bg-white hover:text-primary-600 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
