# SkyRoads


## Table of contents

* [Setup](#user-content-setup)
* [npm tasks](#user-content-npm-tasks)
* [Running in dev mode](#user-content-running-client-in-dev-mode)
* [Build (production)](#user-content-build-client-production)
* [Running in preview production mode](#user-content-running-client-in-preview-production-mode)
* [Browser support](#user-content-browser-support)
* [Known issues](#user-content-known-issues)
* [Linting](#user-content-linting)
* [Misc](#user-content-misc)


## Setup

Tested with node 8.

```sh
npm install
```

## npm tasks

Once dependencies are installed following npm tasks are availble:

* `start` - starts client app only in development mode, using webpack dev server
* `dev` - same as `start`
* `build` - builds client application
* `preview` - runs client application in *production* mode, using webpack dev server (use for local testing of the client production build)

## Running in dev mode

```sh
npm start
# or
npm run dev
```

Visit `http://localhost:8080/` from your browser of choice.
Server is visible from the local network as well.

## Build (production)

Build will be placed in the `build` folder.

```
npm run build
```

If your app is not running on the server root you should change `publicPath` at two places.

In `webpack.config.js` (ATM line 76):

```js
output: {
  path: buildPath,
  publicPath: '/your-app/',
  filename: 'app-[hash].js',
},
```

and in `source/js/constants/routes` (line 1):

```js
const publicPath = '/your-app/'; // Don't forget the trailing slash (`/`).
```

Development server will be available at `http://localhost:8080/your-app/`.

## Running in preview production mode

This command will start webpack dev server, but with `NODE_ENV` set to `production`.
Everything will be minified and served.
Hot reload will not work, so you need to refresh the page manually after changing the code.

```
npm run preview
```

## Browser support

Modern browsers and IE10+.

## Known issues

These are known bugs that affect **development mode only**.

* In some versions of Safari `cheap-eval-source-map` results in
  "Can't find variable: SockJS".
  To solve it change `webpack.config.js`:

  ```js
  // from
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  // to
  devtool: IS_PRODUCTION ? false : 'source-map',
  ```

* Hot module reload is not working in IE 10.
  To test the app in development mode you'll need to change
  `inline` to `false` in `webpack/dev-server.js`

  ```js
    inline: false, // Change to false for IE10 dev mode
  ```


## Linting

ESLint is set up by extending [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb),
with some options overridden to our preferences.

```
npm run lint
```

### Importing images in CSS

Please note that paths to images in CSS files are relative to `source/css/index.css` as it imports all of the other `.css` files.

```
.BackgroundImgExample {
  background-image: url(../assets/img/book1.jpg);
}
```

### Importing SVGs as components

Just import your `.svg` files from the `source/assets/svg/` folder, and you are good to go.

```
import CircleIcon from 'svg/circle.svg';

// then in your render

<CircleIcon />
```
