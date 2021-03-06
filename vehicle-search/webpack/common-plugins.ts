import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { dependencies } from '../package.json';

const { ModuleFederationPlugin } = webpack.container;

const shared = Object.entries(dependencies).reduce((result, [key, requiredVersion]) => ({
  ...result,
  [key]: { singleton: true, eager: false, requiredVersion },
}), {});

const plugins = [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      name: 'vehicle_search',
      filename: 'remoteEntry.js',
      exposes: {
        './Details': './src/containers/details',
        './Search': './src/containers/search',
      },
      shared,
    }),
  ];

export default plugins;
