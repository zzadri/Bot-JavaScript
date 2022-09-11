const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs')
const commandFolder = readdirSync('./commands')
const dotenv = require('dotenv'); dotenv.config();

const prefix = process.env.PREFIX;


const contextDesc = {
  userinfo: 'Renvoie des informations dur l\'utilisateur.'
}

module.exports = {
  name: 'help', // nom du module
  category: 'utils',
  permissions: ['SEND_MESSAGES'],
  description: 'Renvoie une liste avec toute les commandes.',
  ownerOnly: false,
  usage: 'help <commande>',
  examples: ['help', 'help ping'],
  async run(client, message, args) {
    if (!args.length) {
      const noArgsEmbed = new MessageEmbed()
        .setColor(process.env.INFO_COLOR)
        .addField('Liste des commands', `Une liste des toutes les catégories disponibles et leurs commandes. \n por plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

      for (const category of commandFolder) {
        noArgsEmbed.addField(
          `${category.replace(/(^\w|\s\w)/g, fistLetter => fistLetter.toUpperCase())}`,
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
        );
      }

      return message.channel.send({ embeds: [ noArgsEmbed ]});
    }


    const cmd = client.commands.get(args[0]);
    if (!cmd) return message.reply('cette commande n\'existe pas');

    const argsEmbed = new MessageEmbed()
      .setColor(process.env.INFO_COLOR)
      .setTitle('Commande: ' + `${cmd.name.replace(/(^\w|\s\w)/g, fistLetter => fistLetter.toUpperCase())}`)
      .addFields(
        { name: 'Description:', value: `${cmd.description ? cmd.description : contextDesc[`${cmd.name}`]}`},
        { name: 'OwnerOnly', value: `${cmd.ownerOnly ? '✅' : '❌'}`},
        { name: 'Utilisation:', value: `${prefix}${cmd.usage}`},
        { name: 'Exemples: ', value: `${prefix}${cmd.examples.join(` \n${prefix}`)}`},
      )
      .setFooter({ text: `Permission(s) requise(s): ${cmd.permissions.join(', ')}` });

    return message.channel.send({ embeds: [ argsEmbed ]});  


    //    return message.channel.send(`
    //\`\`\`makefile
    //[Help: Commande -> ${cmd.name}] ${cmd.ownerOnly ? 'Cette commande a une utilisation reservé au administrateur du Bot' : ''}  
    //
    //${cmd.description ? cmd.description : contextDesc[`${cmd.name}`]}
    //
    //Permissions: ${cmd.permissions.join(', ')}
    //Utilisation: ${prefix}${cmd.usage}
    //Exemples: ${prefix}${cmd.examples.join(` | ${prefix}`)}
    //
    //---
    //
    //${prefix} = prefix utiliser pour le bot | les /commands sont aussi disponibles
    //les \'{}\' sont des sous-commande(s) | les \'[]\' sont des option(s) obligatoire(s) | les \'<>\' sont des option(s) optionnel(s)
    //Il ne faut pas inclure ces caractères -> {}, [] ou <> dans vos commandes.
    //\`\`\``);





  },
  options: [
    {
      name: 'command',
      description: 'Veuillez écrire la commande.',
      type: 'STRING',
      required: false,
    }
  ],
  async runInteraction(client, interaction) {
    const cmdName = interaction.options.getString('command');

    if (!cmdName) {
      const noArgsEmbed = new MessageEmbed()
        .setColor(process.env.INFO_COLOR)
        .addField('Liste des commands', `Une liste des toutes les catégories disponibles et leurs commandes. \n por plus d'informations sur une commande, tapez \`${prefix}help <command>\``)

      for (const category of commandFolder) {
        noArgsEmbed.addField(
          `${category.replace(/(^\w|\s\w)/g, fistLetter => fistLetter.toUpperCase())}`,
          `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
        );
      }

      return interaction.reply({ embeds: [ noArgsEmbed ], ephemeral: true});
    }


    const cmd = client.commands.get(cmdName);
    if (!cmd) return interaction.reply({content:'cette commande n\'existe pas', ephemeral: true});

    const argsEmbed = new MessageEmbed()

      .setColor(process.env.INFO_COLOR)
      .setTitle('Commande: ' + `${cmd.name.replace(/(^\w|\s\w)/g, fistLetter => fistLetter.toUpperCase())}`)
      .addFields(
        { name: 'Description:', value: `${cmd.description}`},
        { name: 'Utilisation:', value: `${prefix}${cmd.usage}`},
        { name: 'Exemples: ', value: `${prefix}${cmd.examples.join(` | ${prefix}`)}`},
      )
      .setFooter({ text: `Permission(s) requise(s): ${cmd.permissions.join(', ')}` });

    return interaction.reply({ embeds: [ argsEmbed ], ephemeral: true});





  }
};