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
    var schema, model, resolver;
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
            return (0, _modelLoader2.default)(schema);

          case 6:
            model = _context.sent;
            _context.next = 9;
            return (0, _resolversLoader2.default)({ schema: schema, model: model });

          case 9:
            resolver = _context.sent;


            (0, _tests2.default)({ schema: schema, resolver: resolver });

            _context.next = 13;
            return (0, _databasesLoader2.default)();

          case 13:
            _context.t0 = _context.sent;
            _context.next = 16;
            return (0, _environmentLoader2.default)();

          case 16:
            _context.t1 = _context.sent;
            _context.next = 19;
            return (0, _middlewareLoader2.default)();

          case 19:
            _context.t2 = _context.sent;
            _context.t3 = model;
            _context.t4 = resolver;
            _context.next = 24;
            return (0, _routesLoader2.default)();

          case 24:
            _context.t5 = _context.sent;
            _context.t6 = schema;
            return _context.abrupt('return', {
              databaseLoader: _context.t0,
              configLoader: _context.t1,
              middlewareLoader: _context.t2,
              modelLoader: _context.t3,
              resolverLoader: _context.t4,
              routeLoader: _context.t5,
              schemaLoader: _context.t6
            });

          case 29:
            _context.prev = 29;
            _context.t7 = _context['catch'](0);

            console.log(_context.t7);

          case 32:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 29]]);
  }));

  function loaders() {
    return _ref.apply(this, arguments);
  }

  return loaders;
}();
//# sourceMappingURL=index-loader.js.map