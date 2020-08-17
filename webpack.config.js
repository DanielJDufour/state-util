const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const {mode, target} = argv;

  const plugins = [];

  const externals = {
    'fs': 'fs'
  };

  const node = {
      'fs': 'empty'
  };

  return {
    entry: './src/index.js',
    mode,
    target: target,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: mode === 'production' ? `state-util.bundle.min.js` : `state-util.bundle.js`,
      globalObject: 'typeof self !== \'undefined\' ? self : this',
      library: 'state_util',
      libraryTarget: 'window',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
        },
      ],
    },
    node,
    externals,
    plugins
  };
};
