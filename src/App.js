import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { httpLinkUri, wsLinkUri } from './config'
import Page from './page'

const httpLink = new HttpLink({
  uri: httpLinkUri
})

const wsLink = new WebSocketLink({
  uri: wsLinkUri,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: link,
  // cache: new InMemoryCache({
  //   addTypename: false
  // }),
  request: operation => {
    operation.setContext({})
    return operation
  },
  onError: errorObj => {
    const { graphQLErrors, networkError, response, operation } = errorObj
    console.log(graphQLErrors, networkError, response, operation)
  },
  clientState: {
    resolvers: {},
    defaults: {},
    typeDefs: [''] || ''
  },
  cacheRedirects: {},
  credentials: 'same-origin'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider>
  );
}

export default App;
