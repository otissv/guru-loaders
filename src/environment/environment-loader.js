/*
*  Config loader
*/

'use-strict';

import { globPathsAsync } from '../utils';

export default async function environmentLoaderAsync () {
  try {
    const configPath = await globPathsAsync('environment.js');
    const config = require(configPath[0]);
    return config.default;
  } catch (error) {
    console.log(error);
  }
}
