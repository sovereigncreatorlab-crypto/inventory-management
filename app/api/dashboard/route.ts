import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const now = new Date()
    const today = new Date(now.setHours(0, 0, 0, 0))

    // Fetch basic statistics
    const [
      totalProducts,
      totalLocations,
      todayTransactions,
      inventoryByLocation,
    ] = await Promise.all([
      prisma.product.count({ where: { active: true } }),
      prisma.location.count({ where: { active: true } }),
      prisma.transaction.count({
        where: { createdAt: { gte: today } }
      }),
      prisma.location.findMany({
        where: { active: true },
        include: {
          inventory: {
            include: {
              product: true
            }
          }
        }
      })
    ])

    // Calculate inventory values by location
    const inventoryData = inventoryByLocation.map(location => ({
      location: location.name,
      value: location.inventory.reduce((sum, inv) => 
        sum + (inv.quantity * inv.product.price), 0
      ),
      items: location.inventory.filter(inv => inv.quantity > 0).length
    }))

    const totalInventoryValue = inventoryData.reduce((sum, loc) => sum + loc.value, 0)

    return NextResponse.json({
      kpis: {
        totalInventoryValue,
        totalProducts,
        lowStockAlerts: 0,
        outOfStockItems: 0,
        todayTransactions,
        todayRevenue: 0,
        weeklyGrowth: 0,
        monthlyGrowth: 0,
      },
      inventoryByLocation: inventoryData,
      recentTransactions: [],
      topMovingProducts: [],
      salesTrend: [],
      stockAlerts: [],
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
