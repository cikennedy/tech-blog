const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Find blog posts by the user that is logged in
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        // Create an array for the posts and pass the posts to the dashboard handlebars template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Edit blog post by selecting the id of the blog post 
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: [
                        'username'
                    ]
                }
            },
            {
                model: User,
                attributes: [
                    'username'
                ]
            }
        ]
    })
    // Error if no blog post exists with the id 
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No blog post found with the given id.'});
            return;
        }

        // Use id-post handlebars template 
        const post = dbPostData.get({ plain: true });
        res.render('id-edit-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;
