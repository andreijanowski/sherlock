# frozen_string_literal: true

lock '3.9.0'

set :application, 'sherlock'
set :repo_url, 'git@github.com:netguru/sherlock.git'
set :deploy_to, -> { "/home/deploy/apps/#{fetch(:application)}" }
