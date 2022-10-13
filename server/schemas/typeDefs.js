const { gql } = require('apollo-server-express');

const typeDefs = gql `
 type User {
     _id: ID
     username: String
     email: String
     pasword: String
     lists: [List]!
  }

 type List { 
    _id: ID
    listName: String
    listMaker: String
    createdAt: String
    gifts:[Gift]!
  }

  type Gift {
    _id: ID
    giftName: String
    giftUrl: String
    giftMaker: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    lists(username: String): [List]
    list(listId: ID!): List
    me: User
  }

  type Mutation{
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addList(listName: String!): List
    addGift(giftName: String! giftUrl: String!): Gift
    removeList(listId: ID!): List
    removeGift(giftId: ID!): Gift

  }
`;

module.exports = typeDefs;