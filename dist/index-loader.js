/*
* Index loader
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _databasesLoader = require('./databases/databases-loader');

var _databasesLoader2 = _interopRequireDefault(_databasesLoader);

var _environmentLoader = require('./environment/environment-loader');

var _environmentLoader2 = _interopRequireDefault(_environmentLoader);

var _jsonLoader = require('./json/json-loader');

var _jsonLoader2 = _interopRequireDefault(_jsonLoader);

var _middlewareLoader = require('./middleware/middleware-loader');

var _middlewareLoader2 = _interopRequireDefault(_middlewareLoader);

var _modelLoader = require('./model/model-loader');

var _modelLoader2 = _interopRequireDefault(_modelLoader);

var _resolversLoader = require('./resolver/resolvers-loader');

var _resolversLoader2 = _interopRequireDefault(_resolversLoader);

var _routesLoader = require('./routes/routes-loader');

var _routesLoader2 = _interopRequireDefault(_routesLoader);

var _schemaLoader = require('./schema/schema-loader');

var _schemaLoader2 = _interopRequireDefault(_schemaLoader);

var _tests = require('./tests');

var _tests2 = _interopRequireDefault(_tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var schema, json, resolver;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _schemaLoader2.default)();

          case 3:
            schema = _context.sent;
            _context.next = 6;
            return (0, _jsonLoader2.default)(schema);

          case 6:
            json = _context.sent;
            _context.next = 9;
            return (0, _resolversLoader2.default)({ schema: schema, json: json });

          case 9:
            resolver = _context.sent;


            (0, _tests2.default)({ schema: schema, resolver: resolver });

            _context.next = 13;
            return (0, _environmentLoader2.default)();

          case 13:
            _context.t0 = _context.sent;
            _context.next = 16;
            return (0, _databasesLoader2.default)();

          case 16:
            _context.t1 = _context.sent;
            _context.t2 = json;
            _context.next = 20;
            return (0, _middlewareLoader2.default)();

          case 20:
            _context.t3 = _context.sent;
            _context.next = 23;
            return (0, _modelLoader2.default)();

          case 23:
            _context.t4 = _context.sent;
            _context.t5 = resolver;
            _context.next = 27;
            return (0, _routesLoader2.default)();

          case 27:
            _context.t6 = _context.sent;
            _context.t7 = schema;
            return _context.abrupt('return', {
              configLoader: _context.t0,
              databaseLoader: _context.t1,
              jsonLoader: _context.t2,
              middlewareLoader: _context.t3,
              modelLoader: _context.t4,
              resolverLoader: _context.t5,
              routeLoader: _context.t6,
              schemaLoader: _context.t7
            });

          case 32:
            _context.prev = 32;
            _context.t8 = _context['catch'](0);

            console.log(_context.t8);

          case 35:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 32]]);
  }));

  function loaders() {
    return _ref.apply(this, arguments);
  }

  return loaders;
}();
//# sourceMappingURL=index-loader.js.map