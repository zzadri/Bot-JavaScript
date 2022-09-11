const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'unmute', // nom du module
  category: 'modération',
  permissions: ['MODERATE_MEMBERS'],
  ownerOnly: false,
  usage: 'mute [@member]',
  examples: ['unmute @zzAdri '],
  description: 'cette commande permet de unmute une personne qui a été mute.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à unmute.");

    const target = message.mentions.members.find(m => m.id);

    if(!target.isCommunicationDisabled()) return message.reply("Ce membre ne peux pas être unmute car il n\'est pas mute.");

    target.timeout(null);
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été unmute.`)
  },
  options: [
    {
      name: 'target',
      description: 'Choisir un utilisateur pour le mute.',
      type: 'USER',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember('target');

    if(!target.isCommunicationDisabled()) return message.reply("Ce membre ne peux pas être unmute car il n\'est pas mute.");

    target.timeout(null);
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été unmute.`)
  }
};