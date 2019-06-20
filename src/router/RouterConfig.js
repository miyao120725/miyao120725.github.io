import CurrentVersion from '../pages/personal/ CurrentVersion';
import Home from '../pages/Home';
import Login from '../pages/login/Login';
// import Personal from '../pages/personal/Personal';

export const RouteMapConfig = [
    {
        path: '/',
        component: Home,
        auth: true
    },
    {
        path: '/login',
        component: Login,
        auth: false
    },
    {
        path: '/version',
        component: CurrentVersion,
        auth: true
    },
    {
        path: '/personal',
        component: Home,
        auth: true
    }
];