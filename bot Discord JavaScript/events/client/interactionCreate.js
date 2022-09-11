module.exports = {
  name: 'interactionCreate', // nom du module
  once: false, // s'execute t'il une seule foit ?
  async execute(client, interaction) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return;

      if(cmd.ownerOnly) {
        if(interaction.user.id != ownerId) return message.reply('La seule personne pouvant taper cette commande est l\'owner du bot!');
      }

      if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({ content: `Permissions non accordé.`, ephemeral: true});

      cmd.runInteraction(client, interaction);
    } else if (interaction.isButton()) {
      const btn = client.buttons.get(interaction.customId);
      if (!btn) return interaction.reply('Ce bouton n\'existe pas.')

      btn.runInteraction(client, interaction);
    }
  },
};