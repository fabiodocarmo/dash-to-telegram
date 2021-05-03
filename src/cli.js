const telegramBotApi = require("telegram-bot-api");
const puppeteer = require('puppeteer');
const fs = require('fs');
const ora = require('ora');

const spinnerPuppeteer = new ora({
  discardStdin: false,
  text: 'Trying to capture dashboard image'
});

spinnerPuppeteer.start();

const spinnerTelegram = new ora({
  discardStdin: false,
  text: 'Trying to send dasboard image to telegram chat'
});

export function cli(args) {
  var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .example('$0 -d https://dashboard.zoho.com/open-view/809212002865sa195888/0sas59d38ca209f3f63784910cfaf367af5 -s 1920 1080 -w 60000 -f screenshot -c good-customer -t 1705911545:AAC-M3h6K_DlyjQCCZhpFhNQljToviZ5-RY4 -i -560769399')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2021')
    .options({
      'url-dashboard': {
        alias: 'd',
        describe: 'url dashboard',
        demandOption: true,
        type: 'string'
      },
      'img-size': {
        alias: 's',
        describe: 'image width',
        demandOption: true,
        array: true,
        type: 'array'
      },
      'wait': {
        alias: 'w',
        describe: 'waiting for page loading in ms',
        demandOption: true,
        type: 'string'
      },
      'filename': {
        alias: 'f',
        describe: 'filename',
        demandOption: true,
        type: 'string'
      },
      'customer': {
        alias: 'c',
        describe: 'customer name',
        demandOption: true,
        type: 'string'
      },
      'token': {
        alias: 't',
        describe: 'telegram token',
        demandOption: true,
        type: 'string'
      },
      'chat-id': {
        alias: 'i',
        describe: 'chat id telegram',
        demandOption: true,
        type: 'string'
      }
  }).argv;
  
  const filename = '.' + argv.c + '-' + argv.f + '.png';

  (async function() {
    try {
      const browser = await puppeteer.launch({args: ['--no-sandbox']});
      const page = await browser.newPage();
      const waitForNavigation = page.waitForNavigation();
      await page.setViewport({width: argv.s[0], height: argv.s[1]});
      await page.goto(argv.d, {waitUntil: "networkidle0", timeout: argv.w});
      await waitForNavigation;
      await page.screenshot({path: filename, type: "png", fullPage: true});
      await page.close();
      await browser.close();
      spinnerPuppeteer.succeed('Captured dashboard image');
    } catch (error) {
      spinnerPuppeteer.fail('Error capturing image from dashboard');
      console.error(error);
      process.exit(1);
    }
  })().then(() => {
    spinnerTelegram.start();
    const api = new telegramBotApi({ token: argv.t });
    api.sendPhoto({
      chat_id: argv.i,
      caption: 'Dados do dashboard ' + argv.c + '. Veja mais em: ' + argv.d,
      photo: fs.createReadStream(filename)
    }).then(() => {
      spinnerTelegram.succeed('Dashboard image sent to the telegram chat');
      
      fs.unlink(filename, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }).catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }).catch(console.error);
}