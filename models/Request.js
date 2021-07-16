const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Request.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    poster_id: {
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
      
    },
      );

module.exports = Request;