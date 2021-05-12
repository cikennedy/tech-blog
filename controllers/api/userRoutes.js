const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all users 
router.get('/', (req, res) => {
    // Find all users and return as json but do not include the password data
    User.findAll({
        attributes: { exclude: ['password'] },
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one user
router.get('/:id', (req, res) => {
    // Find one user and return as json but do not include the password data
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        // Include the user's posts and comments
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_content',
                    'created_at'
                ],
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'created_at'
                ],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with the given id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// Create new user 
router.post('/', (req, res) => {
    // Creates a user with email, username, and password
    User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })
    // Save session with the user data
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
);

// User login 
router.post('/login', (req, res) => {
    // Looks for existing email address
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with the given id.'});
            return;
        }
       // check to see if the password is correct per the database 
        const correctPassword = dbUserData.checkPassword(req.body.password);
        if (!correctPassword) {
            res.status(400).json({ message: 'Incorrect Password.' })
            return;
        }

        req.session.save(() => {
                req.session.user_id = dbUserData.user_id;
                req.session.email = dbUserData.email;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: "You have been logged in." });
        });
    });
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // Removes session variables
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


// Update a user
router.put('/:id', withAuth, (req, res) => 
    User.update(req.body, {
        individualHooks: true,
            where: {
                id: req.params.id
            }
        })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with the given id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
);

// Delete a user 
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with the given id.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;