const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Create columns and datatypes for blog posts 
Post.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_content: {
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
    },
    {
    sequelize,
    // Check to see if timestamps: true needs to be added 
    // as the blog post's date and time need to be listed 
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
    }
  );

module.exports = Post;