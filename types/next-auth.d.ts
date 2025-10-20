import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role: string
    locationId?: string
    locationName?: string
  }

  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: string
      locationId?: string
      locationName?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    locationId?: string
    locationName?: string
  }
}
