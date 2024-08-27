const express = require('express');
const { User, Thought } = require('../models');

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// PUT to update a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET a single user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a user and their associated thoughts
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    await user.remove();
    res.json({ message: 'User and associated thoughts deleted successfully!' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
