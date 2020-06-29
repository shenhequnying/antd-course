export default {
  plugins: [
    [
      "umi-plugin-react",
      {
        antd: true,
        dva: true,
      },
    ],
  ],
  routes: [
    {
      path: "/",
      component: "../layout",
      routes: [
        {
          path: "/",
          component: "../pages/index",
        },
        {
          path: "puzzlecards",
          component: "./puzzlecards",
        },
        {
          path: "helloWorld",
          component: "./HelloWorld",
        },
        {
          path: "list",
          component: "../pages/list",
        },
        {
          path: "test_edit_table",
          component: "../pages/test",
        },
        {
          path: "fuck_edit_table",
          component: "../pages/test2",
        },
        {
          path: "/dashboard",
          routes: [
            { path: "/dashboard/analysis", component: "Dashboard/Analysis" },
            { path: "/dashboard/monitor", component: "Dashboard/Monitor" },
            { path: "/dashboard/workplace", component: "Dashboard/Workplace" },
          ],
        },
        {
          path: "/sqltool",
          routes: [
            { path: "/sqltool/discovery", component: "../pages/test2" },
            {
              path: "/sqltool/livestudio",
              component: "../pages/sqltool/live_studio",
            },
            // {path: '/sqltool/discovery', component: 'SqlTool/Discovery'},
            {
              path: "/sqltool/product_item",
              component: "SqlTool/Product_Item",
            },
          ],
        },
      ],
    },
  ],
};
