# React Module Federation Example

Module federation example using React.

* `create-react-app` currently uses webpack4. Module federation requires webpack5 so need custom webpack config.
* Uses the `webpack.container.ModuleFederationPlugin` to expose a remote customer search and use it in the dashboard.
* The `dashboard` app uses searches from both the `customer_search` and `vehicle_search` apps.

## Getting started

1. Within each of the apps, `npm i` to install the dependencies and `npm start` to run then in development mode.
1. `npm build` to build any of the apps, the `npm serve` to serve up the build artefacts.
