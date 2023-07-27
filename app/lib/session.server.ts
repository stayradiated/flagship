import * as process from 'node:process'
import { createCookieSessionStorage } from '@remix-run/node'

// Export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session', // Use any name you want here
    sameSite: 'lax', // This helps with CSRF
    path: '/', // Remember to add this so the cookie will work in all routes
    httpOnly: true, // For security reasons, make this cookie http only
    secrets: ['s3cr3t'], // Replace this with an actual secret
    secure: process.env.NODE_ENV === 'production', // Enable this in prod only
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
