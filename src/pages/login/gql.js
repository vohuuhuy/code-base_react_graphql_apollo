import gql from 'graphql-tag'

const MUTATION_CREATEUSER = gql`
  mutation createUser($username: String!, $password: String!, $firstname: String!, $lastname: String!) {
    createUser(username: $username, password: $password, firstname: $firstname, lastname: $lastname) {
      username
    }
  }
`

const QUERY_LOGIN = gql`
  query login ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      token
    }
  }
`

export {
  MUTATION_CREATEUSER,
  QUERY_LOGIN
}