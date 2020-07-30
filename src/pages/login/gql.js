import gql from 'graphql-tag'

export const MUTATION_LOGIN = gql`
  mutation ($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      authorization
      user {
        _id
      }
    }
  }
`

export const MUTATION_REGISTER = gql`
  mutation ($inputUser: InputUser!) {
    register(inputUser: $inputUser) {
      _id
      userName
    }
  }
`
