# rackcat

a node/[Sails](http://sailsjs.org) powered Data Center asset tracking application that exposes a full REST API, comes with a responsive mobile friendly web interface.

This is definitely a work in progress.

## Installation
Until the front-end is compiled into `dist/` you need to follow the Development Installation guide unfortunately. Once the front end is a bit more stable i'll add
in steps to install without all the development dependency bloat.

## Development Installation

```shell
npm install -g bower grunt-cli sails mocha;
git clone https://github.com/mikedevita/rackcat;
cd rackcat && npm install && cd assets && bower install;
```

edit `config/local.example.js` and rename it to `config/local.js`

visit `http://localhost:1337` and start hacking away.

To run tests, run `npm test` or `mocha -R spec -b --recursive --timeout 5000` from the rackcat folder.
