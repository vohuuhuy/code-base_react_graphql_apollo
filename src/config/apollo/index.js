import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink ,split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'

const httpLinkUri = process.env.REACT_APP_HTTP_END_POINT
const wsLinkUri = process.env.REACT_APP_WS_END_POINT

const httpLink = new HttpLink({
  uri: httpLinkUri
})

const subscriptionClient = new SubscriptionClient(wsLinkUri, { reconnect: true })

const wsLink = new WebSocketLink(subscriptionClient)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('tqcSocialToken');
  return {
    headers: {
      ...headers,
      authorization: token || '',
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
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

export const Client = new ApolloClient({
  link: authLink.concat(ApolloLink.from([link, errorLink])),
  cache: new InMemoryCache()
})