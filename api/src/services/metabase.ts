import { sign } from 'jsonwebtoken'

const METABASE_SITE_URL = 'https://wevs.metabaseapp.com'
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY

const payload = {
  resource: { dashboard: 1 },
  params: {},
  exp: Math.round(Date.now() / 1000) + 60 * 60 * 24
}
export const getEmbedUrl = (): string => {
  const token = sign(payload, String(METABASE_SECRET_KEY))
  return (
    METABASE_SITE_URL +
    '/embed/dashboard/' +
    token +
    '#bordered=true&titled=true'
  )
}
