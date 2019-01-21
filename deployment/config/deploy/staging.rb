server 'sherlock.staging.devguru.co', user: 'deploy', roles: %w[app web]
set :branch, 'staging-deployment'
set :dockerfile, -> { 'docker/Dockerfile.staging' }
set :capose_commands, -> {
  [
    'build',
    'up -d',
  ]
}
