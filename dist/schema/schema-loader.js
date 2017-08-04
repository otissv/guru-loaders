/*
* Schema loader
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pathsAsync = pathsAsync;
exports.loadFilesAsync = loadFilesAsync;

var _graphql = require('graphql');

var _schemaDefinition = require('./schema-definition');

var _schemaDefinition2 = _interopRequireDefault(_schemaDefinition);

var _graphqlExtendSchema = require('../graphql-extend/graphql-extend-schema');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function pathsAsync(fileName) {
  return (0, _utils.globGQLModulePathsAsync)('**/' + fileName).catch(function (error) {
    return console.log(error);
  });
}

function loadFilesAsync(paths) {
  var _this = this;

  return _bluebird2.default.reduce(paths, function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(previous, current) {
      var currentFile;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _utils.readFile)(current);

            case 3:
              currentFile = _context.sent;
              return _context.abrupt('return', previous + '\n' + currentFile);

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              console.log(_context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 7]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), '').catch(function (error) {
    return console.log(error);
  });
}

exports.default = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var mutation, query, typeDefinition, schemaMutation, schemaQuery, schemaMutationDefinition, schemaQueryDefinition, schema, astDocument, typeDefinitionList;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _utils.pipeAsync)([pathsAsync, loadFilesAsync])('schemaMutation');

          case 3:
            mutation = _context2.sent;
            _context2.next = 6;
            return (0, _utils.pipeAsync)([pathsAsync, loadFilesAsync])('schemaQuery');

          case 6:
            query = _context2.sent;
            _context2.next = 9;
            return (0, _utils.pipeAsync)([pathsAsync, loadFilesAsync])('schemaType');

          case 9:
            typeDefinition = _context2.sent;
            schemaMutation = '';
            schemaQuery = '';
            schemaMutationDefinition = '';
            schemaQueryDefinition = '';


            if (mutation && mutation.length > 0) {
              schemaMutation = 'mutation: Mutation';
              schemaMutationDefinition = '\ntype Mutation {\n  ' + mutation + '\n}\n';
            }

            if (query && query.length > 0) {
              schemaQuery = 'query: Query';
              schemaQueryDefinition = 'type Query {\n  ' + query + '\n  ' + _graphqlExtendSchema.extensionSchemaQuery + '\n}';
            }

            schema = '\n' + typeDefinition + '\n' + schemaMutationDefinition + '\n' + schemaQueryDefinition + '\n' + _graphqlExtendSchema.extensionTypes + '\n\nschema {\n  ' + schemaMutation + '\n  ' + schemaQuery + '\n}';
            astDocument = (0, _graphql.parse)(schema);
            typeDefinitionList = typeDefinition.match(/type(.*){/g).map(function (str) {
              return str.replace('type', '').replace('{', '').trim();
            });
            _context2.next = 21;
            return _bluebird2.default.resolve({
              ast: astDocument,
              typeList: typeDefinitionList,
              definition: (0, _schemaDefinition2.default)({ astDocument: astDocument, typeDefinitionList: typeDefinitionList })
            });

          case 21:
            return _context2.abrupt('return', _context2.sent);

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 27:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 24]]);
  }));

  function schemaLoaderAsync() {
    return _ref2.apply(this, arguments);
  }

  return schemaLoaderAsync;
}();
//# sourceMappingURL=schema-loader.js.map