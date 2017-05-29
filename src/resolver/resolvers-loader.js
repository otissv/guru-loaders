/*
* Resolvers loader
*/

'use strict';

import Bluebird from 'bluebird';
import canAccessAsync from './canAccess-loader';
import connectorReducerAsync from './conncetors-reducer-loader';
import {
  extendedResolverQuery
} from '../graphql-extend/graphql-extend-resolver';
import camel from 'to-camel-case';
import snake from 'to-snake-case';
import {
  capitalize,
  getMethods,
  mergeGlobPathsAsync,
  pipeAsync
} from '../utils';

export async function loadResolverAsync (paths) {
  try {
    return await Bluebird.map(paths, async p => {
      try {
        const pathSplit = p.split('/');
        const fileName = pathSplit[pathSplit.length - 1];

        const mutation = fileName.match('Mutation');
        const query = fileName.match('Query');

        const Resolver = await require(p);
        const moduleName = camel(Resolver.default.name);

        return {
          name: moduleName,
          type: (mutation && camel(mutation[0])) || (query && camel(query[0])),
          module: Resolver.default
        };
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export async function extendResolverAsync (resolverObjList) {
  // return resolverObjList
  return Object.keys(
    extendedResolverQuery
  ).reduce((previousList, currentObj) => {
    return [
      ...previousList,
      {
        [currentObj]: {
          type: 'query',
          module: extendedResolverQuery[currentObj]
        }
      }
    ];
  }, resolverObjList);
}

export const reduceResolverModulesAsync = loadedResolverModules => {
  const resolver = {
    Mutation: {},
    Query: {}
  };

  return Bluebird.reduce(
    loadedResolverModules,
    (previous, current) => {
      return getMethods(current.module.prototype).reduce((prev, methodName) => {
        const moduleName = current.name;
        const moduleMethodName = `${moduleName}${capitalize(methodName)}`;
        const type = snake(methodName).toUpperCase();

        let mutation = { ...prev.Mutation };
        let query = { ...prev.Query };

        const method = async (query, args, context) => {
          try {
            const canAccess = await canAccessAsync({
              type,
              locals: context.locals
            });

            const fn = ({ query, args, context }) => {
              const Module = new context.connectors[moduleName]();
              return Module[methodName]({ query, args, ...context });
            };

            return await canAccess({
              query,
              args,
              context: {
                ...context
              },
              fn
            });
          } catch (error) {
            console.log(error);
          }
        };

        if (current.type === 'mutation') {
          mutation = {
            ...mutation,
            [moduleMethodName]: method
          };
        } else {
          query = {
            ...query,
            [moduleMethodName]: method
          };
        }

        return {
          Mutation: {
            ...prev.Mutation,
            ...mutation
          },
          Query: {
            ...prev.Query,
            ...query
          }
        };
      }, previous);
    },
    resolver
  ).catch(error => console.log(error));
};

export default async function resolverLoaderAsync ({ schema, model }) {
  try {
    const loadedResolverModules = await pipeAsync([
      mergeGlobPathsAsync('resolverMutation'),
      mergeGlobPathsAsync('resolverQuery'),
      loadResolverAsync
      // extendResolverAsync
    ])([]);

    const resolvers = await reduceResolverModulesAsync(loadedResolverModules);
    const connectors = await connectorReducerAsync(loadedResolverModules);

    return {
      connectors,
      resolvers: {
        ...resolvers,
        ...schema.definition.context
      }
    };
  } catch (error) {
    throw new Error(error);
  }
}
