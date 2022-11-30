// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");

require("dotenv").config();

module.exports = {
  compiler: {
    styledComponents: true
  },
  sentry: {
    hideSourceMaps: true,
    autoInstrumentServerFunctions: true
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    if (!isServer) config.resolve.fallback.fs = false;

    return config;
  }
};
