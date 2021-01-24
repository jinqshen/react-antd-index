import { Navigate } from 'react-router-dom';
import { ReadOutlined, HomeOutlined, LockOutlined, TableOutlined, SketchOutlined, UserOutlined, ControlOutlined } from '@ant-design/icons';
import Login from '@/components/Login';
import Home from '@/components/Home';
import Article from '@/components/Article';
import DashBoard from '@/components/DashBoard';
import Technical from '@/components/Technical';
import ArticleMgr from '@/components/ArticleMgr';
import UserMgr from '@/components/UserMgr';
import Permission from '@/components/Permission';
import NotFound from '@/components/NotFound';


export const constantRoutes = [
    {
        path: '/',
        element: <Navigate to='/react-admin/dashboard' />,
        hidden: true
    }, {
        path: '/login',
        element: <Navigate to='/react-admin/dashboard' />,
        hidden: true
    }, {
        path: '/react-admin',
        element: <Home />,
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                element: <DashBoard />,
                meta: { title: 'menu.home', icon: <HomeOutlined /> }
            }
        ],
        onlyOne: true
    }, {
        name: 'bookstore',
        path: "/react-admin",
        element: <Home />,
        children: [
            {
                name: 'article',
                path: '/bookstore/article',
                element: <Article />,
                meta: { title: 'menu.article', icon: <ReadOutlined /> }
            }, {
                name: 'technical',
                path: '/bookstore/technical',
                element: <Technical />,
                meta: { title: 'menu.technical', icon: <SketchOutlined /> }
            }
        ],
        meta: { title: 'menu.bookstore', icon: <ReadOutlined /> }
    }, {
        name: 'permission',
        path: "/react-admin",
        element: <Home />,
        children: [
            {
                name: 'changerole',
                path: '/permission/changerole',
                element: <Permission />,
                meta: { title: 'menu.permissiontest', icon: <ControlOutlined /> }
            }
        ],
        meta: { title: 'menu.permission', icon: <LockOutlined /> }
    }
]

export const asyncRoutes = [
    {
        name: 'manager',
        path: "/react-admin",
        element: <Home />,
        children: [
            {
                name: 'articlemgr',
                path: '/manager/articlemgr',
                element: <ArticleMgr />,
                meta: { title: 'menu.articlemgr', icon: <ReadOutlined /> }
            }, {
                name: 'usermgr',
                path: '/manager/usermgr',
                element: <UserMgr />,
                meta: { title: 'menu.usermgr', icon: <UserOutlined /> }
            }
        ],
        meta: { title: 'menu.manager', icon: <TableOutlined />, roles: ['admin', 'editor'] }
    }, {
        name: 'error',
        path: "/react-admin",
        element: <Home />,
        children: [
            {
                name: 'notfound',
                path: '/notfound',
                element: <NotFound />,
                hidden: true,
                meta: { title: '404' }
            }
        ],
        hidden: true
    }, {
        path: '*',
        element: <Navigate to='/react-admin/notfound' />,
        hidden: true
    }
];

export const unAuthRoutes = [
    {
        name: 'login',
        path: '/login',
        element: <Login />,
        meta: { title: 'menu.login' }
    }, {
        path: '*',
        element: <Navigate to='/login' />
    }
]