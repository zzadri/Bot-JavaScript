const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'tempban', // nom du module
  category: 'modération',
  permissions: ['BAN_MEMBERS'],
  ownerOnly: false,
  usage: 'tempban [@member] [durée] [raison]',
  examples: ['tempban @dazurox 7 joue trop a ARK.'],
  description: 'cette commande permet de bannir temporairement une personne de votre serveur.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à tempban.");
    if (isNaN(args[1]) || !args[1] || args[1] > 7 || args[1] < 1) return message.reply("Specifier une durée à votre tempban. **(entre 1 et 7 jours)**");
    if (!args[2]) return message.reply("Specifier une raison à votre tempban.");

    const target = message.mentions.members.find(m => m.id);
    const duration = args[1];
    const reason = args.slice(2).join(' ') + (` ㅤㅤㅤㅤㅤ**${duration} jour(s) de ban**`);

    if(!target.bannable) return message.reply("Ce membre est bien plus fort que moi je ne peux pas le ban.");

    target.ban({ days: duration, reason: reason });
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été ban pour une durée de ${duration} jour(s).`)
  },
  options: [
    {
      name: 'target',
      description: 'Choisir un utilisateur pour le ban.',
      type: 'USER',
      required: true,
    },
    {
      name: 'duration',
      description: 'durée du ban',
      type: 'NUMBER',
      minValue: 1,
      maxValue: 7,
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
    const target = interaction.options.getMember('target');
    const duration = interaction.options.getNumber('duration');
    const reason = interaction.options.getString('reason');

    const raison = (`${reason} ㅤㅤㅤㅤㅤ**${duration} jour(s) de ban**`)

    if(!target.bannable) return interaction.reply("Ce membre est bien plus fort que moi je ne peux pas le ban.");

    target.ban({ days: duration, reason: raison });
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre ${target} a été ban pour une durée de ${duration} jour(s).`)
  }
};