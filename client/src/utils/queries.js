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
        _id
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

export const QUERY_ME = gql`
query me {
  me {
    username
    email
    _id
    lists {
      _id
      listName
      gifts {
        _id
        giftName
        giftUrl
      }
    }
  }
}
`