import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: number; output: number; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  post_id?: Maybe<Scalars['ID']['output']>;
  text: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  addVote?: Maybe<Vote>;
  /**  Mutations for type 'comment'  */
  deleteComment?: Maybe<Comment>;
  /**  Mutations for type 'post'  */
  deletePost?: Maybe<Post>;
  /**  Mutations for type 'subreddit'  */
  deleteSubreddit?: Maybe<Subreddit>;
  /**  Mutations for type 'vote'  */
  deleteVote?: Maybe<Vote>;
  insertPost?: Maybe<Post>;
  insertSubreddit?: Maybe<Subreddit>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<Post>;
  updateSubreddit?: Maybe<Subreddit>;
  updateVote?: Maybe<Vote>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationAddCommentArgs = {
  post_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationAddVoteArgs = {
  post_id?: InputMaybe<Scalars['ID']['input']>;
  upvote?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteSubredditArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationDeleteVoteArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertPostArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  subreddit_id?: InputMaybe<Scalars['ID']['input']>;
  subreddit_topic: Scalars['String']['input'];
  title: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationInsertSubredditArgs = {
  topic?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateCommentArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  post_id?: InputMaybe<Scalars['ID']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdatePostArgs = {
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  subreddit_id?: InputMaybe<Scalars['ID']['input']>;
  subreddit_topic?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateSubredditArgs = {
  created_at?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  topic?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Mutation root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `mutation`.
 *
 * If an operation is a `mutation`, the result of the operation is the result of executing the mutation’s
 * top level selection set on the `Mutation` root object type. This selection set is executed serially.
 *
 * It is expected that the top level fields in a `mutation` operation perform side‐effects on backend data systems.
 * Serial execution of the provided mutations ensures against race conditions during these side‐effects.
 */
export type MutationUpdateVoteArgs = {
  post_id: Scalars['ID']['input'];
  upvote?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};

/**
 * PageInfo indicates if more results are available in a connection.
 * See *GraphQL Cursor Connections Specification*
 */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor corresponding to the last node in edges */
  endCursor: Scalars['String']['output'];
  /** Indicates whether more edges exist following the set defined by the pagination arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior to the set defined by the pagination arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Cursor corresponding to the first node in edges */
  startCursor: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  subreddit_id: Scalars['ID']['output'];
  subreddit_topic: Scalars['String']['output'];
  title: Scalars['String']['output'];
  username: Scalars['String']['output'];
  votes?: Maybe<Array<Maybe<Vote>>>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<Post>;
};

/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type Query = {
  __typename?: 'Query';
  /**  Queries for type 'comment'  */
  comment?: Maybe<Comment>;
  commentPaginatedList?: Maybe<Array<Maybe<Comment>>>;
  commentsByPostId?: Maybe<Array<Maybe<Comment>>>;
  getPost?: Maybe<Post>;
  /**  Queries for type 'subreddit'  */
  getSubreddit?: Maybe<Subreddit>;
  getSubredditByTopic?: Maybe<Subreddit>;
  /**  Queries for type 'vote'  */
  getVotesByPostId?: Maybe<Array<Maybe<Vote>>>;
  /**  Queries for type 'post'  */
  posts?: Maybe<PostConnection>;
  postsByTopic?: Maybe<PostConnection>;
  subreddit?: Maybe<Subreddit>;
  subredditList?: Maybe<Array<Maybe<Subreddit>>>;
  subredditPaginatedList?: Maybe<Array<Maybe<Subreddit>>>;
  voteList?: Maybe<Array<Maybe<Vote>>>;
  votePaginatedList?: Maybe<Array<Maybe<Vote>>>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryCommentsByPostIdArgs = {
  post_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetSubredditArgs = {
  subreddit_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetSubredditByTopicArgs = {
  topic: Scalars['String']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryGetVotesByPostIdArgs = {
  post_id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryPostsByTopicArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubredditArgs = {
  id: Scalars['ID']['input'];
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QuerySubredditPaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Query root object type.
 *
 * Contains fields that are available at the top level of a GraphQL `query`.
 *
 * If an operation is a `query`, the result of the operation is the result of
 * executing the query’s top level selection set with the `Query` root object type.
 */
export type QueryVotePaginatedListArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Subreddit = {
  __typename?: 'Subreddit';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  topic: Scalars['String']['output'];
};

export type Vote = {
  __typename?: 'Vote';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  post_id: Scalars['ID']['output'];
  upvote: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type AddCommentMutationVariables = Exact<{
  text: Scalars['String']['input'];
  post_id: Scalars['ID']['input'];
  username: Scalars['String']['input'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: { __typename?: 'Comment', id?: number | null, text: string, post_id?: number | null, created_at?: any | null, username: string } | null };

export type GetCommentsByPostIdQueryVariables = Exact<{
  post_id: Scalars['ID']['input'];
}>;


export type GetCommentsByPostIdQuery = { __typename?: 'Query', commentsByPostId?: Array<{ __typename?: 'Comment', id?: number | null, text: string, post_id?: number | null, created_at?: any | null, username: string } | null> | null };

export type AddPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  image: Scalars['String']['input'];
  username: Scalars['String']['input'];
  subreddit_id: Scalars['ID']['input'];
  subreddit_topic: Scalars['String']['input'];
}>;


export type AddPostMutation = { __typename?: 'Mutation', insertPost?: { __typename?: 'Post', id: number, title: string, body?: string | null, image?: string | null, username: string, subreddit_id: number, subreddit_topic: string, created_at?: any | null, votes?: Array<{ __typename?: 'Vote', upvote: boolean, username: string, post_id: number } | null> | null } | null };

export type PostAttributesFragment = { __typename?: 'Post', id: number, title: string, body?: string | null, image?: string | null, username: string, subreddit_id: number, subreddit_topic: string, created_at?: any | null, votes?: Array<{ __typename?: 'Vote', upvote: boolean, username: string, post_id: number } | null> | null };

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: number, title: string, body?: string | null, image?: string | null, username: string, subreddit_id: number, subreddit_topic: string, created_at?: any | null, votes?: Array<{ __typename?: 'Vote', upvote: boolean, username: string, post_id: number } | null> | null } | null };

export type GetPostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', cursor?: string | null, node?: { __typename?: 'Post', id: number, title: string, body?: string | null, image?: string | null, username: string, subreddit_id: number, subreddit_topic: string, created_at?: any | null, votes?: Array<{ __typename?: 'Vote', upvote: boolean, username: string, post_id: number } | null> | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } | null };

export type GetPostsByTopicQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  topic: Scalars['String']['input'];
}>;


export type GetPostsByTopicQuery = { __typename?: 'Query', postsByTopic?: { __typename?: 'PostConnection', edges: Array<{ __typename?: 'PostEdge', cursor?: string | null, node?: { __typename?: 'Post', id: number, title: string, body?: string | null, image?: string | null, username: string, subreddit_id: number, subreddit_topic: string, created_at?: any | null, votes?: Array<{ __typename?: 'Vote', upvote: boolean, username: string, post_id: number } | null> | null } | null }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string } } | null };

export type AddSubredditMutationVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type AddSubredditMutation = { __typename?: 'Mutation', insertSubreddit?: { __typename?: 'Subreddit', id: number, topic: string, created_at?: any | null } | null };

export type SubredditAttributesFragment = { __typename?: 'Subreddit', id: number, topic: string, created_at?: any | null };

export type GetSubredditByTopicQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetSubredditByTopicQuery = { __typename?: 'Query', getSubredditByTopic?: { __typename?: 'Subreddit', id: number, topic: string, created_at?: any | null } | null };

export type AddVoteMutationVariables = Exact<{
  post_id: Scalars['ID']['input'];
  upvote: Scalars['Boolean']['input'];
  username: Scalars['String']['input'];
}>;


export type AddVoteMutation = { __typename?: 'Mutation', addVote?: { __typename?: 'Vote', post_id: number, username: string, upvote: boolean } | null };

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteVoteMutation = { __typename?: 'Mutation', deleteVote?: { __typename?: 'Vote', id?: number | null, post_id: number, username: string } | null };

export type UpdateVoteMutationVariables = Exact<{
  post_id: Scalars['ID']['input'];
  username: Scalars['String']['input'];
  upvote: Scalars['Boolean']['input'];
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', updateVote?: { __typename?: 'Vote', id?: number | null, upvote: boolean, username: string } | null };

export type GetVotesByPostIdQueryVariables = Exact<{
  post_id: Scalars['ID']['input'];
}>;


export type GetVotesByPostIdQuery = { __typename?: 'Query', getVotesByPostId?: Array<{ __typename?: 'Vote', post_id: number, username: string, upvote: boolean } | null> | null };

export const PostAttributesFragmentDoc = `
    fragment postAttributes on Post {
  id
  title
  body
  image
  username
  votes {
    upvote
    username
    post_id
  }
  subreddit_id
  subreddit_topic
  created_at
}
    `;
export const SubredditAttributesFragmentDoc = `
    fragment subredditAttributes on Subreddit {
  id
  topic
  created_at
}
    `;
export const AddCommentDocument = `
    mutation AddComment($text: String!, $post_id: ID!, $username: String!) {
  addComment(text: $text, post_id: $post_id, username: $username) {
    id
    text
    post_id
    created_at
    username
  }
}
    `;
export const useAddCommentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddCommentMutation, TError, AddCommentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddCommentMutation, TError, AddCommentMutationVariables, TContext>(
      ['AddComment'],
      (variables?: AddCommentMutationVariables) => fetcher<AddCommentMutation, AddCommentMutationVariables>(client, AddCommentDocument, variables, headers)(),
      options
    );
export const GetCommentsByPostIdDocument = `
    query GetCommentsByPostId($post_id: ID!) {
  commentsByPostId(post_id: $post_id) {
    id
    text
    post_id
    created_at
    username
  }
}
    `;
export const useGetCommentsByPostIdQuery = <
      TData = GetCommentsByPostIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCommentsByPostIdQueryVariables,
      options?: UseQueryOptions<GetCommentsByPostIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCommentsByPostIdQuery, TError, TData>(
      ['GetCommentsByPostId', variables],
      fetcher<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(client, GetCommentsByPostIdDocument, variables, headers),
      options
    );
export const AddPostDocument = `
    mutation AddPost($title: String!, $body: String!, $image: String!, $username: String!, $subreddit_id: ID!, $subreddit_topic: String!) {
  insertPost(
    title: $title
    body: $body
    image: $image
    username: $username
    subreddit_id: $subreddit_id
    subreddit_topic: $subreddit_topic
  ) {
    ...postAttributes
  }
}
    ${PostAttributesFragmentDoc}`;
export const useAddPostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddPostMutation, TError, AddPostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddPostMutation, TError, AddPostMutationVariables, TContext>(
      ['AddPost'],
      (variables?: AddPostMutationVariables) => fetcher<AddPostMutation, AddPostMutationVariables>(client, AddPostDocument, variables, headers)(),
      options
    );
export const GetPostDocument = `
    query GetPost($id: ID!) {
  getPost(id: $id) {
    ...postAttributes
  }
}
    ${PostAttributesFragmentDoc}`;
export const useGetPostQuery = <
      TData = GetPostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostQueryVariables,
      options?: UseQueryOptions<GetPostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostQuery, TError, TData>(
      ['GetPost', variables],
      fetcher<GetPostQuery, GetPostQueryVariables>(client, GetPostDocument, variables, headers),
      options
    );
export const GetPostsDocument = `
    query GetPosts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      node {
        ...postAttributes
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostAttributesFragmentDoc}`;
export const useGetPostsQuery = <
      TData = GetPostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetPostsQueryVariables,
      options?: UseQueryOptions<GetPostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsQuery, TError, TData>(
      variables === undefined ? ['GetPosts'] : ['GetPosts', variables],
      fetcher<GetPostsQuery, GetPostsQueryVariables>(client, GetPostsDocument, variables, headers),
      options
    );
export const GetPostsByTopicDocument = `
    query GetPostsByTopic($first: Int, $after: String, $topic: String!) {
  postsByTopic(first: $first, after: $after, topic: $topic) {
    edges {
      node {
        ...postAttributes
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${PostAttributesFragmentDoc}`;
export const useGetPostsByTopicQuery = <
      TData = GetPostsByTopicQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetPostsByTopicQueryVariables,
      options?: UseQueryOptions<GetPostsByTopicQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetPostsByTopicQuery, TError, TData>(
      ['GetPostsByTopic', variables],
      fetcher<GetPostsByTopicQuery, GetPostsByTopicQueryVariables>(client, GetPostsByTopicDocument, variables, headers),
      options
    );
export const AddSubredditDocument = `
    mutation AddSubreddit($topic: String!) {
  insertSubreddit(topic: $topic) {
    ...subredditAttributes
  }
}
    ${SubredditAttributesFragmentDoc}`;
export const useAddSubredditMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddSubredditMutation, TError, AddSubredditMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddSubredditMutation, TError, AddSubredditMutationVariables, TContext>(
      ['AddSubreddit'],
      (variables?: AddSubredditMutationVariables) => fetcher<AddSubredditMutation, AddSubredditMutationVariables>(client, AddSubredditDocument, variables, headers)(),
      options
    );
export const GetSubredditByTopicDocument = `
    query GetSubredditByTopic($topic: String!) {
  getSubredditByTopic(topic: $topic) {
    ...subredditAttributes
  }
}
    ${SubredditAttributesFragmentDoc}`;
export const useGetSubredditByTopicQuery = <
      TData = GetSubredditByTopicQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetSubredditByTopicQueryVariables,
      options?: UseQueryOptions<GetSubredditByTopicQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSubredditByTopicQuery, TError, TData>(
      ['GetSubredditByTopic', variables],
      fetcher<GetSubredditByTopicQuery, GetSubredditByTopicQueryVariables>(client, GetSubredditByTopicDocument, variables, headers),
      options
    );
export const AddVoteDocument = `
    mutation AddVote($post_id: ID!, $upvote: Boolean!, $username: String!) {
  addVote(post_id: $post_id, upvote: $upvote, username: $username) {
    post_id
    username
    upvote
  }
}
    `;
export const useAddVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddVoteMutation, TError, AddVoteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddVoteMutation, TError, AddVoteMutationVariables, TContext>(
      ['AddVote'],
      (variables?: AddVoteMutationVariables) => fetcher<AddVoteMutation, AddVoteMutationVariables>(client, AddVoteDocument, variables, headers)(),
      options
    );
export const DeleteVoteDocument = `
    mutation DeleteVote($id: ID!) {
  deleteVote(id: $id) {
    id
    post_id
    username
  }
}
    `;
export const useDeleteVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteVoteMutation, TError, DeleteVoteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteVoteMutation, TError, DeleteVoteMutationVariables, TContext>(
      ['DeleteVote'],
      (variables?: DeleteVoteMutationVariables) => fetcher<DeleteVoteMutation, DeleteVoteMutationVariables>(client, DeleteVoteDocument, variables, headers)(),
      options
    );
export const UpdateVoteDocument = `
    mutation UpdateVote($post_id: ID!, $username: String!, $upvote: Boolean!) {
  updateVote(post_id: $post_id, username: $username, upvote: $upvote) {
    id
    upvote
    username
  }
}
    `;
export const useUpdateVoteMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateVoteMutation, TError, UpdateVoteMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateVoteMutation, TError, UpdateVoteMutationVariables, TContext>(
      ['UpdateVote'],
      (variables?: UpdateVoteMutationVariables) => fetcher<UpdateVoteMutation, UpdateVoteMutationVariables>(client, UpdateVoteDocument, variables, headers)(),
      options
    );
export const GetVotesByPostIdDocument = `
    query GetVotesByPostId($post_id: ID!) {
  getVotesByPostId(post_id: $post_id) {
    post_id
    username
    upvote
  }
}
    `;
export const useGetVotesByPostIdQuery = <
      TData = GetVotesByPostIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetVotesByPostIdQueryVariables,
      options?: UseQueryOptions<GetVotesByPostIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetVotesByPostIdQuery, TError, TData>(
      ['GetVotesByPostId', variables],
      fetcher<GetVotesByPostIdQuery, GetVotesByPostIdQueryVariables>(client, GetVotesByPostIdDocument, variables, headers),
      options
    );