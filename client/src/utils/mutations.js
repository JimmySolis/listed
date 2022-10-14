import { gql } from '@apollo/client';

export const MUTATION_LOGINUSER = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const  MUTATION_SIGNUPUSER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const  MUTATION_ADDLIST = gql`
mutation addList($listName: String!) {
    addList(listName: $listName) {
      _id
      listName
      listMaker
      createdAt
      gifts {
        _id
        giftName
        giftUrl
      }
    }
  }
`;

export const  MUTATION_ADDGIFT = gql`
mutation Mutation($giftName: String!, $giftUrl: String!) {
    addGift(giftName: $giftName, giftUrl: $giftUrl) {
      _id
      giftName
      giftUrl
    }
  }
`;

export const  MUTATION_DELETEUSER = gql`
mutation deleteUser($username: String!, $password: String!) {
    removeUser(username: $username, password: $password) {
      user {
        _id
        username
      }
    }
  }
`
export const  MUTATION_DELETELIST = gql`
mutation deleteList($listId: ID!) {
    removeList(listId: $listId) {
      listName
      _id
    }
  }
`
export const  MUTATION_DELETEGIFT = gql`
mutation deleteGift($giftId: ID!) {
    removeGift(giftId: $giftId) {
      giftName
      _id
    }
  }
`