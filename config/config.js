export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            {
                path: 'puzzlecards',
                component: './puzzlecards',
            },
            {
                path: 'helloWorld',
                component: './HelloWorld',
            },
            {
                path: 'list',
                component: '../pages/list'
            },
            {
                path: '/dashboard',
                routes: [
                    {path: '/dashboard/analysis', component: 'Dashboard/Analysis'},
                    {path: '/dashboard/monitor', component: 'Dashboard/Monitor'},
                    {path: '/dashboard/workplace', component: 'Dashboard/Workplace'},
                ]
            }
            ]
    }],
};
