const router = require('express').Router();

// Import other route handlers
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Export the configured router
module.exports = router;
