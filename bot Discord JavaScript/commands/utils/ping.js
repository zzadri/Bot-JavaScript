const { MessageEmbed } = require('discord.js');


module.exports = {

  name: 'ping', // nom du module
  category: 'utils',
  permissions: ['SPEAK'],
  ownerOnly: false,
  usage: 'ping',
  examples: ['ping'],
  description: 'repond \"pong\" apres l\'execution de cette commande.',




  async run(client, message, args) {
    const tryPong = await message.channel.send("on essaye de pong... un instant!");

    const embed = new MessageEmbed()
    .setTitle('🏓 Pong!')
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
      { name: 'Latence Bot', value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true},
      { name: 'Dernier reload', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true},
    )
    .setTimestamp()
    .setFooter({ 
      text: message.author.username, 
      iconURL: message.author.displayAvatarURL() 
    });

    tryPong.edit({ content: ' ', embeds: [embed]})

  },
  async runInteraction(client, interaction) {
    const tryPong = await interaction.reply({ content: "on essaye de pong... un instant!", fetchReply: true });

    const embed = new MessageEmbed()
      .setTitle('🏓 Pong!')
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: 'Latence API', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
        { name: 'Latence Bot', value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true},
        { name: 'Dernier reload', value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true},
      )
      .setTimestamp()
      .setFooter({ 
        text: interaction.user.username, 
        iconURL: interaction.user.displayAvatarURL() 
      });

    interaction.editReply({ content: ' ', embeds: [embed]})
  },
};