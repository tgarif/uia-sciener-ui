module.exports = {
  apps: [
    {
      name: 'Frontend',
      script: 'yarn',
      args: 'serve --port 3000 --host',
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
