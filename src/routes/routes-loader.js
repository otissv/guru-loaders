/*
*  Routes loader
*/

'use-strict';

import { globPathsAsync } from '../utils';

export default async function routesLoaderAsync () {
  try {
    const configPath = await globPathsAsync('core/**/index-routes.js');
    const routes = require(configPath[0]);
    return routes.default;
  } catch (error) {
    console.log(error);
  }
}
