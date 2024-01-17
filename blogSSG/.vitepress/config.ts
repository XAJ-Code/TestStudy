import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "小阿俊的博客",
  description: "代码知识点归纳",
  base: "/",
  srcDir:'.',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/src/examples/markdown-examples' }
    ],
    search: {
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
        text: 'web API合集',
        collapsed: false,
        items: [
          { text: 'web Serial串口', link: '/src/webAPI/webSerial' }
        ]
      },
      {
        text: 'NodeJs知识点',
        collapsed: false,
        items: [
          { text: 'nodeJs第一章概述', link: '/src/node/nodeChapter1' },
          { text: 'nodeJs第二章Bufer', link: '/src/node/NodeJS内置模块之buffer' },
          { text: 'nodejs第三章Crypoto', link: '/src/node/NodeJs内置模块-crypto', },
          { text: 'nodejs第四章Events', link: '/src/node/Node.js中的Events模块', },
          { text: 'nodejs第五章Zlib', link: '/src/node/NodeJs-之zlib文件压缩', }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
