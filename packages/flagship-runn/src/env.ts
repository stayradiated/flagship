import * as process from 'node:process'
import { z } from 'zod'

const env = z
  .object({
    RUNN_GRAPHQL_ENDPOINT: z.string().url(),
    RUNN_GRAPHQL_AUTH_TOKEN: z.string().min(1),
  })
  .parse(process.env)

const authToken = env.RUNN_GRAPHQL_AUTH_TOKEN
const endpoint = env.RUNN_GRAPHQL_ENDPOINT

export { authToken, endpoint }
