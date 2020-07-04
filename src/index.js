require('dotenv').config({});

const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const api = require('./services/api');

const token = process.env.TOKEN || 'ERROR_NO_TOKEN_PROVIDED';

const bot = new TelegramBot(token, {
  polling: true,
});

async function getRepoFromGit(frame) {
  const response = await api.get('/orgs/google');

  return response.data;
}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  bot.sendMessage(chatId, resp);
  bot.sendMessage(chatId, 'Bem vindo ao bot de atendimento. Começe digitando: <code>Doctor</code> ', {
    parse_mode: 'HTML',
  });
});

bot.on('message', (msg) => {
  if (msg.text.toString().toLowerCase().includes('doctor')) {
    const digits = msg.text
      .toString()
      .split(':')
      .map((str) => str.trim());

    if (digits.length === 1 && digits[0].toLowerCase() === 'doctor') {
      bot.sendMessage(msg.chat.id, `Eis oque o <strong>DR</strong> pode fazer:
        <code></code>
        - Achar materiais de estudo para: <code> Python</code>, <code> JS</code>, <code> Java</code>.
        - Achar repositórios para contribuições.
        - Achar principais comunidades das linguagens acima.
      `, {
        parse_mode: 'HTML',
      });
    }
  }

  if (msg.text.toString().toLowerCase().includes('dr')) {
    const digits = msg.text
      .toString()
      .split(':')
      .map((str) => str.trim());

    if (digits.length === 2) {
      bot.sendMessage(msg.chat.id, 'Carregando informações..');

      // dr.python: learn
      // dr.python: contrib
      // dr.python: community
      const [language, method] = digits;
      const langs = language.toString().split('.').map((x) => x.trim());

      const [, lang] = langs;

      if (method.toLowerCase().includes('learn')) {
        if (lang.toLowerCase() === 'python') {
          bot.sendMessage(msg.chat.id, `Visão geral sobre Python:
          [LINK](https://www.w3schools.com/python/python_intro.asp)
          `, {
            parse_mode: 'Markdown',
          });
        }
        if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
          bot.sendMessage(msg.chat.id, `Visão geral sobre Javascript:
          [LINK](https://www.w3schools.com/js/default.asp)
          `, {
            parse_mode: 'Markdown',
          });
        }
        if (lang.toLowerCase() === 'java' || lang.toLowerCase() === 'jv') {
          bot.sendMessage(msg.chat.id, `Visão geral sobre Java:
          [LINK](https://www.w3schools.com/java/java_intro.asp)
          `, {
            parse_mode: 'Markdown',
          });
        }
      }
      if (method.toLowerCase().includes('contrib')) {
        if (lang.toLowerCase() === 'python') {
          bot.sendMessage(msg.chat.id, `Repositórios para contribuição sobre Python:
          LISTA
          `);
        }
        if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
          bot.sendMessage(msg.chat.id, `Repositórios para contribuição sobre Javascript:
          LISTA
          `);
        }
        if (lang.toLowerCase() === 'java' || lang.toLowerCase() === 'jv') {
          bot.sendMessage(msg.chat.id, `Repositórios para contribuição sobre Java:
          LISTA
          `);
        }
      }
      if (method.toLowerCase().includes('community')) {
        if (lang.toLowerCase() === 'python') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Python:
          LISTA
          `);
        }
        if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Javascript:
          LISTA
          `);
        }
        if (lang.toLowerCase() === 'java' || lang.toLowerCase() === 'jv') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Java:
          [JPF](https://www.javaprogrammingforums.com/)
          [JPF](https://www.javaprogrammingforums.com/)
          [JPF](https://www.javaprogrammingforums.com/)
          `);
        }
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes('dr.close')) {
    bot.sendMessage(msg.chat.id, 'Flw!');
  }

  const photo = path.resolve(__dirname, '..', 'assets', 'stars.svg');
  if (msg.text.toString().toLowerCase().includes('photo')) {
    bot.sendPhoto(msg.chat.id, photo);
  }
});

// https://github.com/Snailclimb/awesome-java/blob/master/README-EN.md
