const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {

}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  });

module.exports = Message;