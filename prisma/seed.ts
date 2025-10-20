import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create locations
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: 'Warehouse',
        type: 'WAREHOUSE',
        address: 'Main Warehouse Address',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Cologne A',
        type: 'STORE',
        address: 'Cologne Store A Address',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Cologne B',
        type: 'STORE',
        address: 'Cologne Store B Address',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Dortmund',
        type: 'STORE',
        address: 'Dortmund Store Address',
      },
    }),
    prisma.location.create({
      data: {
        name: 'Unna',
        type: 'STORE',
        address: 'Unna Store Address',
      },
    }),
  ])

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create sample products
  const productData = [
    { sku: 'PROD001', name: 'Product 1', cost: 10, price: 20 },
    { sku: 'PROD002', name: 'Product 2', cost: 15, price: 30 },
    { sku: 'PROD003', name: 'Product 3', cost: 20, price: 40 },
    { sku: 'PROD004', name: 'Product 4', cost: 25, price: 50 },
    { sku: 'PROD005', name: 'Product 5', cost: 30, price: 60 },
    { sku: 'PROD006', name: 'Product 6', cost: 35, price: 70 },
    { sku: 'PROD007', name: 'Product 7', cost: 40, price: 80 },
    { sku: 'PROD008', name: 'Product 8', cost: 45, price: 90 },
    { sku: 'PROD009', name: 'Product 9', cost: 50, price: 100 },
    { sku: 'PROD010', name: 'Product 10', cost: 55, price: 110 },
    { sku: 'PROD011', name: 'Product 11', cost: 60, price: 120 },
    { sku: 'PROD012', name: 'Product 12', cost: 65, price: 130 },
    { sku: 'PROD013', name: 'Product 13', cost: 70, price: 140 },
  ]

  for (const product of productData) {
    const created = await prisma.product.create({
      data: {
        ...product,
        category: 'General',
        minStock: 5,
        qrCode: `QR_${product.sku}`,
      },
    })

    // Initialize inventory for each location
    for (const location of locations) {
      await prisma.inventory.create({
        data: {
          productId: created.id,
          locationId: location.id,
          quantity: 0,
          available: 0,
        },
      })
    }
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
