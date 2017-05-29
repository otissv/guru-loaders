/*
* Checks schema, resolver and mutations for errors
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checks;

var _utils = require('./utils');

function checks(_ref) {
  var schema = _ref.schema,
      resolver = _ref.resolver;
  var resolvers = resolver.resolvers,
      connectors = resolver.connectors;
  var _schema$definition = schema.definition,
      operations = _schema$definition.operations,
      definitionList = _schema$definition.definitionList,
      context = _schema$definition.context,
      types = _schema$definition.types;

  /*
  * check resolver query
  */

  if (resolvers.Query) {
    var resolverQuery = Object.keys(resolvers.Query);
    var schemaQuery = operations.Query.map(function (op) {
      return op.name;
    });

    // check resolver query operation is in schema query
    resolverQuery.forEach(function (item) {
      if (schemaQuery.indexOf(item) < 0) {
        throw Error(item + ' is in resolverQuery but not in schemaQuery.');
      }
    });

    // check schema query operation is in resolver query
    schemaQuery.forEach(function (item) {
      if (resolverQuery.indexOf(item) < 0) {
        throw Error(item + ' is in schemaQuery but not in resolverQuery.');
      }
    });
  }

  /*
  * check resolver mutation
  */
  if (resolvers.Mutation) {
    var resolverMutation = Object.keys(resolvers.Mutation);
    var schemaMutation = operations.Mutation.map(function (op) {
      return op.name;
    });

    // check resolver mutation operation is in schema mutation
    resolverMutation.forEach(function (item) {
      if (schemaMutation.indexOf(item) < 0) {
        throw Error(item + ' is in resolverMutation but not in schemaMutation.');
      }
    });

    // check schema mutation operation is in resolver mutation
    schemaMutation.forEach(function (item) {
      if (resolverMutation.indexOf(item) < 0) {
        throw Error(item + ' is in schemaMutation but not in resolverMutation.');
      }
    });
  }

  /*
  * check operation query type exists
  */
  if (operations.Query) {
    operations.Query.forEach(function (op) {
      if (definitionList.map(function (def) {
        return def.name;
      }).indexOf(op.type.name) < 0) {
        throw Error(op.type.name + ' type on ' + op.name + ' schemaQuery does not exist.');
      }
    });
  }

  /*
  * check operation mutation type exists
  */
  if (operations.Mutation) {
    operations.Mutation.forEach(function (operation) {
      if (definitionList.map(function (def) {
        return def.name;
      }).indexOf(operation.type.name) < 0) {
        throw Error(operation.type.name + ' type on ' + operation.name + ' schemaMutation does not exist.');
      }
    });
  }

  /*
  * check connectors have a resolve method
  */
  if (connectors) {
    Object.keys(connectors).forEach(function (connector) {
      if ((0, _utils.getAllMethods)(connectors[connector].prototype).indexOf('resolve') < 0) {
        throw Error((0, _utils.capitalize)(connector) + ' resolver is missing a resolve method');
      }
    });
  }

  /*
  * check context types exits
  */
  if (context && types) {
    Object.keys(context).forEach(function (item) {
      var result = types.filter(function (obj) {
        return obj.name === item;
      });
      if (result.length === 0) {
        throw Error('Field ' + item + ' type does not exist in schemaType');
      }
    });
  }
}
//# sourceMappingURL=tests.js.map