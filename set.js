const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID |eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkVna2ZQTVhONUZkaHo0ZEJrK25QMys2dFBDTGIxQjlkQUQyd1NBWi8wQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFBMU2xSTGxYUnRobjZtQWNBeVNxV0lOVjViZ2grUyt2anlvczVhQnlHbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RU1KRGl0YjQyQ25VZDBYWkFhNFBFeTJFK2hORmwyWWQvWnFMeTdMOEVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpM05tZTI1dGdncVE1UjNmcTIxS1RzSU4xVEFrMjc5ZzdRR0RxQ1B0TFFBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllHdGU3RVhCVVNBbVFOb0VqcUZPanNsYzNhaWhyNW5BTkxKWitmd083RnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGQ0J3ZU1nVERCY2tLNzJ1R2hoelZoSnFMQ0ZVMDBpMGc0a05XNVQ3eVE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0dKdFkwVUY5bFRhcW1QSGJla3h2MStGTm44eDNvdEppRFZ4a2RNc28yUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnpldDlQY3haRUU1ZlNMaVBBNmZ4bjBrQ3o2VjhNcUdPK00xaU5CaEhXND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijg4RUEvQmdWdDF0Qjg0anJFZEpXdUJUSWNTTUhpMnlXRm5pWkJlZjB1WEFhc21uaDlweXhYT2dHYTdlYkFuU0xyOTk4YnJmRmZPUDRFWVRkYW9id2d3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjcsImFkdlNlY3JldEtleSI6InluTE5FM0tpdFVvS3Rrc29aQ2JSelhZNnJJcHNFWlJ4QjZxTFhkckVNNHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikx6RG1qLWFoU0p1aF90WloyeHgxcFEiLCJwaG9uZUlkIjoiODFiOWRmNWQtMWE0MC00MWY4LWE3YmUtMzU3NjEzY2I4NDM1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQyMG0wZjFPVGo1S1BGOVZBdkpSeXJEOUdBQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJENWpJa041NVh6TW1nQzBjVGpPaittNUxhVFU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWTk2OUxGOVAiLCJtZSI6eyJpZCI6IjI1NTY5NjQ5NzcwOToyNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBMSBQaG90b2dyYXBoZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09EVmdad0NFTTJMd2JZR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik54N2FibWNNWGppN01LR1pBUVZ0UFFzdFBob3lzSHZPd1cyeVZKRkJESDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtNYzVPeCtqSW5WSy9weU8wbkwwVUpVbGxib2N1a3UvQWtmS3gvR2srOXBlS2ZiKy9KNXZJTUY0NnBUU3gzSGswcWVmY0ZxZ1VEVEQ3b2R3aXk4WEJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2UFQzSVl5dGNrQlpWdDFjOEdIc1ZZamZkdWNzN2JLSDljQ1lSbi93MVRULzBhS3M5WTF4YittZnRZdzdPcnduanMwZkJwYmk2SXVyT2RsOWJJYXVoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY5NjQ5NzcwOToyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUY2UybTVuREY0NHV6Q2htUUVGYlQwTExUNGFNckI3enNGdHNsU1JRUXgrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0OTI1NDAyfQ==| 'zokk',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Fredie Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255696497709,255696497709,255696497709",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'LUCKY MD V5',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/60cd0a18bda777a41ffe3.jpg,https://telegra.ph/file/bc9bf76f258c98877d993.jpg,https://telegra.ph/file/f6c60977ceb194e05e616.jpg,https://telegra.ph/file/74d7f0176b4e779dea4fd.jpg,https://telegra.ph/file/d04abf5e17b331ab46871.jpg,https://telegra.ph/file/2ab35f2759d081657d286.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'Typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
