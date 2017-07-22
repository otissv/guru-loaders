/*
* Index loader
*/

'use strict';
import databasesLoaderAsync from './databases/databases-loader';
import environmentLoaderAsync from './environment/environment-loader';
import jsonLoaderAsync from './json/json-loader';
import middlewareLoaderAsync from './middleware/middleware-loader';
import modelLoaderAsync from './model/model-loader';
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
      configLoader: await environmentLoaderAsync(),
      databaseLoader: await databasesLoaderAsync(),
      jsonLoader: json,
      middlewareLoader: await middlewareLoaderAsync(),
      modelLoader: await modelLoaderAsync(),
      resolverLoader: resolver,
      routeLoader: await routesLoaderAsync(),
      schemaLoader: schema
    };
  } catch (error) {
    console.log(error);
  }
}
