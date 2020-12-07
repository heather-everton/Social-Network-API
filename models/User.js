const {Schema, Types, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: "Please provide a valid username",
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: "Please provide an email address.",
            unique: true,
            match:  [/.+@.+\..+/, 'Please enter a valid email address.']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }  
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;