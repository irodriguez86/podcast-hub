# Podcast Player

This is a simple React app that allows you to browse and play podcast episodes. The main view displays a list of podcasts, and clicking on a podcast takes you to a detailed view where you can see a list of its episodes and play them.

## Requirements

To run this project, you will need:

- Node.js version 16.x or later
- npm (Node Package Manager) version 7.x or later

## Installation

To install the dependencies, run:

`npm install`

## Usage

To start the development server, run:

`npm start`

This will start the app at `http://localhost:8080`. You can then view the app in your browser and make changes to the code. The page will automatically reload as you make changes.

To build the production version of the app, run:

`npm run build`

This will create a `build` folder in the root of your project with the compiled code.

## Testing

This project uses React Testing Library for unit testing and Cypress for end-to-end testing.

### Running Unit Tests

`npm test`

This will start the test runner and run all the tests in the `src` folder.

### Running End-to-End Tests

To run the end-to-end tests with Cypress, first start the development server by executing the following command:

`npm start`

Once the server is up and running, execute the following command to open Cypress:

`npm run e2e`

This will open the Cypress Test Runner, then select `E2E Testing` where you can select and run the tests from the `cypress/e2e` folder. You can add new tests by creating files with the extension `.cy.ts` in the `cypress/e2e` folder.

## Technical Considerations

* To improve performance, use `useCallback` in `Hub` component to memoize the filter function.
* Use date utils with functions to format the dates, and test utils to have a custom render which allows rendering with the router and the podcast context padding different properties from parameters.
* API calls are separated into different files. The `api.ts` file has the fetch of the API url, and a custom hook that calls the fetch, and has the logic that checks first local storage. If the data is not there, then it does the fetch and saves the data into local storage and fills the Context to enable the rest of the components to access the data.
* Since the data to save and share between different components is not too complex, we are using Context API to manage the global state. `PodcastContext` has the podcast list and chapters from the podcast, and also contains the loading that shows the animation when we are fetching the data.


## Credits

This project was created by Israel Sanchez Lobo.
