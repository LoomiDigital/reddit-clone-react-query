import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_STEPZEN_API_URL,
  {
    headers: {
      Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
  }
);

export default graphqlClient;
