const sequelize = require('../config/connection');
const { User, Location, Message,  Request } = require('../models');

const userData = require('./userData.json');
const messageData = require('./messageData.json');
const requestData = require('./requestData.json');
const locationData = require('./locationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await Location.bulkCreate(locationData, {
      returning: true,
    })
    .then( User.bulkCreate(userData, {
    // individualHooks: true,
    returning: true,})
    .then( Message.bulkCreate(messageData, {
      returning: true,
    }))
    .then( Request.bulkCreate(requestData, {
      returning: true,
    })));

  process.exit(0);
};

seedDatabase();