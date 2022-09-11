const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'ban', // nom du module
  category: 'modération',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'ban [@target] [message]',
  examples: ['ban', 'ban @nolimit', 'ban @nolimit trop petit.'],
  description: 'cette commande permet de bannir définitivement une personne de votre serveur.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à ban.");
    if (!args[1]) return message.reply("Specifier une raison à votre ban.");

    const target = message.mentions.members.find(m => m.id)
    const reason = args.slice(1).join(' ');

    if(!target.bannable) return message.reply("Ce membre est bien plus fort que moi je ne peux pas le ban.");

    target.ban({ reason });
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été ban.`)
  },
  options: [
    {
      name: 'target',
      description: 'Choisir un utilisateur pour le ban.',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'Choisir une raison pour ban l\'utilisateur.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember('target')
    const reason = interaction.options.getString('reason')

    if(!target.bannable) return interaction.reply("Ce membre est bien plus fort que moi je ne peux pas le ban.");

    target.ban({ reason });
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été ban.`)
  }
};