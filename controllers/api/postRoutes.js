const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts 
router.get('/', (req, res) => {
    // Same as home route, but returning data as json 
    Post.findAll({
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one blog post by id
router.get('/:id', (req, res) => {
    // Same as home route, but returning as json
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
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create new blog post 
router.post('/', withAuth, (req, res) => {
    // Creates a post with the title, content, and user id
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a blog post by id
router.put('/:id', withAuth, (req, res) => 
    // User can update the title and blog post content as long as logged in
    Post.update(
        {
            title: req.body.title,
            post_content: req.body.post_content,
        },
        {
            where: {
                id: req.params.id
            }
        },
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No blog post found with the given id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
);

// Delete a blog post by id 
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No blog post found with the given id.'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;