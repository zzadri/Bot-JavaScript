const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger')

module.exports = async (client) => {
  (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btnFile => {
    const btn = require(btnFile);

    if (!btn.name) return Logger.warn(`Commande non-déclenché: erreur pas de nom sur vottre boutton\nFichier -> ${btnFile}`);


    client.buttons.set(btn.name, btn);
  });
};