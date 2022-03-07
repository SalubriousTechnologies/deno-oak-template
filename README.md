# Deno setup with Oak for getting started boilerplate

This is dummy repository for quickly getting setup with a deno backend.

Setup and tested with Deno 1.19.1

This application uses Deno (1.19) with `Oak` framework to create a http server
which can handle requests for evaluation data. The api is namespaced to a
version and this documentation is for `v1` of the app.

The idea is to develop a template which can be similar to the fundamentals of rails,
i.e. getting started quickly.

The repository comes with a `.vscode` folder containing settings which setup the `deno` extension on VS-Code.

## Setting Up

The application requires a set of environment variables to successfully startup
and run and depends on a functional Postgres db running and listening in for
connections. For details regarding this checkout [README in db](./db/README.md)

After cloning the repository and setting up the db as indicated in the previous paragraph, execute `deno cache deps.ts` from the root of the repository.

## Testing

The application has automated tests which can be run by using the following
command `deno test --allow-all`

## Routes

All of the routes of the application are namespaced in the form
`/api/{version_number}` where the version_number is indicated above. All `POST`
requests to the application must have the `Content-Type` header of `json` to be
processed appropriately

- _POST_ `/lead` required data:
  `{name: string}`

## Details

This repository presently uses as default:

- [x] Oak
- [x] Superoak for testing
- [x] Postgres through the postgres adapter from deno.land
- [x] Simple fixture and migration generation helpers
- [x] Basic date helper
