const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'kick', // nom du module
  category: 'modération',
  permissions: ['KICK_MEMBERS'],
  ownerOnly: false,
  usage: 'kick [@target] [message]',
  examples: ['kick', 'kick @Fafin', 'kick @Fafin il est trop beau.'],
  description: 'cette commande permet d\'expulser une personne de votre serveur.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à kick.");
    if (!args[1]) return message.reply("Specifier une raison à votre kick.");

    const target = message.mentions.members.find(m => m.id)
    const reason = args.slice(1).join(' ');

    if(!target.kickable) return message.reply("Ce membre est bien plus fort que moi je ne peux pas le kick.");

    target.kick(reason);
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été kick.`)
  },
  options: [
    {
      name: 'target',
      description: 'Choisir un utilisateur pour le kick.',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'Choisir une raison pour kick l\'utilisateur.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember('target')
    const reason = interaction.options.getString('reason')

    if(!target.kickable) return interaction.reply("Ce membre est bien plus fort que moi je ne peux pas le kick.");

    target.kick(reason);
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été kick.`)
  }
};