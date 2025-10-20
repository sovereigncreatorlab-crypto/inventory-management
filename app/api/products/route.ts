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
    const searchParams = req.nextUrl.searchParams
    const locationId = searchParams.get("location")
    
    let products
    
    if (locationId) {
      products = await prisma.product.findMany({
        where: { active: true },
        include: {
          inventory: {
            where: { locationId },
          }
        },
        orderBy: { name: "asc" }
      })
    } else {
      products = await prisma.product.findMany({
        where: { active: true },
        orderBy: { name: "asc" }
      })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
