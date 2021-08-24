import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import commonPlugins from './common-plugins';
import rules from './common-rules';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.normalize(path.join(__dirname, '..', 'build')),
    filename: '[name].[contenthash].js',
    publicPath: 'auto',
  },
  module: {
    rules,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    ...commonPlugins,
    new CleanWebpackPlugin(),
  ],
};

export default config;
