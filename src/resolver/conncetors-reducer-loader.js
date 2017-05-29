import Bluebird from 'bluebird';

import { capitalize, classMethods, getAllMethods, merge } from '../utils';

export default async function connectorReducerAsync (loadedResolverModules) {
  return Bluebird.reduce(
    loadedResolverModules,
    (previous, current) => {
      const currentModule = current.module;
      if (current.module.prototype == null) return previous;

      const currentName = current.name;
      const Module = new current.module();
      const currentStaticProperties = Object.keys(Module);
      let previousModule;
      let previousMethods;
      let previousStaticProperties = [];

      if (previous[currentName]) {
        previousModule = new previous[currentName]();
        previousStaticProperties = Object.keys(previousModule);

        previousMethods = classMethods({
          currentName,
          modulePrototype: getAllMethods(previous[currentName].prototype),
          Obj: previous[currentName]
        });
      } else {
        previousMethods = {};
      }

      const currentMethods = classMethods({
        currentName,
        modulePrototype: getAllMethods(currentModule.prototype),
        Obj: currentModule
      });

      const methods = merge([previousMethods, currentMethods]);

      // create new class
      class Constructor {}

      // set class name to current module name
      Object.defineProperty(Constructor, 'name', {
        value: capitalize(current.name),
        writable: false
      });

      function defineProperties ({
        constructor,
        protoProps = [],
        staticProps = []
      }) {
        const props = (protoProps.length > 0 && protoProps) || staticProps;
        for (var i = 0; i < props.length; i++) {
          let descriptor = props[i];
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
      const staticProps = [
        ...currentStaticProperties,
        ...previousStaticProperties
      ].map(key => ({ key, value: Module[key] }));

      defineProperties({
        constructor: Constructor,
        staticProps
      });

      // add prototype properties to Constructor
      defineProperties({
        constructor: Constructor,
        protoProps: Object.keys(methods).map(key => methods[key])
      });

      return {
        ...previous,
        [current.name]: Constructor
      };
    },
    {}
  ).catch(error => console.log(error));
}
