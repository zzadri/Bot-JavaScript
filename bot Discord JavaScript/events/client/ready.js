const Logger = require('../../utils/Logger')

module.exports = {
  name: 'ready', // nom du module
  once: true, // s'execute t'il une seule foit ?
  async execute(client) {
    Logger.client('ready !');

    const devGuild = await client.guilds.cache.get('911959192745705512');
    devGuild.commands.set(client.commands.map(cmd => cmd));
  },
};