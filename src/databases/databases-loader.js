/*
* Database loader
*/

'use-strict';

import { globPathsAsync } from '../utils';

export default async function databasesLoaderAsync () {
  try {
    const configPath = await globPathsAsync('core/databases.js');

    return require(configPath[0]);
  } catch (error) {
    console.log(error);
  }
}
