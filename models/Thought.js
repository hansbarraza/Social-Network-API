const { ObjectID } = require('bson');
const { Schema, model } = require('mongoose');

//reaction schema in thought model
const reactionSchema = new Schema ({
    reactionId: {
        type: ObjectID,
        default: () => new ObjectID()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: currentDate => Date.now
    }
});

//schema to create thought model
const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: currentDate => Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
},
{
    toJson: {
        virtuals: true,
        getters: true
    },
    id: false
});




//created a virtual called reactionCount that retrieves length from reactions array 
thoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;