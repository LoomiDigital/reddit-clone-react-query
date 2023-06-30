declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_STEPZEN_API_KEY: string;
    NEXT_PUBLIC_STEPZEN_API_URL: string;
    REDDIT_CLIENT_SECRET: string;
    REDDIT_CLIENT_ID: string;
  }
}
