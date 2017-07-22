/*
* Schema Definition
*/

'use strict';

import { merge } from '../utils';
import camel from 'to-camel-case';

const initObj = {
  context: [],
  directives: [],
  enums: [],
  inputs: [],
  interface: [],
  scalars: [],
  types: [],
  json: [],
  definitionList: [],
  unions: [],
  operations: {
    Mutation: [],
    Query: []
  }
};

function createDefinitionList ({ document, node }) {
  return [
    ...document.definitionList,
    {
      kind: node.kind,
      name: node.name.value
    }
  ];
}

function createTypeDefinitions ({ document, node, type }) {
  return {
    ...document,
    [type]: [
      ...document[type],
      {
        name: node.name.value,
        fields: createObjectFields(node)
      }
    ],
    definitionList: createDefinitionList({ document, node }),
    json: [
      ...document.json,
      {
        name: node.name.value,
        fields: node.fields.reduce((obj, field) => {
          let typeName = field.type.type
            ? camel(field.type.type.name.value)
            : camel(field.type.name.value);

          return {
            ...obj,
            [field.name.value]: {
              type: field.kind === 'ListType' ? [typeName] : typeName,
              required: Boolean(field.type.kind === 'NonNullType')
            }
          };
        }, {})
      }
    ]
  };
}

function createObjectFields (node) {
  return node.fields.reduce(
    (obj, field) => [
      ...obj,
      {
        name: field.name.value,
        type: {
          kind: field.type.kind,
          name: field.type.type
            ? field.type.type.name.value
            : field.type.name.value
        },
        arguments: field.arguments
          ? field.arguments.reduce((o, arg) => {
            const typeName = arg.type.type
                ? arg.type.type.name.value
                : arg.type.name.value;

            return {
              kind: arg.type.kind,
              name: arg.name.value,
              type: typeName,
              defaultValue: arg.defaultValue || null
            };
          }, {})
          : null
      }
    ],
    []
  );
}

const definition = {
  InputObjectTypeDefinition ({ document, node }) {
    return createTypeDefinitions({ document, node, type: 'inputs' });
  },

  EnumTypeDefinition ({ document, node }) {
    return {
      ...document,
      enums: [
        ...document.enums,
        {
          name: node.name.value,
          values: node.values.map(v => v.name.value)
        }
      ],
      definitionList: createDefinitionList({ document, node })
    };
  },

  ObjectTypeDefinition ({ document, node }) {
    const typeName = node.name.value;

    if (node.name.value === 'Mutation' || node.name.value === 'Query') {
      return {
        ...document,
        operations: {
          ...document.operations,
          [typeName]: [
            ...document.operations[typeName],
            ...createObjectFields(node)
          ]
        }
      };
    } else {
      return createTypeDefinitions({ document, node, type: 'types' });
    }
  }
};

export default function ({ astDocument, typeDefinitionList }) {
  const schemaDefinition = astDocument.definitions.reduce((document, node) => {
    return (
      (definition[node.kind] && definition[node.kind]({ document, node })) ||
      document
    );
  }, initObj);

  let contextStore = {};

  schemaDefinition.context = schemaDefinition.types.reduce(
    (previous, current) => {
      const context = () => ({
        ...current.fields.reduce((obj, field) => {
          if (typeDefinitionList.includes(field.type.name)) {
            // add resolve to context store
            if (contextStore[field.name] == null) {
              const resolve = (query, args, context) => {
                const Class = new context.connectors[
                  (camel(field.type.name))
                ]();

                return Class.resolve({
                  query,
                  args: query[field.name],
                  ...context
                });
              };

              Object.defineProperty(resolve, 'name', { value: field.name });

              contextStore[field.name] = resolve;
            }

            return merge([
              obj,
              {
                [current.name]: { [field.name]: contextStore[field.name] }
              }
            ]);
          } else {
            return obj;
          }
        }, {})
      });

      if (context()[current.name]) {
        return merge([previous, context()]);
      } else {
        return previous;
      }
    },
    {}
  );

  return schemaDefinition;
}
