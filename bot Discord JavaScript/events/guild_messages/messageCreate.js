const dotenv = require('dotenv'); dotenv.config();

const prefix = process.env.PREFIX;
const ownerId = process.env.OWNER_ID;

module.exports = {
  name: 'messageCreate', // nom du module
  once: false, // s'execute t'il une seule foit ?
  execute(client, message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    if (cmdName.length == 0) return;

    let cmd = client.commands.get(cmdName);
    if (!cmd) return;

    if(cmd.ownerOnly) {
      if(message.author.id != ownerId) return message.reply('La seule personne pouvant taper cette commande est l\'owner du bot!');
    }

    if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Permissions non accordé.`);

    if (cmd) cmd.run(client, message, args);
  },
};