module.exports = {
  apps: [
    {
      name: 'PBA-C',
      port: '9001',
      exec_mode: 'cluster',
      instances: '1',
      script: 'yarn build && ./.output/server/index.mjs',
    },
  ],
}
