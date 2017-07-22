/*
* JSON loader
*/

'use string';

import Bluebird from 'bluebird';
import isSchemaValid from 'is-schema-valid';
import camel from 'to-camel-case';
import { globModulePathsAsync, getMethods, merge } from '../utils';

export default async function jsonLoaderAsync (schema) {
  try {
    const validationPaths = await globModulePathsAsync(`**/validation`);

    const customValidation = validationPaths.map(validationPath => {
      const mod = require(validationPath).default;
      return {
        name: mod.name,
        Validation: mod
      };
    });

    return Bluebird.reduce(
      schema.definition.json,
      (previous, json) => {
        const jsonValidation = customValidation.filter(
          i => i.name === json.name
        );
        let Validation;
        let validationField;

        if (jsonValidation.length > 0) {
          Validation = new jsonValidation[0].Validation();
          validationField = getMethods(Validation)[0];
        }

        const schema =
          jsonValidation.length > 0
            ? merge([
              json.fields,
              {
                [validationField]: {
                  ...json.fields[validationField],
                  validation: Validation[validationField]
                }
              }
            ])
            : json.fields;

        return {
          ...previous,
          [camel(json.name)]: {
            schema,
            isValid (data) {
              return isSchemaValid(json.fields)(data);
            }
          }
        };
      },
      {}
    );
  } catch (error) {
    console.log(error);
  }
}
