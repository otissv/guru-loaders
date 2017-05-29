/*
* Models loader
*/

'use string';

import Bluebird from 'bluebird';
import isSchemaValid from 'is-schema-valid';
import { globModulePathsAsync, getMethods, merge } from '../utils';

export default async function modelLoaderAsync (schema) {
  try {
    //
    const validationPaths = await globModulePathsAsync(`**/validation`);

    const validation = validationPaths.map(validation => {
      const mod = require(validation).default;
      return {
        name: mod.name,
        validation: mod
      };
    });

    return Bluebird.reduce(
      schema.definition.models,
      (previous, model) => {
        const modelValidation = validation.filter(i => i.name === model.name);
        let Validation;
        let validationField;

        if (modelValidation.length > 0) {
          Validation = new modelValidation[0].validation();
          validationField = getMethods(Validation)[0];
        }

        const schema = modelValidation.length > 0
          ? merge([
            model.fields,
            {
              [validationField]: {
                ...model.fields[validationField],
                validation: Validation[validationField]
              }
            }
          ])
          : model.fields;

        return {
          ...previous,
          [model.name]: {
            schema,
            isValid (data) {
              return isSchemaValid(schema)(data);
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
