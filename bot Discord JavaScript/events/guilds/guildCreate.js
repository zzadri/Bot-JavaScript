const { Guild } = require('../../models/index');
const Logger = require('../../utils/Logger')

module.exports = {
  name: 'guildCreate', // nom du module
  once: false, // s'execute t'il une seule foit ?
  async execute(client, guild) {
    const createGuild = await new Guild({ id: guild.id });
    createGuild.save().then(g => Logger.client(`Nouveau serveur (${g.id})`));
  }
};

