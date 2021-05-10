const { Comment } = require('../models');

const commentData = [
  {
    comment_content: 'Great post!',
    user_id: '1',
    post_id: '1',
  },
  {
    comment_content: 'Well said!',
    user_id: '2',
    post_id: '2',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;