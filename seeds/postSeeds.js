const { Post } = require('../models');

const postData = [
  {
    post_name: 'Shirts',
  },
  {
    post_name: 'Shorts',
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;