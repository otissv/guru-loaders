/*
* Database loader
*/

'use-strict';

import { globModulePathsAsync } from '../utils';
import camel from 'to-camel-case';

export default async function modelLoaderAsync () {
  try {
    const configPath = await globModulePathsAsync('model');

    return configPath.reduce((previousObj, path) => {
      const model = require(path).default;
      return {
        ...previousObj,
        [camel(model.name)]: model
      };
    }, {});
  } catch (error) {
    console.log(error);
  }
}
