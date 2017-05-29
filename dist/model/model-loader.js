'use strict';
/*
* Models loader
*/

'use string';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _isSchemaValid = require('is-schema-valid');

var _isSchemaValid2 = _interopRequireDefault(_isSchemaValid);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(schema) {
    var validationPaths, validation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _utils.globModulePathsAsync)('**/validation');

          case 3:
            validationPaths = _context.sent;
            validation = validationPaths.map(function (validation) {
              var mod = require(validation).default;
              return {
                name: mod.name,
                validation: mod
              };
            });
            return _context.abrupt('return', _bluebird2.default.reduce(schema.definition.models, function (previous, model) {
              var modelValidation = validation.filter(function (i) {
                return i.name === model.name;
              });
              var Validation = void 0;
              var validationField = void 0;

              if (modelValidation.length > 0) {
                Validation = new modelValidation[0].validation();
                validationField = (0, _utils.getMethods)(Validation)[0];
              }

              var schema = modelValidation.length > 0 ? (0, _utils.merge)([model.fields, _defineProperty({}, validationField, _extends({}, model.fields[validationField], {
                validation: Validation[validationField]
              }))]) : model.fields;

              return _extends({}, previous, _defineProperty({}, model.name, {
                schema: schema,
                isValid: function isValid(data) {
                  return (0, _isSchemaValid2.default)(schema)(data);
                }
              }));
            }, {}));

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  function modelLoaderAsync(_x) {
    return _ref.apply(this, arguments);
  }

  return modelLoaderAsync;
}();
//# sourceMappingURL=model-loader.js.map