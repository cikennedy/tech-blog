const { Comment } = require('../models');

const commentData = [
  {
    comment_name: 'Shirts',
  },
  {
    comment_name: 'Shorts',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;