import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小阿俊的博客",
  description: "代码知识点归纳",
  head:[['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/src/examples/markdown-examples' }
    ],
    search:{
      provider: 'local'
    },
    sidebar: [
      {
        text: '开始',
        collapsed: false,
        items: [
          { text: 'Markdown 示例', link: '/src/examples/markdown-examples' },
          { text: '运行时API 示例', link: '/src/examples/api-examples' }
        ]
      },
      {
        text:'web API合集',
        collapsed:false,
        items:[
          { text: 'web Serial串口', link: '/src/webAPI/webSerial' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
