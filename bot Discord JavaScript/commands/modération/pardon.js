const { MessageEmbed, Discord } = require("discord.js");

module.exports = {
  name: "pardon",
  category: "modération",
  permissions: ["BAN_MEMBERS"],
  ownerOnly: false,
  usage: "unban [member_id]",
  examples: ["unban 506192629512273931"],
  description: "Débannir un utilisateur avec son id",

  async run (client, message, args) {
    if (!args[0]) return message.reply("Spécifier un membre à Unban.");
    if (args[0].length !== 18) return message.reply('Spécifier un ID valide.');

    const target = args[0];

    if (target.includes('<@!') || target.includes('<@')|| target.includes('>')) return message.reply("Spécifier juste l'id du membre à Unban. [exemple : unban 506192629512273931]");
    user = await message.guild.bans.fetch(args[0]).catch(() => {});
		if (!user) return message.channel.send('Aucun membre avec cette ID est ban.');

    message.guild.members.unban(target);
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre <@${target}> a été Unban.`)
  
  },

  options: [
    {
      name: 'membreid',
      description: 'Choisir l\'id d\'un utilisateur pour le Unban.',
      type: 'STRING',
      required: true,
    }
  ],

  async runInteraction(client, interaction) {
    const target = interaction.options.getString('membreid');

    if (target.includes('<@!') || target.includes('<@')|| target.includes('>')) return interaction.reply("Spécifier juste l'id du membre à Unban. [exemple : unban 506192629512273931]");
    user = await interaction.guild.bans.fetch(target).catch(() => {});
		if (!user) return interaction.reply('Aucun membre avec cette ID est ban.');

    interaction.guild.members.unban(target);
    const logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_MEMBER);
    logChannel.send(`Le membre <@${target}> a été Unban.`)
  }
};