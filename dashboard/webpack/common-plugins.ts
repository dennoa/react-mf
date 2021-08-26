import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { dependencies } from '../package.json';

const { ModuleFederationPlugin } = webpack.container;

const shared = Object.entries(dependencies)
  .reduce((result, [key, requiredVersion]) => ({
    ...result,
    [key]: { singleton: true, eager: false, requiredVersion },
  }), {});

const plugins = [
  new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      name: 'dashboard',
      remotes: {
        customer_search: 'customer_search@http://localhost:3001/remoteEntry.js',
        property_search: 'property_search@http://localhost:3002/remoteEntry.js',
        vehicle_search: 'vehicle_search@http://localhost:3003/remoteEntry.js',
      },
      shared,
    }),
];

export default plugins;
