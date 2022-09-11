const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();


module.exports = {
  name: 'avatar', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'avatar [@Membre]',
  examples: ['avatar @Thomas\''],
  description: 'cette commande permet d\'avoir l\'avatar d\'un Membre.',
  async run(client, message, args) {

    const user = message.mentions.users.first() || message.author;

    const embed = new MessageEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setColor(process.env.MAIN_COLOR)
    .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
    .setTimestamp()
    .setFooter({ 
      text: message.author.username, 
      iconURL: message.author.displayAvatarURL() 
    });

    message.channel.send({ content: ' ', embeds: [embed]})
  }
};