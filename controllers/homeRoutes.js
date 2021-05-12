const router = require('express').Router();
const { User, Post, Comment } = require('../models');


// Get all blog posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        // Order blog posts from newest post to oldest
        order: [[ 'created_at', 'DESC']],
        // Include the below attributes from the Post table
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        // Include the user's username 
        include: [
            {
                model: User,
                attributes: [
                    'username'
                ]
            },
            // Include all comments 
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
            },
        ]
    })
    .then(dbPostData => {
        // Create an array for the posts and pass the posts to the homepage handlebars template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
            posts, loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one blog post by id
router.get('/post/:id', (req, res) => {
    // Find one post by the id parameter 
    Post.findOne({
        where: {
            id: req.params.id
        },
        // Same as the get all posts route above 
        attributes: [
            'id',
            'title',
            'post_content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: [
                    'username'
                ]
            },
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
            }

        ]
    })

    // Return error if there is no blog post with the id given 
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No blog post found with the given id.'});
            return;
        }

        // Render data to id-post handlebars template 
        const post = dbPostData.get({ plain: true });
        res.render('id-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User goes to the login/signup page if not logged in
router.get('/login', (req, res) => {
    // If a user is logged in, redirect the request to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


module.exports = router;