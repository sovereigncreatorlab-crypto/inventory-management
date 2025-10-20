export const dynamic = 'force-dynamic'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {session?.user?.name || 'User'}!</h1>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your inventory today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-bold mt-2">-</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Stock</p>
          <p className="text-3xl font-bold mt-2">-</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Low Stock Items</p>
          <p className="text-3xl font-bold mt-2 text-orange-600">-</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-3xl font-bold mt-2">-</p>
        </div>
      </div>
    </div>
  )
}
