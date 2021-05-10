const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// Get all blog posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
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
    .then(dbPostData => {
        const posts = dbPostData.map(post.get({ plain: true }));
        res.render('homepage', {
            posts,
            loggedIn: req.session.logedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User goes to the login/signup page if not logged in
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


module.exports = router;