This is a [Next.js](https://nextjs.org/) and React Query example project based on the look and feel of the Reddit website.

Please note that this is an ongoing refactor of another Reddit clone project that I built using Next.js and Apollo Client which can be found [here](https://github.com/LoomiDigital/reddit-clone)

I will upload a demo as soon as the refactor is complete.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Demo

Demo will be available soon.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/)
- [NextAuth.js](https://next-auth.js.org/providers/github)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Approach

- `getServerSideProps` was leveraged to hydrate the client side cache with the initial data from the server, however, no data was returned from the server.
- Lazy loading was implemented for the posts and comments to improve performance.
- NextAuth.js was used to implement authentication with Reddit.
