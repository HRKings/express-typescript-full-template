# Express Typescript Template

This repository contains a feature packed Express server template, including a basic architecture and developer tools to make the DX very friendly.

# What's used

* NodeJS [version 16.10+]
* TypeScript [version 4.4.4+]
* pnpm (a very fast and disk efficient package manager) [version 6.18.0+]

# What's included

API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware
* [helmet](https://www.npmjs.com/package/helmet)
  * Helps you secure your Express apps by setting various HTTP headers
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Loads environment variables from a `.env` file into `process.env`

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * Hot Reloading support during the development
* [eslint](https://www.npmjs.com/package/eslint)
  * A powerful linting tool
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple and flexible testing framework
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions for API testing

## Setup

To install all the dependencies, just run:

```bash
pnpm i
```

## Development

To start the server in development mode (with auto reloading when changes are detected), use the following command:

```
pnpm run dev
```

## Lint

To auto fix all linting problems using ESLint, run:

```
pnpm run lint
```

## Test

The template already includes tests for the provided endpoints and middleware, to run the tests you can run:

```
pnpm test
```

## Compile and run

If you just want to compile your code and run (in a production environment for example), just use:

```
pnpm start
```
