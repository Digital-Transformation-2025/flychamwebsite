module.exports = {
  apps: [
    {
      name: 'flyweb',
      script: 'npm',
      args: 'start',
      env: {
        NEXT_PUBLIC_API_BASE_URL: 'https://flycham.com',
        NODE_ENV: 'production'
      }
    }
  ]
}
