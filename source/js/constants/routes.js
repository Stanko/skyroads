export const publicPath = '/';

export const routeCodes = {
  MAIN_MENU: publicPath,
  LEVEL_LIST: `${ publicPath }levels`,
  LEVEL: `${ publicPath }level/:levelId`,
  EDITOR_NEW: `${ publicPath }editor/`,
  EDITOR: `${ publicPath }editor/:levelId`,
};


export function getRoute(route, params = {}) {
  let routeWithParams = route;

  Object.keys(params).forEach(key => {
    // Optional param
    routeWithParams = routeWithParams.replace(`:${ key }?`, params[key]);
    // Mandatory param
    routeWithParams = routeWithParams.replace(`:${ key }`, params[key]);
  });

  return routeWithParams;
}
