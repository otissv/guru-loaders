'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMethods = exports.getAllMethods = exports.pipeAsync = exports.logAsync = exports.globPathsAsync = exports.globModulePathsAsync = exports.globGQLModulePathsAsync = exports.readModuleFile = exports.readFile = exports.mergeGlobPathsAsync = exports.merge = exports.createClass = exports.cleanObj = exports.classMethods = exports.capitalize = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var mergeGlobPathsAsync = exports.mergeGlobPathsAsync = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(fileName) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              var _arguments = arguments;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      return _context.abrupt('return', globModulePathsAsync(fileName).then(function (result) {
                        return [].concat(_toConsumableArray(_arguments[0]), _toConsumableArray(result));
                      }));

                    case 4:
                      _context.prev = 4;
                      _context.t0 = _context['catch'](0);

                      console.log(_context.t0);

                    case 7:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, this, [[0, 4]]);
            })));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function mergeGlobPathsAsync(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dist = process.cwd() + '/server';
var fs = _bluebird2.default.promisifyAll(require('fs'));

var capitalize = exports.capitalize = function capitalize(str) {
  var firstCharUpperCase = str.charAt(0).toUpperCase();
  return '' + firstCharUpperCase + str.substr(1, str.length - 1);
};

var classMethods = exports.classMethods = function classMethods(_ref) {
  var currentName = _ref.currentName,
      modulePrototype = _ref.modulePrototype,
      Obj = _ref.Obj;

  var objInstance = new Obj();

  return modulePrototype.reduce(function (prev, curr) {
    if (curr === 'undefined' || objInstance[curr].name === currentName && objInstance[curr].name == null) {
      return prev;
    } else {
      return _extends({}, prev, _defineProperty({}, objInstance[curr].name, objInstance[curr]));
    }
  }, {});
};

var cleanObj = exports.cleanObj = function cleanObj(obj) {
  Object.keys(obj).forEach(function (key) {
    return obj[key] && _typeof(obj[key]) === 'object' && cleanObj(obj[key]) || (obj[key] === undefined || obj[key] === null) && delete obj[key];
  });
  return obj;
};

var createClass = exports.createClass = function createClass() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
};

var merge = exports.merge = function merge(objects) {
  return objects.reduce(function (previous, current) {
    return (0, _deepmerge2.default)(previous, current);
  }, {});
};

var readFile = exports.readFile = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(filePath) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return fs.readFileAsync(filePath, 'utf8');

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3['catch'](0);

            process.stdout.write(_context3.t0);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 6]]);
  }));

  return function readFile(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

var readModuleFile = exports.readModuleFile = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(moduleFilePath) {
    var filePath;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _globPromise2.default)(dist + '/modules/' + moduleFilePath);

          case 3:
            filePath = _context4.sent;
            _context4.next = 6;
            return fs.readFileAsync(filePath[0], 'utf8');

          case 6:
            return _context4.abrupt('return', _context4.sent);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4['catch'](0);

            process.stdout.write(_context4.t0);

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 9]]);
  }));

  return function readModuleFile(_x3) {
    return _ref5.apply(this, arguments);
  };
}();

var globGQLModulePathsAsync = exports.globGQLModulePathsAsync = function globGQLModulePathsAsync(fileNamePrefix) {
  return (0, _globPromise2.default)(dist + '/modules/**/' + fileNamePrefix + '*.graphql').catch(function (error) {
    return process.stdout.write(error);
  });
};

var globModulePathsAsync = exports.globModulePathsAsync = function globModulePathsAsync(fileNamePrefix) {
  return (0, _globPromise2.default)(dist + '/modules/**/' + fileNamePrefix + '*.js').catch(function (error) {
    return process.stdout.write(error);
  });
};

var globPathsAsync = exports.globPathsAsync = function globPathsAsync(fileName) {
  return (0, _globPromise2.default)(dist + '/**/' + fileName).catch(function (error) {
    return process.stdout.write(error);
  });
};

var logAsync = exports.logAsync = function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(value) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return value;

          case 3:
            return _context5.abrupt('return', _context5.sent);

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5['catch'](0);

            process.stdout.write(_context5.t0);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 6]]);
  }));

  return function logAsync(_x4) {
    return _ref6.apply(this, arguments);
  };
}();

var pipeAsync = exports.pipeAsync = function pipeAsync(sequence) {
  return function () {
    var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(initialValue) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _bluebird2.default.reduce(sequence, function () {
                var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(previous, current) {
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.prev = 0;
                          _context6.next = 3;
                          return current(previous);

                        case 3:
                          return _context6.abrupt('return', _context6.sent);

                        case 6:
                          _context6.prev = 6;
                          _context6.t0 = _context6['catch'](0);

                          process.stdout.write(_context6.t0);

                        case 9:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, _callee6, undefined, [[0, 6]]);
                }));

                return function (_x6, _x7) {
                  return _ref8.apply(this, arguments);
                };
              }(), initialValue).catch(function (error) {
                return process.stdout.write(error);
              });

            case 3:
              return _context7.abrupt('return', _context7.sent);

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7['catch'](0);

              process.stdout.write(_context7.t0);

            case 9:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 6]]);
    }));

    return function (_x5) {
      return _ref7.apply(this, arguments);
    };
  }();
};

var getAllMethods = exports.getAllMethods = function getAllMethods(obj) {
  var props = [];

  do {
    var l = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj).map(function (s) {
      return s.toString();
    })).sort().filter(function (p, i, arr) {
      return typeof obj[p] === 'function' && (i == 0 || p !== arr[i - 1]) && props.indexOf(p) === -1;
    });
    props = props.concat(l);
  } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

  return props;
};

var getMethods = exports.getMethods = function getMethods(obj) {
  var props = [];

  do {
    var l = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj).map(function (s) {
      return s.toString();
    })).sort().filter(function (p, i, arr) {
      return typeof obj[p] === 'function' && p !== 'constructor' && (i == 0 || p !== arr[i - 1]) && props.indexOf(p) === -1;
    });
    props = props.concat(l);
  } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));

  return props;
};
//# sourceMappingURL=utils.js.map