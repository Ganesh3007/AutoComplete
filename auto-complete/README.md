# Autocomplete Component (React, TypeScript & Vite)

![Preview Autocomplete](Test.png?raw=true "Autocomplete")

This repository has an Autocomplete component with the following features.

- Cache Mechanism: Caches results to improve the performance and prevent the duplicate requests.
- Debouncing: Configurable debounce method to avoid frequent requests when fast typing.
- Highlight: It highlights your search inside the result
- Can be used with any API
- No third party dependencies

## Tested Highlights
- Unit Testing: To cover all the possible & edge case scenarios.
- LightHouse: To make sure, the component has high accessibility & performance.

![Preview Lighthouse](Perf-test.png?raw=true "Tested Results")

## Run the project

- Run `npm install` or `yarn install`
- Development mode: Run `npm run dev` or `yarn dev`
- Unit tests: Run `npm test` or `yarn test`
- Production build: Run `npm run build` or `yarn build`

Open the CLI logged url to view it in the browser.

## How to use it
The autocomplete component was created using a list of receipes, so in order to make it work you will have to try typing some receipes in the search box.

## Questions
[Questions](questions.md)