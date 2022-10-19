# frozen_string_literal: true

#frontend servers
server 'sherlock-web-1.production.devguru.co', user: 'deploy', roles: %w[front builder]
server 'sherlock-web-2.production.devguru.co', user: 'deploy', roles: %w[front]

set :application, 'sherlock'
set :repo_url, 'git@github.com:Foodetective/Foodetective-btb-web'
set :deploy_to, -> { "/home/deploy/apps/#{fetch(:application)}" }
set :dockerfile, -> { 'docker/Dockerfile.staging' }

set :branch, 'Main'

namespace :deploy do
    def compose(cmd, role)
      "-p #{fetch(:application)} -f docker-compose-#{fetch(:stage)}.yml #{cmd}"
    end

    task :restart_all do
        on roles(:front), in: :parallel do
            within current_path do
            execute :"docker-compose", compose('up -d --force-recreate', 'front')
            end
        end
    end
    after :updated, 'sherlock-front:deploy' do
        on roles(:front), in: :parallel do
            within release_path do
              execute :"docker-compose", compose('pull', 'front')
            end
        end
        on roles(:front), in: :parallel do
            within release_path do
              ## recreate front
              execute :"docker-compose", compose('up -d --force-recreate', 'front')
            end
        end
    end
end
