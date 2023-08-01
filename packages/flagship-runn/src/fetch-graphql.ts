import { authToken, endpoint } from './env.js'

const fetchGraphQL = async <Query, Variables>(
  query: string,
  variables: Variables,
): Promise<Query> => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const body = await response.json()
  if (body.errors) {
    console.dir(body, { depth: null })
    throw new Error(JSON.stringify(body.errors))
  }

  return body.data
}

export { fetchGraphQL }
