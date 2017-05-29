/*
* Can access loader
*/

'use strict';

import { globModulePathsAsync } from '../utils';

// const error = await globPathsAsync(error/error');

export default async function canAccessAsync ({ type, locals }) {
  try {
    if (type == null) {
      throw new Error('canAccess: Action type cannot be null or undefined');
    }

    return async function validateAccess ({ args, context, fn }) {
      const accessPath = await globModulePathsAsync('access');

      try {
        const access = require(accessPath[0]);
        const allowed = await access({ type, locals });

        if (!allowed) {
          // console.error(`${error.ERROR.ACCESS_DENIED.message.error} for action ${type}`);
          return false;
        } else {
          return fn({ args, context });
        }
      } catch (error) {
        console.log(error);
      }
    };
  } catch (error) {
    console.log(error);
  }
}
