const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users can have many posts
// When a user is deleted, the associated posts are also deleted
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Users can have many comments
// When a user is deleted, the associated comments are also deleted
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Posts belong to users 
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comments belong to users 
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comments belong to users
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// Comments belong to posts
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Posts can have many comments
// When a post is deleted, the associated comments are also deleted
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };
