/*
* Index loader
*/

'use strict';
import databasesLoaderAsync from './databases/databases-loader';
import environmentLoaderAsync from './environment/environment-loader';
import middlewareLoaderAsync from './middleware/middleware-loader';
import jsonLoaderAsync from './json/json-loader';
import resolverLoaderAsync from './resolver/resolvers-loader';
import routesLoaderAsync from './routes/routes-loader';
import schemaLoaderAsync from './schema/schema-loader';
import tests from './tests';

export default async function loaders () {
  try {
    const schema = await schemaLoaderAsync();
    const json = await jsonLoaderAsync(schema);
    const resolver = await resolverLoaderAsync({ schema, json });

    tests({ schema, resolver });

    return {
      databaseLoader: await databasesLoaderAsync(),
      configLoader: await environmentLoaderAsync(),
      middlewareLoader: await middlewareLoaderAsync(),
      jsonLoader: json,
      resolverLoader: resolver,
      routeLoader: await routesLoaderAsync(),
      schemaLoader: schema
    };
  } catch (error) {
    console.log(error);
  }
}
