import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { dependencies } from '../package.json';

const { ModuleFederationPlugin } = webpack.container;

const plugins = [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      name: 'customer_search',
      filename: 'remoteEntry.js',
      exposes: {
        './Search': './src/containers/search',
      },
      shared: {
        ...dependencies,
        react: { singleton: true, eager: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, eager: true, requiredVersion: dependencies.react },
      },
    }),
  ];

export default plugins;
