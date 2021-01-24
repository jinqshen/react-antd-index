import { constantRoutes, asyncRoutes, unAuthRoutes } from '@/router';

const generateTitleMap = () => {
    const routes = constantRoutes.concat(asyncRoutes).concat(unAuthRoutes);
    let obj = {};
    route2title(routes, obj);
    return obj;
}

const route2title = (routes, obj) => {
    routes.forEach((route) => {
        if(route.meta && route.name) {
            obj[route.name] = route.meta.title;
        }
        if(Array.isArray(route.children) && route.children.length > 0) {
            route2title(route.children, obj);
        }
    });
}

const title = (state = generateTitleMap(), action) => {
    return state;
}

export default title;