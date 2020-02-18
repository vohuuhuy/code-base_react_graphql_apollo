import gql from 'graphql-tag'

const MUTATION_CREATEUSER = gql`
  mutation createUser($username: String!, $password: String!, $firstname: String!, $lastname: String!) {
    createUser(username: $username, password: $password, firstname: $firstname, lastname: $lastname) {
      username
    }
  }
`

export {
  MUTATION_CREATEUSER
}