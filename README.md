# Dashboard Solution

Hello! This is a project about serving a __Express__ API with __Typescript__, __MongoDB__ (db, docker-compose conf and migrations), tests with __Jest__ and pattern compliance tools (eslint) and check code quality in commits with Husky

## To run locally

Install all dependencies

`$ npm install`

Run docker img from *docker-compose.yml*

`$ docker-compose up`

Run migrations

`$ npm run migrate:up`

Run locally

`$ npm run dev`

## Use

Solutions, screen and widgets has POST calls to `create`, `modify` and `delete`
Users has POST calls to `create` and `login`

## Explanation

The project is mainly structured routes, services and repositories

`infrastructure` all the config and initializes

`middleware` authMiddleware applied in routes to check the user token and params validators

`models` interfaces and types of models and DTOS

`repositories` access to data from database

`routes` get and post endpoints

`services` logic of the api

## Tests

There are defined unit tests `src/middleware/__tests__/` and integration tests `src/__tests__/`. Mainly are testing user, solutions, screens and widgets

To run the tests

`$ npm run test`