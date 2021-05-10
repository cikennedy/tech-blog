const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts -- remove withAuth

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;