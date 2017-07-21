import Bluebird from 'bluebird';
import glob from 'glob-promise';
import deepMerge from 'deepmerge';

const dist = `${process.cwd()}/server`;
const fs = Bluebird.promisifyAll(require('fs'));


export const capitalize = str => {
  const firstCharUpperCase = str.charAt(0).toUpperCase();
  return `${firstCharUpperCase}${str.substr(1, str.length - 1)}`;
};

export const classMethods = ({ currentName, modulePrototype, Obj }) => {
  const objInstance = new Obj();

  return modulePrototype.reduce((prev, curr) => {
    if (curr === 'undefined' ||
      (objInstance[curr].name === currentName && 
      objInstance[curr].name == null)
    ) {
      return prev;

    } else {
      return {
        ...prev,
        [objInstance[curr].name]: objInstance[curr]
      };
    }
  }, {});
};


export const cleanObj = obj => {
  Object.keys(obj).forEach(key =>
    ((obj[key] && typeof obj[key] === 'object') && cleanObj(obj[key])) ||
    ((obj[key] === undefined || obj[key] === null) && delete obj[key])
  );
  return obj;
};


export const createClass = function () { 
  function defineProperties (target, props) { 
    for (var i = 0; i < props.length; i++) { 
      var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; 
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


export const merge = objects => objects.reduce((previous, current) => {
  return deepMerge(previous, current);
}, {});


export async function mergeGlobPathsAsync (fileName) {
  return async function () {
    try {
      return globModulePathsAsync(fileName)
        .then(result => [ ...arguments[0], ...result ]);
    } catch (error) {
      console.log(error);
    }
  };
}

export const readFile = async filePath => {
  try {
    return await fs.readFileAsync(filePath, 'utf8');
  } catch (error) {
    process.stdout.write(error);
  }
};


export const readModuleFile = async moduleFilePath => {
  try {
    const filePath = await glob(`${dist}/modules/${moduleFilePath}`);
    return await fs.readFileAsync(filePath[0], 'utf8');

  } catch (error) {
    process.stdout.write(error);
  }
};


export const globGQLModulePathsAsync = fileNamePrefix => {
  return glob(`${dist}/modules/**/${fileNamePrefix}*.graphql`)
    .catch((error) => process.stdout.write(error));
};


export const globModulePathsAsync = fileNamePrefix => {
  return glob(`${dist}/modules/**/${fileNamePrefix}*.js`)
    .catch((error) => process.stdout.write(error));
};

export const globPathsAsync = fileName => {
  return glob(`${dist}/**/${fileName}`)
    .catch((error) => process.stdout.write(error));
};


export const logAsync = async value => {
  try {
    return await value;
  } catch (error) {
    process.stdout.write(error);
  }
};


export const pipeAsync = sequence => async initialValue => {
  try {
    return await Bluebird.reduce(sequence, async (previous, current) => {
      try {
        return await current(previous);
      } catch (error) {
        process.stdout.write(error);
      }
    }, initialValue)
    .catch(error => process.stdout.write(error));
  } catch (error) {
    process.stdout.write(error);
  }
};


export const getAllMethods = (obj) => {
  let props = [];

  do {
    const l = Object.getOwnPropertyNames(obj)
        .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
        .sort()
        .filter((p, i, arr) =>
            typeof obj[p] === 'function' &&
            (i == 0 || p !== arr[i - 1]) &&
            props.indexOf(p) === -1
        );
    props = props.concat(l);
  }
  while (
      (obj = Object.getPrototypeOf(obj)) &&
      Object.getPrototypeOf(obj)
  );

  return props;
};

export const getMethods = (obj) => {
  let props = [];

  do {
    const l = Object.getOwnPropertyNames(obj)
        .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
        .sort()
        .filter((p, i, arr) =>
            typeof obj[p] === 'function' &&
            p !== 'constructor' && 
            (i == 0 || p !== arr[i - 1]) &&
            props.indexOf(p) === -1
        );
    props = props.concat(l);
  }
  while (
      (obj = Object.getPrototypeOf(obj)) &&
      Object.getPrototypeOf(obj)
  );

  return props;
};
