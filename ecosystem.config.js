module.exports = {
  apps: [
    {
      name: 'PBA-C',
      port: '9001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
