import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Inventory Management System
          </h1>
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>Name:</strong> {session.user.name || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> {session.user.email}
            </p>
            <p className="text-gray-600">
              <strong>Role:</strong> {session.user.role}
            </p>
            {session.user.locationName && (
              <p className="text-gray-600">
                <strong>Location:</strong> {session.user.locationName}
              </p>
            )}
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Products</p>
                <p className="text-2xl font-bold text-blue-900">13</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Locations</p>
                <p className="text-2xl font-bold text-green-900">5</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Status</p>
                <p className="text-2xl font-bold text-purple-900">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
