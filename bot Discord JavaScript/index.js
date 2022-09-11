const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const client = new Client({ intents: 3243773 }); //https://discord-intents-calculator.vercel.app/
const Logger = require('./utils/Logger');

['commands', 'buttons'].forEach(x => client[x] = new Collection());

['CommandUtil','EventUtil', 'ButtonUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}`) });

process.on('uncaughtException', (err, origin) => { 
  Logger.error(`UNCAUGHT_EXCEPTION: ${err}`);
  console.error(`Origine: ${origin}`) 
});

process.on('unhandledRejection', (reason, promise) => { 
  Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
  console.log(promise)
});

process.on('warning', (...args) => Logger.warn(...args));

mongoose.connect(process.env.DATABASE_URI, {
  autoIndex: false, 
  maxPoolSize: 10, 
  serverSelectionTimeoutMS: 5000, 
  socketTimeoutMS: 45000, 
  family: 4 
}).then(() => { Logger.client('Database on.'); })
.catch(err => { Logger.error(err); });

client.login(process.env.Token);