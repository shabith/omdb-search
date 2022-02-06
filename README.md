# OMDB Search App

## Requirement

1. This application is developed on top of node version `12`. Since it is an outdated version, I have added `.nvmrc` config file. If you have nvm in your system, you can run `nvm install` command to install the relevant node version.
2. Rename `.env.sample` file as `.env.local` and replace `{OMDB_API_KEY_GOES_HERE}` with you OMDB Api key.
3. Run `npm install` to install dependencies.

## How to run the application

1. Run `npm run build` command to build the application.
2. Once it is complete, run `npm run start` to run the application.
Visit `http://localhost:3000`

> If you want to run the development server, you can |use `npm run dev` command.

## Storybook

I have used `Storybook` to create and organize all the UI components.

To run storybook,  build that by running `npm run build-storybook` and opening the `index.html` file in the web browser.

## How to run unit-tests and test coverage

To run unit tests, run `npm run test` command. And if you want to check on test coverage, you can run `npm run test:coverage`

## Tools and Frameworks

* Next.js
* Typescript
* Emotion - CSS in JS with Theme support
* Jest with testing library
* Storybook
* Eslint with airbnb configuration
* Prettier

## Knowing issue

According to the design, we have a year range selector. However, OMDB API doesn't support that. So I used only the lowest year in the range for the API.
