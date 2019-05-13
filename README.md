# Sherlock (Front End)

Sherlock is restaurant manager application.

## Technology stack

- [next.js](https://nextjs.org)
- [redux](https://redux.js.org/)
- [redux-saga](https://redux.js.org/)
- [styled-components](https://www.styled-components.com)

See more in docs: [technology stack](./docs/technology-stack.md).

## Prerequisites

Required:

1. `node.js`

Optional:

1. `yarn`

See more in docs: [prerequisites](./docs/prerequistes.md).

## Setup

# Development

`yarn dev` or `npm run dev` to start development mode. App is now running on `http://localhost:3000`.

# Production build

`yarn build` and `yarn start` or `npm run build` and `npm run start` to build production build and start server. App is now running on `http://localhost:3000`.

See more in docs: [development](./docs/setup.md).

## Environment variables

Create `.env` file inside the main directory.

```
PUBLIC_API_URL=
NETGURU_DEV_PASSWORD=
PUBLIC_FACEBOOK_APP_ID=
PUBLIC_FACEBOOK_APP_FIELDS=
PUBLIC_GOOGLE_MAPS_API_KEY=
PUBLIC_PUSHER_APP_KEY=
PUBLIC_PUSHER_APP_CLUSTER=
STRIPE_CLIENT_ID=
PUBLIC_STRIPE_API_KEY=
```

You can find all envs in 1pass for foodetective project.

## Deployment

# Dynamic staging

Push to remote branch to trigger dynamic staging build.
`https://{#PR-NR}.sherlock.integration.devguru.co`

# Staging

Push to `master` to trigger staging build.
https://sherlock.staging.devguru.co

# Production

Push to `production` to trigger production build.
https://sherlock.foodetective.co

## Project structure

- `/pages` - for pages (routes)
- `/sections` - paged related components
- `/components` - shared components
- `/data` - redux staff, api calls etc.
  - `/actions` - redux actions
  - `/reducers` - redux reducers
  - `/requests` - api requests
  - `/sagas` - sagas for redux-saga
  - `/types` - redux action types
- `/lib` - abstractions like high order components, hooks etc.
- `/static` - static files
- `/utils` - helpers

**TBD - translations folder**

## TBD - Translations

## TBD - Linters

## TBD - Testing

## Docs

You can find more details [here](./docs).
