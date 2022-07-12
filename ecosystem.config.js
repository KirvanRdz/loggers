const { max } = require("moment");

/**
 * https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps: [
    {
      name: 'app1',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      //instances: 'max',
      args: '--port=8080',
    },
    {
      name: 'app2',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      instances: 'max',
      args: '--port=8081',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],
};
