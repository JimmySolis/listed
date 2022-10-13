const { AuthenticationError } = require('apollo-server-express');
const { User, List, Gift } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('lists');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('lists');
        },
        lists: async (parent, { username }) => {
            const params = username ? { username } : {};
            return List.find(params).sort({ createdA: -1 });
        },
        list: async (parent, {listId}) => {
            return List.findOne({ _id: listId });
        },
        me: async (parent, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('lists')
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async ( parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user){
                throw AuthenticationError('No user found with this email address')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentails');
            }

            const token = signToken(user);

            return { token, user};
        },
        addList: async (parent, { listName }, context) => {
            if(context.user){
                const list  = await List.create({
                    listName,
                    listMaker: context.user.username
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { lists: list._id }}
                );

                return list;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addGift: async (parent, { giftName, giftUrl }, context) => {
            if(context.user){
                const gift = await Gift.create({
                    giftName,
                    giftUrl,
                    giftMaker: context.user.username
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $addToSet: { gifts: gift._id }}
                );
                return gift;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeList: async (parent, { listId }, context) => {
            if(context.user) {
                const list = await List.findOneAndDelete({
                    _id: listId,
                    listMaker: context.user.username
                });

                await User.findByOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { lists: list._id }}
                );

                return list;
            }
            throw AuthenticationError('You need to be logged in!');
        },
        removeGift: async (parent, { giftId }, context) => {
            if(context.user){
                const gift = await Gift.findOneAndDelete({
                    _id: giftId,
                    giftMaker: context.user.username
                });

                await List.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $pull: { gifts: gift._id}}
                );

                return gift;
            }
            throw AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers