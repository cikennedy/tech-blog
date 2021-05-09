const { User } = require('../models');

const userData = [
  {
    user_name: 'Shirts',
  },
  {
    user_name: 'Shorts',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;