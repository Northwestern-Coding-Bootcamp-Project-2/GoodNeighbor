const User = require('./User');
const Request = require('./Request');
const Message = require('./Message');
const SavedRequest = require('./SavedRequest');
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
  foreignKey: 'poster_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(User, {
  foreignKey: 'poster_id'
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

User.hasMany(SavedRequest, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

SavedRequest.belongsTo(User, {
  foreignKey: 'user_id'
});

Request.hasMany(SavedRequest, {
    foreignKey: 'request_id',
    onDelete: 'CASCADE'
  });
  
  SavedRequest.belongsTo(Request, {
    foreignKey: 'request_id'
  });
  

module.exports = { User, Message, Request, SavedRequest, Location };