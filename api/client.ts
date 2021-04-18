import {
  ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat,
} from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_X_ENDPOINT });

const authMiddleware = new ApolloLink((operation, forward) => {
  if (typeof window !== 'undefined') {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
