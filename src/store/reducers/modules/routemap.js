import { constantRoutes, asyncRoutes, unAuthRoutes } from '@/router';

const generateRouteMap = () => {
    const routes = constantRoutes.concat(asyncRoutes).concat(unAuthRoutes);
    let obj = {};
    route2map(routes, obj);
    return obj;
}

const route2map = (routes, obj, prefix) => {
    routes.forEach((route) => {
        if(route.meta && route.name) {
            obj[route.name] = {};
            obj[route.name].title = route.meta.title;
            obj[route.name].path = prefix ? prefix + route.path : route.path;
        }
        if(Array.isArray(route.children) && route.children.length > 0) {
            let prefix_tmp = prefix ? prefix + route.path : route.path;
            route2map(route.children, obj, prefix_tmp);
        }
    });
}

const routemap = (state = generateRouteMap(), action) => {
    return state;
}

export default routemap;