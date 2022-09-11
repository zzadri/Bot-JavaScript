const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
  id: String,
  prefix: { 'type': String, 'default': "." },
  logChannel: { 'type': String, 'default': "999293941981655050" },
});

module.exports = mongoose.model('Guild', guildSchema);