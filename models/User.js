const { Schema, model } = require('mongoose');
const validator = require('validator');

// Schema to create Student model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
      getters: true,
    },
    id: false,
});
//created a virtual called friendCount that retrieves length of user's friends
    userSchema.virtual("friendCount").get(function(){
        return this.friends.length;
    });

    const User = model('User', userSchema);

    module.exports = User;
