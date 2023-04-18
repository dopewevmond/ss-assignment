declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      PORT: string
      JWT_SECRET: string
      DATABASE_URL: string
      TEST_DATABASE_URL: string
      METABASE_SECRET_KEY: string
    }
  }
}

export {}
