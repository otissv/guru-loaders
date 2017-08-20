/*
* Schema Definition
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (_ref6) {
  var astDocument = _ref6.astDocument,
      typeDefinitionList = _ref6.typeDefinitionList;

  var schemaDefinition = astDocument.definitions.reduce(function (document, node) {
    return definition[node.kind] && definition[node.kind]({ document: document, node: node }) || document;
  }, initObj);

  var contextStore = {};

  schemaDefinition.context = schemaDefinition.types.reduce(function (previous, current) {
    var context = function context() {
      return _extends({}, current.fields.reduce(function (obj, field) {
        if (typeDefinitionList.includes(field.type.name)) {
          // add resolve to context store
          if (contextStore[field.name] == null) {
            var resolve = function resolve(query, args, context) {
              var Class = new context.connectors[(0, _toCamelCase2.default)(field.type.name)]();

              return Class.resolve(_extends({
                query: query,
                args: query[field.name]
              }, context));
            };

            Object.defineProperty(resolve, 'name', { value: field.name });

            contextStore[field.name] = resolve;
          }

          return (0, _utils.merge)([obj, _defineProperty({}, current.name, _defineProperty({}, field.name, contextStore[field.name]))]);
        } else {
          return obj;
        }
      }, {}));
    };

    if (context()[current.name]) {
      return (0, _utils.merge)([previous, context()]);
    } else {
      return previous;
    }
  }, {});

  return schemaDefinition;
};

var _utils = require('../utils');

var _toCamelCase = require('to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initObj = {
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

function createDefinitionList(_ref) {
  var document = _ref.document,
      node = _ref.node;

  return [].concat(_toConsumableArray(document.definitionList), [{
    kind: node.kind,
    name: node.name.value
  }]);
}

function createTypeDefinitions(_ref2) {
  var _extends3;

  var document = _ref2.document,
      node = _ref2.node,
      type = _ref2.type;

  return _extends({}, document, (_extends3 = {}, _defineProperty(_extends3, type, [].concat(_toConsumableArray(document[type]), [{
    name: node.name.value,
    fields: createObjectFields(node)
  }])), _defineProperty(_extends3, 'definitionList', createDefinitionList({ document: document, node: node })), _defineProperty(_extends3, 'json', [].concat(_toConsumableArray(document.json), [{
    name: node.name.value,
    fields: node.fields.reduce(function (obj, field) {
      var typeName = field.type.type ? (0, _toCamelCase2.default)(field.type.type.name.value) : (0, _toCamelCase2.default)(field.type.name.value);

      return _extends({}, obj, _defineProperty({}, field.name.value, {
        type: field.kind === 'ListType' ? [typeName] : typeName,
        required: Boolean(field.type.kind === 'NonNullType')
      }));
    }, {})
  }])), _extends3));
}

function createObjectFields(node) {
  return node.fields.reduce(function (obj, field) {
    return [].concat(_toConsumableArray(obj), [{
      name: field.name.value,
      type: {
        kind: field.type.kind,
        name: field.type.type ? field.type.type.name.value : field.type.name.value
      },
      arguments: field.arguments ? field.arguments.reduce(function (previous, arg) {
        var typeName = arg.type.type ? arg.type.type.name.value : arg.type.name.value;

        return [].concat(_toConsumableArray(previous), [{
          kind: arg.type.kind,
          name: arg.name.value,
          type: typeName,
          defaultValue: arg.defaultValue || null
        }]);
      }, []) : null
    }]);
  }, []);
}

var definition = {
  InputObjectTypeDefinition: function InputObjectTypeDefinition(_ref3) {
    var document = _ref3.document,
        node = _ref3.node;

    return createTypeDefinitions({ document: document, node: node, type: 'inputs' });
  },
  EnumTypeDefinition: function EnumTypeDefinition(_ref4) {
    var document = _ref4.document,
        node = _ref4.node;

    return _extends({}, document, {
      enums: [].concat(_toConsumableArray(document.enums), [{
        name: node.name.value,
        values: node.values.map(function (v) {
          return v.name.value;
        })
      }]),
      definitionList: createDefinitionList({ document: document, node: node })
    });
  },
  ObjectTypeDefinition: function ObjectTypeDefinition(_ref5) {
    var document = _ref5.document,
        node = _ref5.node;

    var typeName = node.name.value;

    if (node.name.value === 'Mutation' || node.name.value === 'Query') {
      return _extends({}, document, {
        operations: _extends({}, document.operations, _defineProperty({}, typeName, [].concat(_toConsumableArray(document.operations[typeName]), _toConsumableArray(createObjectFields(node)))))
      });
    } else {
      return createTypeDefinitions({ document: document, node: node, type: 'types' });
    }
  }
};
//# sourceMappingURL=schema-definition.js.map