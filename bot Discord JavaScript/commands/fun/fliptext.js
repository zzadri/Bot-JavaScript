const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const flip = require('flip-text')

module.exports = {
  name: 'flip', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'flip [text]',
  examples: ['flip louliloup'],
  description: 'cette commande permet de flip un texte.',
  async run(client, message, args) {
    if (!args[0]) return message.reply("Spécifier un texte a retourné.");

    text = args.slice(0).join(' ')
    texte = flip(args.slice(0).join(' '))

    const embed = new MessageEmbed()
    .setTitle('Flip-text')
    .setThumbnail("https://play-lh.googleusercontent.com/65rw07ownw5uEWBIfM9VLWyUpkZyznMROR7J9d1aEnei1EHhi6FfGAfaVNai0UfZA1E")
    .setDescription(`message de base: ㅤㅤㅤ${text} \nmessage flip: ㅤㅤㅤㅤㅤ${texte}`)
    .setTimestamp()
    .setFooter({ 
      text: message.author.username, 
      iconURL: message.author.displayAvatarURL() 
    });
    message.channel.send({ content: ' ', embeds: [embed]})
  },
  options: [
    {
      name: 'texte',
      description: 'inscrire un texte a flip.',
      type: 'STRING',
      required: true,
    }
  ],
  async runInteraction(client, interaction) {
    const texte = interaction.options.getString('texte')

    text = flip(texte)

    const embed = new MessageEmbed()
    .setTitle('Flip-text')
    .setThumbnail("https://play-lh.googleusercontent.com/65rw07ownw5uEWBIfM9VLWyUpkZyznMROR7J9d1aEnei1EHhi6FfGAfaVNai0UfZA1E")
    .setDescription(`message de base: ㅤㅤㅤ${texte} \nmessage flip: ㅤㅤㅤㅤㅤ${text}`)
    .setTimestamp()
    .setFooter({ 
      text: interaction.user.username, 
      iconURL: interaction.user.displayAvatarURL() 
    });
    interaction.channel.send({ content: ' ', embeds: [embed], ephemeral: true})
  }
};