const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getThoughts(req, res) {
            Thought.find({})
                .then((thoughts) => res.json(thoughts))
                .catch((err) => res.status(400).json(err))
    },
    //get single thought by Id
    getSingleThought(req, res) {
        User.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then((thoughtId) => !thoughtId ? res.status(400).json({message: 'No thought found by that Id'}) : res.json(thoughtId))
        .catch((err) => res.status(400).json(err));
    },
    //add a thought and push thoughts Id to user thoughts array
    addThought(req, res) {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({_id: body.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then((thoughtId) => !thoughtId ? res.status(400).json({message: 'No thought found by that Id'}) : res.json(thoughtId))
        .catch((err) => res.json(err))
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id:params.thoughtId}, {$set: req.body}, {runValidators:true, new:true})
        .then((updatedThought) => !updatedThought ? res.status(400).json({message: 'No thought found by that Id'}) : res.json(updatedThought))
        .catch((err) => res.status(400).json(err))
    },
    //delete thought and update users thought array
    deleteThought(req, res) {
        Thought.findByIdAndDelete({_id:params.thoughtId})
        .then((thought) => !thought ? res.status(400).json({message: 'No thought found by that Id'}) : User.findOneAndUpdate({thought: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true}))
        .then((updatedUser) => !updatedUser ? res.status(400).json({message: 'Thought was deleted but no user found'}) : res.json(updatedUser))
        .catch((err) => res.status(400).json(err))
    },
    // add a reaction to the single thought array
    addReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToset: {reactions: req.body}}, {runValidators: true, new:true})
        .then((reaction) => !reaction ? res.status(400).json({message: 'No thought by that id to add reaction to.'}) : res.json(reaction))
        .catch((err) => res.status(400).json(err))
    },
    //delete reaction by the reaction id value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions:{reactionId: req.params.reactionId}}}, {runValidators:true, new:true})
        .then((updatedthought) => !updatedthought ? res.status(400).json({message:'No thought by that id'}) : res.json((updatedthought)))
        .catch((err) => res.status(400).json(err))
    }
}

module.exports = thoughtController;