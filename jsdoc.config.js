'use strict';
const { resolve } = require('path');
module.exports = {
  source: {
    include: [
      resolve('config'),
      resolve(__dirname, 'index.js'),
      resolve('db'),
      resolve('libs'),
      resolve('middlewares'),
      resolve('routes'),
      resolve('schemas'),
      resolve('services'),
      /* array of paths to files to generate documentation for */
    ],
    exclude: [
      /* array of paths to exclude */
    ],
    includePattern: '.+\\.js(doc|x)?$',
  },
  opts: {
    template: 'templates/default', // same as -t templates/default
    encoding: 'utf8', // same as -e utf8
    destination: './out/', // same as -d ./out/
    recurse: true, // same as -r
  },
  plugins: ['plugins/markdown', 'plugins/summarize'],
};
