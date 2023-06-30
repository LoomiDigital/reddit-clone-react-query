import { useMemo } from "react";
import fetch from "isomorphic-unfetch";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { relayStylePagination } from "@apollo/client/utilities";
import { AppProps } from "next/app";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const isSSR = (): boolean => typeof window === "undefined";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createIsomorphLink = () => {
  const { HttpLink } = require("@apollo/client/link/http");
  return new HttpLink({
    uri: process.env.NEXT_PUBLIC_STEPZEN_API_URL,
    fetch,
    headers: {
      Authorization: `apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`,
    },
  });
};

export const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination(),
          },
        },
      },
    }),
  });
};

type InitialState = NormalizedCacheObject | null | undefined;

interface IInitializeApollo {
  initialState?: InitialState;
}

export const initializeApollo = (
  initialState: IInitializeApollo = {
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (isSSR()) return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: AppProps["pageProps"]) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
