# Express Typescript Full Template

This repository contains a truly feature packed Express server template, including a basic architecture, tools for database access and developer tools to make the DX very friendly.

If you are looking for a more simple template, you can take a look on the other [express-typescript-template](https://github.com/HRKings/express-typescript-template)

# What's used

* **NodeJS** [version 16.13+]
* **TypeScript** [version 4.4.4+]
* **pnpm** (a very fast and disk efficient package manager) [version 6.18.0+]
* **Babel** (an alternative JS toolchain with support for TS) [version 7.16]

# What's included

API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware
* [helmet](https://www.npmjs.com/package/helmet)
  * Helps you secure your Express apps by setting various HTTP headers
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Loads environment variables from a `.env` file into `process.env`
* [knex](https://www.npmjs.com/package/knex)
  * A powerful SQL query builder
  * The default included driver is for [PostgresSQL](https://www.npmjs.com/package/pg)

Development utilities:

* [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
  * TypeScript Hot Reloading support during the development
* [ts-node](https://www.npmjs.com/package/ts-node)
  * Run TypeScript files directly
* [eslint](https://www.npmjs.com/package/eslint)
  * A powerful linting tool
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple and flexible testing framework
* [chai](https://www.npmjs.com/package/chai)
  * More assertions for Mocha
  * [chai-things](https://www.npmjs.com/package/chai-things) is also included, for easy testing of array elements
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
pnpm run build
pnpm start
```

## Migrations and Seeds

A Knex alias point to the knexfile on the `database` folder is provided via `pnpm run knex`. How to use:

```bash
# You can run any Knex command with this alias, just pass a command after the 'knex'
pnpm run knex migrate:latest
pnpm run knex migrate:rollback

# Adds a new migration to the database/migrations folder
pnpm run knex:migration:add 'ExampleMigration'

# Adds a new seed to the database/seeds folder
pnpm run knex:seed:add 'ExampleSeed'
```
