import { PrismaClient } from '@prisma/client'
import { withPulse } from '@prisma/extension-pulse'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
}).$extends(withPulse({ apiKey: process.env.PULSE_API_KEY ?? '' }))

export default prisma
