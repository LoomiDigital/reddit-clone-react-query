import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const config: CodegenConfig = {
  schema: {
    [process.env.NEXT_PUBLIC_STEPZEN_API_URL]: {
      headers: {
        Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
      },
    },
  },
  documents: ["./graphql/**/*.graphql"],
  generates: {
    "./generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        scalars: {
          ID: "number",
        },
        preResolveTypes: true,
        fetcher: "graphql-request",
        exposeQueryKeys: true,
        exposeFetcher: true,
        pureMagicComment: true,
      },
    },
  },
};
export default config;
