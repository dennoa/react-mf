# React Module Federation Example

Module federation example using React.

* `create-react-app` currently uses webpack4. Module federation requires webpack5 so need custom webpack config.
* Uses the `webpack.container.ModuleFederationPlugin` to expose a remote customer search and use it in the dashboard.
* The `dashboard` app uses searches from both the `customer_search` and `vehicle_search` apps.
