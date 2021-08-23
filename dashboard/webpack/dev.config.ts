import path from 'path';
import webpack from 'webpack';

import commonPlugins from './common-plugins';
import rules from './common-rules';

const config = {
  mode: 'development',
  output: {
    publicPath: 'auto',
  },
  entry: './src/index',
  module: {
    rules,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    ...commonPlugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.normalize(path.join(__dirname, '..', 'build')),
    historyApiFallback: true,
    port: 3000,
    open: false,
    hot: true
  },
};

export default config;
