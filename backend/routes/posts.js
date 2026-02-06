const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Invalid file upload' });
    }
    next();
  });
}, createPost);
router.delete('/:id', auth, deletePost);

module.exports = router;
