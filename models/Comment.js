const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Create columns and datatypes for comments on blog posts
Comment.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'post',
          key: 'id'
        },
    },
    },
    {
    sequelize,
    // Check to see if timestamps: true needs to be added 
    // as the comment's date and time need to be listed 
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
    }
  );

module.exports = Comment;