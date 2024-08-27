const { Thought, User } = require('../models'); // Adjust path as necessary

const thoughtController = {
  // Add a new Thought
  async addThought(req, res) {
    try {
      const thought = await Thought.create({ ...req.body });
      await User.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: thought._id },
      });
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Get all Thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get a single Thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update a Thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      await User.findByIdAndUpdate(thought.username, {
        $pull: { thoughts: req.params.id },
      });
      res.json({ message: 'Thought deleted successfully!' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
