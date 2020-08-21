module.exports = {
    title: 'Yuan\'s blog',
    description: '我的个人网站',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'manifest', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
      ['link', { rel: 'apple-touch-icon', href: '/logo.jpg' }],
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
      nav:[ // 导航栏配置
        {text: 'Leetcode习题本', link: '/leetcode/'},
        {text: 'JAVA基础', link: '/java/' },
      ],
      sidebar: {
          '/java/':[
            '',
          ],
          '/leetcode/':[
            '',
            'doublepoint',
            'dp',
            'bfs',
            'dfs',
            'backtrace'
        ],
      }
      //sidebar: 'auto', // 侧边栏配置
    },
    serviceWorker: true, // 是否开启 PWA,
  };