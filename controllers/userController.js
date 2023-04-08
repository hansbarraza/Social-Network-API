const { User, Thought } = require("../models");

const userController = {
    //get all users
    getUsers(req, res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err))
    },
    //get single user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate({
            path: 'thoughts',
        })
        .populate({
            path: 'friends',
        })
        .select('-__v')
        .then((user) => !user ? res.status(400).json({message: 'No user found by that Id'}) : res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            return res.status(400).json(err);
        });
    },
    //update User by id
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body} ,{new:true, runValidators:true})
        .then((user) => !user ? res.status(400).json({message: 'No user found by that Id'}) : res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    //delete a user by id
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => { !user ? res.status(400).json({message: 'No user found by that Id'}) :
        Thought.deleteMany({_id:{$in: user.thoughts}})
        .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
        .catch((err) => res.status(400).json(err));
      })
        .catch((err) => res.status(400).json(err));
  },
    //add friend to user
    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, {new: true, runValidators: true})
        .then((user) => !user ? res.status(400).json({message: 'No user found by that Id'}) : res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    //delete friend of user and update 
    deleteFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
        .then((user) => !user ? res.status(400).json({message: 'No user found by that Id'}) : res.json(user))
        .catch((err) => res.status(400).json(err));
    }
}

module.exports = userController;