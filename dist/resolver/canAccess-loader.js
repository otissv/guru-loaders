/*
* Can access loader
*/

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const error = await globPathsAsync(error/error');

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref2) {
    var type = _ref2.type,
        locals = _ref2.locals;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!(type == null)) {
              _context2.next = 3;
              break;
            }

            throw new Error('canAccess: Action type cannot be null or undefined');

          case 3:
            return _context2.abrupt('return', function () {
              var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref4) {
                var args = _ref4.args,
                    context = _ref4.context,
                    fn = _ref4.fn;
                var accessPath, access, allowed;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _utils.globModulePathsAsync)('access');

                      case 2:
                        accessPath = _context.sent;
                        _context.prev = 3;
                        access = require(accessPath[0]);
                        _context.next = 7;
                        return access({ type: type, locals: locals });

                      case 7:
                        allowed = _context.sent;

                        if (allowed) {
                          _context.next = 12;
                          break;
                        }

                        return _context.abrupt('return', false);

                      case 12:
                        return _context.abrupt('return', fn({ args: args, context: context }));

                      case 13:
                        _context.next = 18;
                        break;

                      case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](3);

                        console.log(_context.t0);

                      case 18:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, this, [[3, 15]]);
              }));

              function validateAccess(_x2) {
                return _ref3.apply(this, arguments);
              }

              return validateAccess;
            }());

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

  function canAccessAsync(_x) {
    return _ref.apply(this, arguments);
  }

  return canAccessAsync;
}();
//# sourceMappingURL=canAccess-loader.js.map