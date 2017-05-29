/*
* Checks schema, resolver and mutations for errors
*/

'use strict';
import { getAllMethods, capitalize } from './utils';

export default function checks ({ schema, resolver }) {
  const { resolvers, connectors } = resolver;
  const { operations, definitionList, context, types } = schema.definition;

  /*
  * check resolver query
  */
  if (resolvers.Query) {
    const resolverQuery = Object.keys(resolvers.Query);
    const schemaQuery = operations.Query.map(op => op.name);

    // check resolver query operation is in schema query
    resolverQuery.forEach(item => {
      if (schemaQuery.indexOf(item) < 0) {
        throw Error(`${item} is in resolverQuery but not in schemaQuery.`);
      }
    });

    // check schema query operation is in resolver query
    schemaQuery.forEach(item => {
      if (resolverQuery.indexOf(item) < 0) {
        throw Error(`${item} is in schemaQuery but not in resolverQuery.`);
      }
    });
  }

  /*
  * check resolver mutation
  */
  if (resolvers.Mutation) {
    const resolverMutation = Object.keys(resolvers.Mutation);
    const schemaMutation = operations.Mutation.map(op => op.name);

    // check resolver mutation operation is in schema mutation
    resolverMutation.forEach(item => {
      if (schemaMutation.indexOf(item) < 0) {
        throw Error(
          `${item} is in resolverMutation but not in schemaMutation.`
        );
      }
    });

    // check schema mutation operation is in resolver mutation
    schemaMutation.forEach(item => {
      if (resolverMutation.indexOf(item) < 0) {
        throw Error(
          `${item} is in schemaMutation but not in resolverMutation.`
        );
      }
    });
  }

  /*
  * check operation query type exists
  */
  if (operations.Query) {
    operations.Query.forEach(op => {
      if (definitionList.map(def => def.name).indexOf(op.type.name) < 0) {
        throw Error(
          `${op.type.name} type on ${op.name} schemaQuery does not exist.`
        );
      }
    });
  }

  /*
  * check operation mutation type exists
  */
  if (operations.Mutation) {
    operations.Mutation.forEach(operation => {
      if (
        definitionList.map(def => def.name).indexOf(operation.type.name) < 0
      ) {
        throw Error(
          `${operation.type.name} type on ${operation.name} schemaMutation does not exist.`
        );
      }
    });
  }

  /*
  * check connectors have a resolve method
  */
  if (connectors) {
    Object.keys(connectors).forEach(connector => {
      if (
        getAllMethods(connectors[connector].prototype).indexOf('resolve') < 0
      ) {
        throw Error(
          `${capitalize(connector)} resolver is missing a resolve method`
        );
      }
    });
  }

  /*
  * check context types exits
  */
  if (context && types) {
    Object.keys(context).forEach(item => {
      const result = types.filter(obj => obj.name === item);
      if (result.length === 0) {
        throw Error(`Field ${item} type does not exist in schemaType`);
      }
    });
  }
}
