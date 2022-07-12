

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
      args: '--port=8082',
    },
    {
      name: 'app3',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      instances: 'max',
      args: '--port=8083',
    },
    {
      name: 'app4',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      instances: 'max',
      args: '--port=8084',
    },
    {
      name: 'app5',
      script: 'dist/main.js',
      watch: true,
      autorestart: true,
      instances: 'max',
      args: '--port=8085',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],
};
