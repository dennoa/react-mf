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

## Notes

1. Seems to require eager fetching of dependencies to make this work. Not sure what that means for chunking requirements, but I notice that each of the apps produces large chunks instead of multiple smaller ones. Needs more investigation.
1. Make use of the singleton option for shared libraries since many cannot handle having multiple instances (react-dom and styled-components for example).
1. Changes to remote chunks are reloaded on dashboard page refresh. Serve the production build of all apps, then change rebuild and redeploy one of component providers. The dashboard continues using the original UI component until it is reloaded at which point it picks up the new one (no rebuild of the dashboard). It is important to version UI components as would happen for any type of integration - this means either a different component name, or a different remote url for any change that is not backward-compatible.
