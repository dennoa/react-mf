# React Module Federation Example

Module federation example using React.

* `create-react-app` currently uses webpack4. Module federation requires webpack5 so need custom webpack config.
* Uses the `webpack.container.ModuleFederationPlugin` to expose remote customer search, property search and vehicle search components for use in the dashboard.
* The `dashboard` app uses the search components from the `customer_search`, `property_search` and `vehicle_search` apps.

## Getting started

1. Within each of the apps, `npm i` to install the dependencies and `npm start` to run then in development mode.
1. `npm build` to build any of the apps, then `npm serve` to serve up the build artefacts.
1. `customer_search` runs locally on port `3001`: <http://localhost:3001/>
1. `property_search` runs locally on port `3002`: <http://localhost:3002/>
1. `vehicle_search` runs locally on port `3003`: <http://localhost:3003/>
1. `dashboard` runs locally on port `3000`: <http://localhost:3000/>
