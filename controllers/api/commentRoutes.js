const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', (req, res) => {
    // Find all comments and return as json 
    Comment.findAll({
        attributes: [
            'id',
            'comment_content',
            'post_id',
            'user_id',
            'created_at'
        ],
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Post comment 
router.post('/', withAuth, (req, res) => {
    // create comment if the session exists 
    if (req.session) {
        Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// Update a comment with id 
router.put('/:id', withAuth, (req, res) => 
    Comment.update(
        {
            where: {
                id: req.params.id
            }
        },
        {
            comment_content: req.body.comment_content,
        }
    )
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with the given id.'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
);

// Delete comment with id 
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.status(404).json({ message: 'No comment found with the given id.'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;