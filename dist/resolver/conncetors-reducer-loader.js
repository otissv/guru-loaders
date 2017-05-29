'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(loadedResolverModules) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _bluebird2.default.reduce(loadedResolverModules, function (previous, current) {
              var currentModule = current.module;
              if (current.module.prototype == null) return previous;

              var currentName = current.name;
              var Module = new current.module();
              var currentStaticProperties = Object.keys(Module);
              var previousModule = void 0;
              var previousMethods = void 0;
              var previousStaticProperties = [];

              if (previous[currentName]) {
                previousModule = new previous[currentName]();
                previousStaticProperties = Object.keys(previousModule);

                previousMethods = (0, _utils.classMethods)({
                  currentName: currentName,
                  modulePrototype: (0, _utils.getAllMethods)(previous[currentName].prototype),
                  Obj: previous[currentName]
                });
              } else {
                previousMethods = {};
              }

              var currentMethods = (0, _utils.classMethods)({
                currentName: currentName,
                modulePrototype: (0, _utils.getAllMethods)(currentModule.prototype),
                Obj: currentModule
              });

              var methods = (0, _utils.merge)([previousMethods, currentMethods]);

              // create new class

              var Constructor = function Constructor() {
                _classCallCheck(this, Constructor);
              };

              // set class name to current module name


              Object.defineProperty(Constructor, 'name', {
                value: (0, _utils.capitalize)(current.name),
                writable: false
              });

              function defineProperties(_ref2) {
                var constructor = _ref2.constructor,
                    _ref2$protoProps = _ref2.protoProps,
                    protoProps = _ref2$protoProps === undefined ? [] : _ref2$protoProps,
                    _ref2$staticProps = _ref2.staticProps,
                    staticProps = _ref2$staticProps === undefined ? [] : _ref2$staticProps;

                var props = protoProps.length > 0 && protoProps || staticProps;
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = false;
                  descriptor.configurable = true;

                  if (protoProps.length > 0) {
                    Object.defineProperty(constructor.prototype, descriptor.name, {
                      value: descriptor
                    });
                  }
                  if (staticProps.length > 0) {
                    Object.defineProperty(constructor.prototype, descriptor.key, {
                      value: descriptor.value
                    });
                  }
                }
              }

              // add static properties to Constructor
              var staticProps = [].concat(_toConsumableArray(currentStaticProperties), _toConsumableArray(previousStaticProperties)).map(function (key) {
                return { key: key, value: Module[key] };
              });

              defineProperties({
                constructor: Constructor,
                staticProps: staticProps
              });

              // add prototype properties to Constructor
              defineProperties({
                constructor: Constructor,
                protoProps: Object.keys(methods).map(function (key) {
                  return methods[key];
                })
              });

              return _extends({}, previous, _defineProperty({}, current.name, Constructor));
            }, {}).catch(function (error) {
              return console.log(error);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function connectorReducerAsync(_x) {
    return _ref.apply(this, arguments);
  }

  return connectorReducerAsync;
}();
//# sourceMappingURL=conncetors-reducer-loader.js.map