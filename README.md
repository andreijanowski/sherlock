
# Sherlock (aka Foodetective Business) (Front End)

  

Sherlock application for business owners who wants to publish their businesses in Foodetective and allow their clients to use any of foodetective services (for example [lefood](https://github.com/netguru/lefood)).

The all product includes:

- [Backend](https://github.com/netguru/thefooddetective)
- [Foodetective](https://github.com/netguru/thefooddetective-front)
- [Lefood (Foodetective orders)](https://github.com/netguru/lefood)
- [Sherlock (Foodetective for business)](https://github.com/netguru/sherlock)
- [Widget](https://github.com/netguru/foodetective-widget)

  

## Technology stack

  

- [next.js](https://nextjs.org) - react based framework for SSR (server-side rendering), running on node.js
- [express.js](https://expressjs.com/) - web framework for node.js
- [react](https://reactjs.org) - ui library
- [redux](https://redux.js.org) - global state manager.
- [redux-saga](https://redux-saga.js.org) - redux middleware for side effects (API calls etc.)
- [styled-components](https://www.styled-components.com) - CSS-in-JS styling solution, prefered way to styling next.js apps
- [oauth2](https://oauth.net/2) - authentication provider
- [stripe](https://stripe.com) - payments
- [pusher](https://pusher.com/) - notifications
  

## Prerequisites

  

Required:

  

1.  `node.js` - Sherlock app is running on `node.js` server. In order to work with app you need to install node.js LTS version (https://nodejs.org/en/).

  

Optional:

  

1.  `yarn` - for easier packages management

  

## Environment variables

  

Create `.env` file inside the main directory. You can find all envs in 1pass for foodetective project.

  

```
APP_URL=
PUBLIC_API_URL=
PUBLIC_FOODETECTIVE_URL=
NETGURU_DEV_PASSWORD=
OAUTH_CALLBACK_URL=
OAUTH_PUBLIC_CLIENT_ID=
OAUTH_SECRET_CLIENT_ID=
PUBLIC_PUSHER_APP_KEY=
PUBLIC_PUSHER_APP_CLUSTER=
STRIPE_CLIENT_ID=
PUBLIC_STRIPE_API_KEY=
PUBLIC_GOOGLE_ANALYTICS_ID=
PUBLIC_GOOGLE_MAPS_API_KEY=
```

  


### "Env hell"

On the production some environmets are needed for build, and some are used by node.js. We had some issues with that during first oauth deploy, so please be aware that some envs (used for build process) are located in CircleCi and loaded in [Dockerfile](https://github.com/netguru/sherlock/blob/master/docker/Dockerfile.production), and some (used by node.js server) are located in the [files](https://github.com/netguru/sherlock/blob/master/docker-compose-production.yml#L10) on production server.

  

## Setup

  

`yarn` to install depedencies

### Generating SSL certificate for localhost enviroment

In order to login via `OAuth 2.0 Authorization Code Flow`, the app should run as https, even on the localhost. [See OAuth section](#oauth)

#### Getting certificates with mkcert

To generate SSL certificates you can use e.g. [mkcert](https://github.com/FiloSottile/mkcert).
Follow the [Installation instruction](https://github.com/FiloSottile/mkcert#installation).

If you get mkcert installed, you can now generate certificates. Inside the root directory type:

`mkcert -install`

`mkcert localhost`

Those comands should create `localhsot.pem` and `localhsot-key.pem` files inside the root directory.
  

### Development

  

`yarn dev` to start development mode. App is now running on `https://localhost:3000`. 



See more in [development](./docs/setup.md) document.

  

### Production build

  

`yarn build` and `yarn start` to build production build and start server. App is now running on `http://localhost:3000`.

  

See more in [development](./docs/setup.md) document.

## OAuth

All our frontend applications use `OAuth 2.0 Authorization Code Flow` to authenticate.

### Applications managmemt

You can find registered clients for a particular environment here:

https://thefooddetective.staging.devguru.co/oauth/applications - development/staging

https://api.foodetective.co/oauth/applications - production

### How it works

[OAuth docs](https://auth0.com/docs/flows/concepts/auth-code)

[Example from OAuth playground](https://www.oauth.com/playground/authorization-code.html)

### Logout

Logout action logouts a user from all foodetective's apps.

The flow:

1. Click logout link
2. Redirection to the backend logout page and logout
3. The backend redirects to Foodetective
4. Foodetective app clears auth cookies on the server and redirects to Lefood
5. Lefood app clears auth cookies on the server and redirects to Sherlock
6. Sherlock app clears auth cookies on the server and redirects to the origin url

**CAVEAT:**  It works correctly on staging and production. Unfortunately because of the end of development and oauth migration, we haven't fixed the logout issue on a localhost. To logout from the localhost, you need to clear auth cookies.

### API calls middleware

Because of OAuth 2.0 Authorization Code Flow implementation for frontend apps with backend (next.js - node-based react framework), all our calls should go through a node server middleware. On each call to the backend, first of all, we call our node server's middleware `/api`. Then we have two different ways to authorize the request:

`as a logged in user` - the node middleware grabs an access token from a http-only cookie and it makes an authorized call to our backend

`as an unauthenticated user` - the middleware grabs an access token from the server. This token is used to authorize the entire APP and it gives us an access to the public API

## Widget
[Widget repository](https://github.com/netguru/foodetective-widget) is separated from this repository as it was supposed to be separated from any Foodetective service. Nevertheless, files of the widget ends here, in sherlock repository in `/static/widget` folder. If you need to do some changes with the widget, do it in widget repository, test it on staging by replacing this folder with new widget build for staging, but DO NOT MERGE it to production! If you want to merge widget to production, you have to replace widget staging build files with widget production build files.
  

## Deployment

  

### Dynamic staging

  

Push to remote branch to trigger dynamic staging build.

`https://{#PR-NR}.sherlock.integration.devguru.co`

  **CAVEAT:**  Unfortunately because of the end of development and oauth migration, dynamic integration doesn't work as expected. After succesfull login user is redirected to master staging. To fix this, it is needed to 
 - create separate `.secrets` file for integration on staging server, 
 - update `docker-compose-integration.yml` to point that new file
 - create separate oauth application on [backend](https://github.com/netguru/thefooddetective) and replace `OAUTH_PUBLIC_CLIENT_ID=` and `OAUTH_SECRET_CLIENT_ID=` in `.secrets` file created for integration

### Staging

  

Push to `master` to trigger staging build.

https://sherlock.staging.devguru.co

  

### Production

  

Push to `production` to trigger production build.

https://sherlock.foodetective.co

  

## Project structure

  

-  `/pages` - for pages (routes)

-  `/sections` - page related components

-  `/components` - shared components

-  `/data` - redux staff, api calls etc.

	-  `/actions` - redux actions

	-  `/reducers` - redux reducers

	-  `/requests` - api requests

	-  `/sagas` - sagas for redux-saga

	-  `/types` - redux action types

-  `/lib` - abstractions like high order components, hooks etc.

-  `/static` - static files (including translations)

-  `/utils` - helpers

  

## Checks

  

### Linters

  

`yarn lint` triggers linters:

  

-  `eslint` to lint `javascript` files

-  `stylelint` to lint `styled-components`

  

### Tests

  

`yarn test` runs `jest` test framework

  

### Pre-commit hook

  

We use `husky` pre-commit hook. It triggers `yarn lint` and `yarn test` on commit.

  

## TBD - Translations

  

## Docs

  

You can find more details [here](./docs).
