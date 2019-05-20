## Setup

`yarn` to install depedencies

### Development mode

To start development mode, type `yarn dev`.

It triggers npm script:
`"dev": "nodemon server.js"`
`nodemon` helps the app to automatically restart when using custom server
`server.js` starts our custom express server

App is now running on `http://localhost:3000`.

### Production build

`yarn build` and `yarn start` to build production build and start server. App is now running on `http://localhost:3000`.

`yarn build` triggers npm script:
`"build": "next build",` builds production build
`"start": "NODE_ENV=production node server.js"` starts server
