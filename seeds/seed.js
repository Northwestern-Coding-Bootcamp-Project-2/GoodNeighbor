const sequelize = require('../config/connection');
const { User, Location, Message,  Request, StarredRequest } = require('../models');

const userData = require('./userData.json');
const locationData = require('./locationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const Location of locationData) {
    await Location.bulkcreate({
      ...Location,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();