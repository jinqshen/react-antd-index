import { asyncRoutes } from '@/router';

const setRoutes = (routes) => {
	return {
		type: 'SET_ROUTES',
		data: routes
	}
}

const resetRoutes = () => {
	return {
		type: 'RESET_ROUTES'
	}
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role));
	} else {
		return true;
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	const res = [];

	routes.forEach(route => {
		const tmp = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
  
	return res;
}

const generateRoutes = (roles) => (dispatch, getState) => {
	let accessedRoutes;
	if(roles.includes('admin')) {
		accessedRoutes = asyncRoutes || [];
	} else {
		accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
	}
	dispatch(setRoutes(accessedRoutes));
}

export {
  generateRoutes,
  resetRoutes
}