import React, { useState } from 'react'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { httpLinkUri, wsLinkUri } from './config'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { checkTypeDevice } from './common'
import PageDesktop from './pageDesktop'
import PageMobile from './pageMobile'

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
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

function App() {
  const [typeDevice] = useState(checkTypeDevice())
  if (typeDevice === 'desktop') {
    return (
      <ApolloProvider client={client}>
        <PageDesktop />
      </ApolloProvider>
    )
  }
  return (
    <ApolloProvider client={client}>
        <PageMobile />
    </ApolloProvider>
  )
}

export default App
