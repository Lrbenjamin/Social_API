const express = require('express');
const { Thought, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
});

// PUT to update a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }
    res.json({ message: 'Thought deleted successfully!' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
});


module.exports = router;

  