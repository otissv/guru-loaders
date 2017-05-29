/*
* Middleware loader
*/

'use-strict';

import { globPathsAsync } from '../utils';

export default async function middlewareLoaderAsync () {
  try {
    const configPath = await globPathsAsync('core/**/index-middleware.js');
    const middleware = require(configPath[0]);
    return middleware;
  } catch (error) {
    console.log(error);
  }
}
