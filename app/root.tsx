import { ChakraProvider, Box, Heading } from '@chakra-ui/react'
import type { V2_MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react'

export const meta: V2_MetaFunction = () => [
  {
    /* eslint-disable-next-line unicorn/text-encoding-identifier-case */
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
  },
]

function Document({
  children,
  title = 'App title',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  // Throw new Error("💣💥 Booooom");

  return (
    <Document>
      <ChakraProvider>
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}

// How ChakraProvider should be used on ErrorBoundary
export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <ChakraProvider>
          <Box>
            <Heading as="h1" bg="purple.600">
              [CatchBoundary]: {error.status} {error.statusText}
            </Heading>
          </Box>
        </ChakraProvider>
      </Document>
    )
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = 'Unknown error'
  if (error instanceof Error) {
    errorMessage = error.message
  }

  return (
    <Document title="Error!">
      <ChakraProvider>
        <Box>
          <Heading as="h1" bg="blue.500">
            [ErrorBoundary]: There was an error: {errorMessage}
          </Heading>
        </Box>
      </ChakraProvider>
    </Document>
  )
}
