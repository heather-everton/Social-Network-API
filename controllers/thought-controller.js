const { User, Thought } = require('../models');

const thoughtController = {
    //Create thought
    createThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {_id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    
    //Read all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err=>{
            console.log(err);
            res.status(400).json(err)
        });
    },
    //Read one thought
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData=>{
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },    
    //Update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true})
        .then(dbThoughtData=> {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!'})
                return;
            }
            res.json(dbThoughtData)
        }) 
        .catch(err => res.status(400).json(err));
    },
    createReaction({params, body}, res){
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json({ message: 'No Thought found with this id!'})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought){
                return res.status(404).json({ message: 'No thought found with this id!'})
            }
            return User.findOneAndUpdate(
                {_id: deletedThought.userId},
                {$pull: { thoughts: params.thoughtId }},
                {new: true}
            );
        })
        .then(dbUserId=>{
            if(!dbUserId) {
                return res.status(404).json({messageg: 'No user found with this id'});
            }
            res.json(dbUserId);
        })
        .catch(err => res.status(400).json(err));
    },
      // remove reply
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController
