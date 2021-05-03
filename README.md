# dash-to-telegram

## What is it?
dash-to-telegram is an command line application to make the printscreen in a url that has a dashboard and send the image to a chat on the telegram.

## Installation
dash-to-telegram can be installed as a project dependency or global CLI tool:

```bash
$ [sudo] npm install dash-to-telegram [-g]
```
## Ubuntu Dependencies

```bash
sudo apt-get update
```

```bash
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm1
```

## Usage
To use this package: through the command line.

### Command Line
```bash
$ dash-to-telegram [-d] [-s] [-w] [-f] [-c] [-t] [-i]
```
### Usage

#### Examples:
```bash
  dash-to-telegram -d https://dashboard.zoho.com/open-view/809212002865sa19588
  8/0sas59d38ca209f3f63784910cfaf367af5 -s 1920 1080 -w 60000 -f screenshot -c
  good-customer -t 1705911545:AAC-M3h6K_DlyjQCCZhpFhNQljToviZ5-RY4 -i
  -560769399
```
#### Options:

```
      --version        Show version number                             [boolean]
  -h, --help           Show help                                       [boolean]
  -d, --url-dashboard  url dashboard                         [string] [required]
  -s, --img-size       image width                            [array] [required]
  -w, --wait           waiting for page loading in ms        [string] [required]
  -f, --filename       filename                              [string] [required]
  -c, --customer       customer name                         [string] [required]
  -t, --token          telegram token                        [string] [required]
  -i, --chat-id        chat id telegram                      [string] [required]
```