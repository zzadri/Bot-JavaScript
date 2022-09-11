const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const ms = require('ms');


module.exports = {
  name: 'mute', // nom du module
  category: 'modération',
  permissions: ['MODERATE_MEMBERS'],
  ownerOnly: false,
  usage: 'mute [@member] [durée] [raison]',
  examples: ['mute @zzAdri 5 seconds car c\'est la vie.', 'mute @zzAdri 5 minutes test.', 'mute @zzAdri 5 hours procommu.', 'mute @zzAdri 5 days trop bien.'],
  description: 'cette commande permet de mute temporairement une personne de votre serveur.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à mute.");
    if (!args[1] || !args[2]) return message.reply("Specifier une durée à votre mute.");
    if (!args[3]) return message.reply("Specifier une raison à votre mute.");

    const target = message.mentions.members.find(m => m.id);
    const duration = args.slice(1, 3).join(' ');
    const convertedTime = ms(duration);
    const reason = args.slice(3).join(' ');

    if(!target.moderatable) return message.reply("Ce membre est bien plus fort que moi je ne peux pas le mute.");
    if(!convertedTime) return interaction.reply('Spécifier une durée valable !');

    target.timeout(convertedTime, reason);
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été mute pour une durée de ${duration}.`)
  },
  options: [
    {
      name: 'target',
      description: 'Choisir un utilisateur pour le mute.',
      type: 'USER',
      required: true,
    },
    {
      name: 'duration',
      description: 'durée du mute (example: 5 days) la durée doit être en anglais.',
      type: 'STRING',
      required: true,
    },
    {
      name: 'reason',
      description: 'Choisir une raison pour mute l\'utilisateur.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getString('duration');
    const convertedTime = ms(duration);
    const reason = interaction.options.getString('reason');


    if(!target.moderatable) return interaction.reply("Ce membre est bien plus fort que moi je ne peux pas le mute.");
    if(!convertedTime) return interaction.reply('Spécifier une durée valable !');

    target.timeout(convertedTime, reason);
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été mute pour une durée de ${duration}.`)
  }
};