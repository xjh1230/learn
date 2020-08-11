import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/layout/index',
      routes: [
        {
          path: '/more',
          component: '@/pages/more/_layout',
          routes: [
            {
              path: '/more/index',
              component: '@/pages/more/index',
            },
            {
              path: '/more/protable',
              component: '@/pages/more/protable',
            },
          ],
        },
      ],
    },
  ],
});
