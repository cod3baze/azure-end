/* eslint-disable camelcase */
require('dotenv').config({});

const TelegramBot = require('node-telegram-bot-api');
const getRepoFromGit = require('./main');

const token = process.env.TOKEN || 'ERROR_NO_TOKEN_PROVIDED';

const bot = new TelegramBot(token, {
  polling: true,
});

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
        1 Achar materiais de estudo para: <code> Python</code>, <code> JS</code>, <code> Java</code>.
        2 Achar repositórios para contribuições.
        3 Achar principais comunidades das linguagens acima.
      `, {
        parse_mode: 'HTML',
      });
    }
  }

  if (msg.text.toString().toLowerCase().includes('how')) {
    const digits = msg.text
      .toString()
      .split(' ')
      .map((str) => str.trim());

    if (digits.length === 2 && digits[1].toLowerCase() === 'to') {
      bot.sendMessage(msg.chat.id, `Digite:
        1 <code>dr.python: learn</code>
        2 <code>dr.java: contrib</code>
        3 <code>dr.javascript: community</code>
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
      // dr.python: learn
      // dr.python: contrib
      // dr.python: community
      const [language, method] = digits;
      const langs = language.toString().split('.').map((x) => x.trim());

      const [, lang] = langs;

      if (method.toLowerCase().includes('learn')) {
        if (lang.toLowerCase() === 'python' || lang.toLowerCase() === 'py') {
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
        if (lang.toLowerCase() === 'python' || lang.toLowerCase() === 'py') {
          bot.sendMessage(msg.chat.id, 'Repositórios para contribuições sobre Python:');
          getRepoFromGit('python').then((res) => {
            bot.sendMessage(msg.chat.id, `${res}`, {
              parse_mode: 'Markdown',
            });
          }).catch((err) => bot.sendMessage(err.message));
        }
        if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
          bot.sendMessage(msg.chat.id, 'Repositórios para contribuições sobre Javascript:');
          getRepoFromGit('js').then((res) => {
            bot.sendMessage(msg.chat.id, `${res}`, {
              parse_mode: 'Markdown',
            });
          }).catch((err) => bot.sendMessage(err.message));
        }
        if (lang.toLowerCase() === 'java' || lang.toLowerCase() === 'jv') {
          bot.sendMessage(msg.chat.id, 'Repositórios para contribuições sobre Java:');
          getRepoFromGit('java').then((res) => {
            bot.sendMessage(msg.chat.id, `${res}`, {
              parse_mode: 'Markdown',
            });
          }).catch((err) => bot.sendMessage(err.message));
        }
      }
      if (method.toLowerCase().includes('community')) {
        if (lang.toLowerCase() === 'python' || lang.toLowerCase() === 'py') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Python:
          [DYS](https://discord.com/channels/267624335836053506/267631170882240512)
          [CNL](https://discord.com/channels/327254708534116352/330410763594498050)
          [CODE](https://discord.com/channels/174075418410876928/184610906615840768)
          `, {
            parse_mode: 'Markdown',
          });
        }
        if (lang.toLowerCase() === 'javascript' || lang.toLowerCase() === 'js') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Javascript:
          [ROCKET](https://discord.com/channels/705772178561564672/719367926175629373)
          [JS-HUB](https://discord.com/channels/268970339948691456/385921610110074881)
          [CODE](https://discord.com/channels/174075418410876928/184610906615840768)
          `, {
            parse_mode: 'Markdown',
          });
        }
        if (lang.toLowerCase() === 'java' || lang.toLowerCase() === 'jv') {
          bot.sendMessage(msg.chat.id, `Principais comunidades sobre Java:
          [VOXXED](https://beta.voxxeddays.com/#/)
          [TECH](https://www.reddit.com/r/java/new/)
          [JPF](https://www.javaprogrammingforums.com/)
          `, {
            parse_mode: 'Markdown',
          });
        }
      }
    }
  }

  if (msg.text.toString().toLowerCase().includes('dr.close')) {
    bot.sendMessage(msg.chat.id, 'Flw! ❤❣');
    bot.closeWebHook();
  }
});

// https://github.com/Snailclimb/awesome-java/blob/master/README-EN.md
