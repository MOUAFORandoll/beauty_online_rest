// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'nest-api',
      script: 'dist/main.js',
      instances: 1, // ou 'max' pour cluster mode
      exec_mode: 'fork', // ou 'cluster'
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
