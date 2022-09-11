const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sondage', // nom du module
  category: 'utils',
  permissions: ['SEND_MESSAGES'],
  description: 'Créé un sondage.',
  ownerOnly: false,
  usage: 'sondage [question]',
  examples: ['sondage 1stAlaix est-il le meilleur développeur ?'],
  async run(client, message, args) {
    if (!args[0]) return message.reply('Contenu non valide.');

    const embed = new MessageEmbed()
      .setTitle('Sondage')
      .setColor('#00a3b5')
      .setDescription(args.slice(0).join(' '))
      .setTimestamp()
      .setFooter({ text: `Nouveau sondage généré par ${message.author.tag}!`})

    const poll = await message.reply({ embeds: [embed]});
    poll.react('✅')
    poll.react('❌')
  },
  options: [
    {
      name: 'title',
      description: 'Veuillez écrire le titre de votre sondage.',
      type: 'STRING',
      required: true,
    },
    {
      name: 'content',
      description: 'Veuillez écrire le contenu de votre sondage.',
      type: 'STRING',
      required: true,
    },
  ],
  async runInteraction(client, interaction) {
    const pollTitle = interaction.options.getString('title');
    const pollContent = interaction.options.getString('content');

    const embed = new MessageEmbed()
      .setTitle(pollTitle)
      .setColor('#00a3b5')
      .setDescription(pollContent)
      .setTimestamp()
      .setFooter({ text: `Nouveau sondage généré par ${interaction.user.tag}!`})

    const poll = await interaction.reply({ embeds: [embed], fetchReply: true});
    poll.react('✅')
    poll.react('❌')
  },
};