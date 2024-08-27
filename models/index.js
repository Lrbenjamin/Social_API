// Import each model file
const User = require('./User');
const Thought = require('./Thought');
const Reaction = require('./Reaction'); 

// Export the models so they can be imported together from other files
module.exports = {
  User,
  Thought,
  Reaction
};
