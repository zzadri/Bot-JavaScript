const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const ms = require('ms');
const Converter = require('timestamp-conv');

 

module.exports = {
  name: 'giveaway', // nom du module
  category: 'utils',
  permissions: ['MANAGE_MESSAGES'],
  ownerOnly: false,
  usage: 'giveaway [nombre de gagnant] [temps] [prix]',
  examples: ['je suis un mauvais développer je n\'est pas ecrit ceci'],
  description: 'je suis un mauvais développer je n\'est pas ecrit ceci',

  async run(client, message, args) {

    if (!args[0]) return message.reply("Spécifier un nombre de gagnant.");
    if (!args[1] || !args[2]) return message.reply("Specifier une durée à votre mute.");
    if (!args[3]) return message.reply("Spécifier un prix.");

    const now = new Date().getTime();
    const numberwinner = args[0];
    const duration = args.slice(1, 3).join(' ');
    const datefix = ms(duration);
    const prix = args.slice(3).join(' ');


    const embed = new MessageEmbed()
    .setColor(process.env.MAIN_COLOR)
    .setTitle(`🎊 Giveaway 🎊`)
    .setDescription(`Prix: ${prix}\nNombre de participants ${numberwinner}\nTemps restant: ${new Converter.timestamp(datefix).formatHour}`) // regler temps
    .setTimestamp

    await message.delete()
    return message.channel.send({ embeds: [ embed ]});

  },
};