const User = require('./User');
const Request = require('./Request');
const Message = require('./Message');
const StarredRequest = require('./StarredRequest');
const Location = require('./Location');

Location.hasMany(User, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Location, {
  foreignKey: 'location_id'
});

Location.hasMany(Request, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(Location, {
  foreignKey: 'location_id'
});

User.hasMany(Request, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Message, {
  foreignKey: 'sender_id',
  onDelete: 'CASCADE'
});

Message.belongsTo(User, {
  foreignKey: 'sender_id'
});

User.hasMany(Message, {
  foreignKey: 'recipient_id',
  onDelete: 'CASCADE'
});

Message.belongsTo(User, {
  foreignKey: 'recipient_id'
});

User.hasMany(StarredRequest, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

StarredRequest.belongsTo(User, {
  foreignKey: 'user_id'
});

Location.hasMany(StarredRequest, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
  });
  
  StarredRequest.belongsTo(Location, {
    foreignKey: 'location_id'
  });
  

module.exports = { User, Message, Request, StarredRequest, Location };