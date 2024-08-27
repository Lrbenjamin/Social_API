const express = require('express');
const { addThought, getAllThoughts, getThoughtById, updateThought, deleteThought } = require('../controllers/thoughtController'); // Adjust path as necessary

const router = express.Router();

router.route('/').post(addThought).get(getAllThoughts);
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

module.exports = router;

// POST to create a reaction stored in a thought's reactions field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $push: { reactions: req.body },
      }, { new: true });
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  // DELETE a reaction
  router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: { reactions: { reactionId: req.params.reactionId } },
      }, { new: true });
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json(error);
    }
  });
  