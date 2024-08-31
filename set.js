const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkIrWHJMSnZUaWZHU3dZdTBmSEZZbHBiL3pwQjlNdkJFcFk1NDhESG1XND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWlTaU9Kc2k0b0tydmRITmxFN2xzTUxFRDhydHRGMnJUM1RHcmNTTnNHaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVUEIzaWNzaHB4cjlmTG5CN0daSlNoY2FLa0gyUS9ad0J5K1MvTDVWeTMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzL2tWOGFJa05VMk4xOGZUanorMUFnc2JiSXdiaTBKckY5bzJ1ZERvV2xBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJIYk80ekk5WlNiZlFyb0F0ODM5VUJaSVlGQWlkK05DN2RqUkUrNk9UMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im8rOEEreXIyVktyZ3VoTXJ0cnBQcUgzMU11MjhVRFFUeko0TWlsbC9hQTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0hXbHp6cm1FbXpETjh3Si9GMEJrbVZGa2FRcU4vbENxeDIwOEM3aDZHZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHFlN3NtSThQZnFDZURBQWdDUS9NNXpMRGQ0UVozZjNXT21KejJaMEJWZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJsOHNqMW1DV0VCWXQ1VEN4dW9hZExqTVNuUjZndVZqNGV6b2QvUHg5dEExK051MVJnZ0c0S283V1RwM0d3MVJHZ2ZCRGQwZDhlRHE3RDFtM1pKZ0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IjZ6RVUyUWNrSU1JTjhaNlZEMERwRVc3ZDdVcHlMQ25LY25VOHNPUGk2UVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1Njk2NDk3NzA5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjkwREZGNzk4NjczQTcyNkY0QkFEN0U4RjhEMzEyNjQzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjUxMTUwMDh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im9sMDlYdEM0U0ZlMXp2YTNSOXJZVHciLCJwaG9uZUlkIjoiYzlhMDYxZmUtMDc3ZC00MTg2LWJjNTAtOThlODE0ZTE1Y2RhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik91bnVNTGFxYXpjMUNaejN5UG5oaU1KQ1piaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwN0FlS0NFTENtZTFMQ1NNUkVHek1qR2NsVlU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRUFLQlo0UEMiLCJtZSI6eyJpZCI6IjI1NTY5NjQ5NzcwOTozMUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBMSBQaG90b2dyYXBoZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09EVmdad0NFT3pVekxZR0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik54N2FibWNNWGppN01LR1pBUVZ0UFFzdFBob3lzSHZPd1cyeVZKRkJESDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikk0RmhUemNsK0VqNWlLSnQxQkRGckJmcUxLMTFudGpBTk1LNlExVXhIWnE1QnlYck5LM2NoL056dElYN3E4TjQ5eHlKSTZSWU54ZGJNNk05MXMwMEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHVUZwV0ZYR2JEVWhwMjNXcGd2UlFWV085MEpRd0pEaUVFdXB4U1F6MXVuOFo3RUNlRkZZTmpWMzB0WkJwME5lVjY4NHAra3FWSWZtcHo4T3RqMEtEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY5NjQ5NzcwOTozMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUY2UybTVuREY0NHV6Q2htUUVGYlQwTExUNGFNckI3enNGdHNsU1JRUXgrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MTE1MDAzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUt0RCJ9'zokk',
    PREFIXE: process.env.PREFIX || ".",
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
