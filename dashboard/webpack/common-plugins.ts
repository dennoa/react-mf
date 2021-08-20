import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

const { ModuleFederationPlugin } = webpack.container;

const plugins = [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new ForkTsCheckerWebpackPlugin({ async: false }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new ModuleFederationPlugin({
      name: 'dashboard',
      remotes: {
        customer_search: 'customer_search@http://localhost:3001/remoteEntry.js',
        vehicle_search: 'vehicle_search@http://localhost:3002/remoteEntry.js',
      },
    }),
  ];

export default plugins;
