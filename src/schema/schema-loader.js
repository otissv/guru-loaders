/*
* Schema loader
*/

'use strict';

import { parse } from 'graphql';
import schemaDefinition from './schema-definition';
import {
  extensionTypes,
  extensionSchemaQuery
} from '../graphql-extend/graphql-extend-schema';

import Bluebird from 'bluebird';
import { globGQLModulePathsAsync, pipeAsync, readFile } from '../utils';

export function pathsAsync (fileName) {
  return globGQLModulePathsAsync(`**/${fileName}`).catch(error =>
    console.log(error)
  );
}

export function loadFilesAsync (paths) {
  return Bluebird.reduce(
    paths,
    async (previous, current) => {
      try {
        const currentFile = await readFile(current);

        return `${previous}\n\n${currentFile}`;
      } catch (error) {
        console.log(error);
      }
    },
    ''
  ).catch(error => console.log(error));
}

export default async function schemaLoaderAsync () {
  try {
    const mutation = await pipeAsync([pathsAsync, loadFilesAsync])(
      'schemaMutation'
    );

    const query = await pipeAsync([pathsAsync, loadFilesAsync])('schemaQuery');

    const typeDefinition = await pipeAsync([pathsAsync, loadFilesAsync])(
      'schemaType'
    );

    let schemaMutation = '';
    let schemaQuery = '';
    let schemaMutationDefinition = '';
    let schemaQueryDefinition = '';

    if (mutation && mutation.length > 0) {
      schemaMutation = 'mutation: Mutation';
      schemaMutationDefinition = `
type Mutation {
  ${mutation}
}`;
    }

    if (query && query.length > 0) {
      schemaQuery = 'query: Query';
      schemaQueryDefinition = `
type Query {
  ${query}
  ${extensionSchemaQuery}
}`;
    }

    const schema = `
${typeDefinition}
${schemaMutationDefinition}
${schemaQueryDefinition}
${extensionTypes}

schema {
  ${schemaMutation}
  ${schemaQuery}
}`;

    const astDocument = parse(schema);

    const typeDefinitionList = typeDefinition
      .match(/type(.*){/g)
      .map(str => str.replace('type', '').replace('{', '').trim());

    return await Bluebird.resolve({
      ast: astDocument,
      typeList: typeDefinitionList,
      definition: schemaDefinition({ astDocument, typeDefinitionList })
    });
  } catch (error) {
    console.log(error);
  }
}
