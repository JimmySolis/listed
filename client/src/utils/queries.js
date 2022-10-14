import { gql } from '@apollo/client';

export const QUERY_ALLUSER = gql`
query allUsers {
  users {
    username
    email
    _id
  }
}
`

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
      username
      email
      lists {
        listName
        listMaker
        createdAt
        gifts {
          _id
          giftName
          giftUrl
          giftMaker
          createdAt
        }
      }
    }
  }
`