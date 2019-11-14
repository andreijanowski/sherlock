# Sherlock (Front End)

Sherlock is restaurant manager application.

## Technology stack

- [next.js](https://nextjs.org) - React based framework for SSR (server-side rendering). Running on node.js.
- [react](https://reactjs.org) - Libary to create reactive UI.
- [redux](https://redux.js.org) - Global state manager.
- [redux-saga](https://redux-saga.js.org) - Redux middleware for side effects (API calls etc.)
- [styled-components](https://www.styled-components.com) - CSS-in-JS styling solution. It is prefered way to styling next.js apps.

## Prerequisites

Required:

1. `node.js` - Sherlock app is running on `node.js` server. In order to work with app you need to install node.js LTS version (https://nodejs.org/en/).

Optional:

1. `yarn` - for easier packages management

## Environment variables

Create `.env` file inside the main directory.

```
PUBLIC_API_URL=
NETGURU_DEV_PASSWORD=
PUBLIC_GOOGLE_MAPS_API_KEY=
PUBLIC_PUSHER_APP_KEY=
PUBLIC_PUSHER_APP_CLUSTER=
STRIPE_CLIENT_ID=
PUBLIC_STRIPE_API_KEY=
```

You can find all envs in 1pass for foodetective project.

## Setup

`yarn` to install depedencies

### Development

`yarn dev` to start development mode. App is now running on `http://localhost:3000`.

### Production build

`yarn build` and `yarn start` to build production build and start server. App is now running on `http://localhost:3000`.

See more in docs: [development](./docs/setup.md).

## Deployment

### Dynamic staging

Push to remote branch to trigger dynamic staging build.
`https://{#PR-NR}.sherlock.integration.devguru.co`

### Staging

Push to `master` to trigger staging build.
https://sherlock.staging.devguru.co

### Production

Push to `production` to trigger production build.
https://sherlock.foodetective.co

## Project structure

- `/pages` - for pages (routes)
- `/sections` - page related components
- `/components` - shared components
- `/data` - redux staff, api calls etc.
  - `/actions` - redux actions
  - `/reducers` - redux reducers
  - `/requests` - api requests
  - `/sagas` - sagas for redux-saga
  - `/types` - redux action types
- `/lib` - abstractions like high order components, hooks etc.
- `/static` - static files (including translations)
- `/utils` - helpers

## Checks

### Linters

`yarn lint` triggers linters:

- `eslint` to lint `javascript` files
- `stylelint` to lint `styled-components`

### Tests

`yarn test` runs `jest` test framework

### Pre-commit hook

We use `husky` pre-commit hook. It triggers `yarn lint` and `yarn test` on commit.

## TBD - Translations

## Docs

You can find more details [here](./docs).
