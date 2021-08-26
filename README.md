# React Module Federation Example

Module federation example using React.

* `create-react-app` currently uses webpack4. Module federation requires webpack5 so need custom webpack config.
* Uses the `webpack.container.ModuleFederationPlugin` to expose remote customer, property and vehicle components for use in the dashboard.
* The `dashboard` app uses components from the `customer_search`, `property_search` and `vehicle_search` apps.

## Project structure

1. `/dashboard`, `/customer-search`, `/property-search` and `/vehicle-search` are four separate React projects configured to use webpack module federation.
1. `/{project}/webpack` contains the webpack configuration. The `common-plugins` file has configuration for the `ModuleFederationPlugin` which either `exposes` components or specifies the relevant `remotes`.
1. `/{project}/src/index` does not render the app itself, it imports from `bootstrap` to allow for module federation.

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
1. The remote component interface (i.e. the properties it exposes) should be managed like any other interface contract. It should normally be simple to maintain backward compatibility. A breaking change can be handled by introducing a new component whilst retaining but deprecating the old. Alteratively, deploy the new build to a different location.
1. Remote components can have transient state that they can manage internally, but there may also be a need to retain component state beteen mounts / unmounts. For example, the customer search component unmounts when moving to a different page, but we wish to retain both the search criteria and search results so that when we reopen the search page it shows the same information as before. The remote component in this example supports two optional properties: `initialData` and `onDataChange` that address this requirement.
