const { MessageEmbed } = require('discord.js');
const { getUserBanner } = require("discord-banner");
const dotenv = require('dotenv'); dotenv.config();

module.exports = {
  name: 'banner', // nom du module
  category: 'fun',
  permissions: ['SEND_MESSAGES'],
  ownerOnly: false,
  usage: 'banner <@Membre>',
  examples: ['banner @Thomas\''],
  description: 'cette commande permet d\'avoir l\'banner d\'un Membre.',
  async run(client, message, args) {

    const user = message.mentions.users.first() || message.author;

    getUserBanner(user.id, {token: process.env.Token,}).then(banner => {
      const bannier = banner.url || 'https://cdn.discordapp.com/attachments/719960352028360796/1003233481570123816/erreur-banner.png'

      //if (bannier = null) return message.reply('cette personne na pas de bannière');

      const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Avatar`)
      .setColor(process.env.MAIN_COLOR)
      .setImage(bannier)
      .setTimestamp()
      .setFooter({ 
        text: message.author.username, 
        iconURL: message.author.displayAvatarURL() 
      });

      message.channel.send({ content: ' ', embeds: [embed]})
    });

  }
};