import * as process from 'node:process'
import { z } from 'zod'
import { once } from './utils/once.js'

const getEnv = once(() => {
  const $env = z.object({
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  })

  const result = $env.safeParse(process.env)

  if (!result.success) {
    const { fieldErrors } = result.error.flatten()
    const list = Object.entries(fieldErrors)
      .map(([key, value]) => {
        return `- ${key}: ${value.join(', ')}`
      })
      .join('\n')
    throw new Error(`Invalid environment variables:\n${list}`)
  }

  const env = result.data

  return {
    googleClientId: env.GOOGLE_CLIENT_ID,
    googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  }
})

export { getEnv }
