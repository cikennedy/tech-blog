const { Post } = require('../models');

const postData = [
    {
        title: 'My first post',
        post_content: 'Excited to blog!',
        user_id: '2',
    },
    {
        title: 'Trying out the blog',
        post_content: 'Hello everyone!',
        user_id: '1',
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;