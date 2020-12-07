const {Schema, Types, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String
        },
        username: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        username: {
            type: String,
            required: "Please enter your Username.",
            trim: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: 'You need to provide an user ID!',
            trim: true
        },
        thoughtBody: {
            type: String,
            required: 'Please enter a Thought.',
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema); 
module.exports = Thought;
