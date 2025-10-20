import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Add secret here as well
const handler = NextAuth({
  ...authOptions,
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
