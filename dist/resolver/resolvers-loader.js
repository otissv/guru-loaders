/*
* Resolvers loader
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceResolverModulesAsync = exports.extendResolverAsync = exports.loadResolverAsync = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var loadResolverAsync = exports.loadResolverAsync = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(paths) {
    var _this = this;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _bluebird2.default.map(paths, function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(p) {
                var pathSplit, fileName, mutation, query, Resolver, moduleName;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        pathSplit = p.split('/');
                        fileName = pathSplit[pathSplit.length - 1];
                        mutation = fileName.match('Mutation');
                        query = fileName.match('Query');
                        _context.next = 7;
                        return require(p);

                      case 7:
                        Resolver = _context.sent;
                        moduleName = (0, _toCamelCase2.default)(Resolver.default.name);
                        return _context.abrupt('return', {
                          name: moduleName,
                          type: mutation && (0, _toCamelCase2.default)(mutation[0]) || query && (0, _toCamelCase2.default)(query[0]),
                          module: Resolver.default
                        });

                      case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](0);

                        console.log(_context.t0);

                      case 15:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[0, 12]]);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);

            console.log(_context2.t0);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6]]);
  }));

  return function loadResolverAsync(_x) {
    return _ref.apply(this, arguments);
  };
}();

var extendResolverAsync = exports.extendResolverAsync = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(resolverObjList) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt('return', Object.keys(_graphqlExtendResolver.extendedResolverQuery).reduce(function (previousList, currentObj) {
              return [].concat(_toConsumableArray(previousList), [_defineProperty({}, currentObj, {
                type: 'query',
                module: _graphqlExtendResolver.extendedResolverQuery[currentObj]
              })]);
            }, resolverObjList));

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function extendResolverAsync(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _canAccessLoader = require('./canAccess-loader');

var _canAccessLoader2 = _interopRequireDefault(_canAccessLoader);

var _conncetorsReducerLoader = require('./conncetors-reducer-loader');

var _conncetorsReducerLoader2 = _interopRequireDefault(_conncetorsReducerLoader);

var _graphqlExtendResolver = require('../graphql-extend/graphql-extend-resolver');

var _toCamelCase = require('to-camel-case');

var _toCamelCase2 = _interopRequireDefault(_toCamelCase);

var _toSnakeCase = require('to-snake-case');

var _toSnakeCase2 = _interopRequireDefault(_toSnakeCase);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var reduceResolverModulesAsync = exports.reduceResolverModulesAsync = function reduceResolverModulesAsync(loadedResolverModules) {
  var resolver = {
    Mutation: {},
    Query: {}
  };

  return _bluebird2.default.reduce(loadedResolverModules, function (previous, current) {
    return (0, _utils.getMethods)(current.module.prototype).reduce(function (prev, methodName) {
      var moduleName = current.name;
      var moduleMethodName = '' + moduleName + (0, _utils.capitalize)(methodName);
      var type = (0, _toSnakeCase2.default)(methodName).toUpperCase();

      var mutation = _extends({}, prev.Mutation);
      var query = _extends({}, prev.Query);

      var method = function () {
        var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(query, args, context) {
          var canAccess, fn;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return (0, _canAccessLoader2.default)({
                    type: type,
                    locals: context.locals
                  });

                case 3:
                  canAccess = _context4.sent;

                  fn = function fn(_ref6) {
                    var query = _ref6.query,
                        args = _ref6.args,
                        context = _ref6.context;

                    var Module = new context.connectors[moduleName]();
                    return Module[methodName](_extends({ query: query, args: args }, context));
                  };

                  _context4.next = 7;
                  return canAccess({
                    query: query,
                    args: args,
                    context: _extends({}, context),
                    fn: fn
                  });

                case 7:
                  return _context4.abrupt('return', _context4.sent);

                case 10:
                  _context4.prev = 10;
                  _context4.t0 = _context4['catch'](0);

                  console.log(_context4.t0);

                case 13:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, undefined, [[0, 10]]);
        }));

        return function method(_x4, _x5, _x6) {
          return _ref5.apply(this, arguments);
        };
      }();

      if (current.type === 'mutation') {
        mutation = _extends({}, mutation, _defineProperty({}, moduleMethodName, method));
      } else {
        query = _extends({}, query, _defineProperty({}, moduleMethodName, method));
      }

      return {
        Mutation: _extends({}, prev.Mutation, mutation),
        Query: _extends({}, prev.Query, query)
      };
    }, previous);
  }, resolver).then(function (resolvers) {
    if (Object.keys(resolvers.Mutation).length === 0) {
      delete resolvers.Mutation;
      return resolvers;
    } else {
      return resolvers;
    }
  }).catch(function (error) {
    return console.log(error);
  });
};

exports.default = function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(_ref8) {
    var schema = _ref8.schema,
        validation = _ref8.validation;
    var loadedResolverModules, resolvers, connectors;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _utils.pipeAsync)([(0, _utils.mergeGlobPathsAsync)('resolverMutation'), (0, _utils.mergeGlobPathsAsync)('resolverQuery'), loadResolverAsync
            // extendResolverAsync
            ])([]);

          case 3:
            loadedResolverModules = _context5.sent;
            _context5.next = 6;
            return reduceResolverModulesAsync(loadedResolverModules);

          case 6:
            resolvers = _context5.sent;
            _context5.next = 9;
            return (0, _conncetorsReducerLoader2.default)(loadedResolverModules);

          case 9:
            connectors = _context5.sent;
            return _context5.abrupt('return', {
              connectors: connectors,
              resolvers: _extends({}, resolvers, schema.definition.context)
            });

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5['catch'](0);
            throw new Error(_context5.t0);

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 13]]);
  }));

  function resolverLoaderAsync(_x7) {
    return _ref7.apply(this, arguments);
  }

  return resolverLoaderAsync;
}();
//# sourceMappingURL=resolvers-loader.js.map