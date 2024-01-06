# 日常小知识点练习
1. express---掘金课程
2. webcomponents
3. webWorkers
4. EJS--利用marked和ejs自动转换为html文档
5. vite使用及原理
6. preload和prefetch性能优化
   ```html
   <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 提前利用流浪器空闲时间加载资源 -->
  <link href="" rel="preload" />
  <!-- 预加载 -->
  <link href="" rel="prefetch" />
</head>

<body>
  <!-- 加载无顺序--加载完成立即执行,不会影响DOM渲染加载 -->
  <script async></script>
  <!-- 加载有顺序--加载完成不会立即执行,不会影响DOM渲染加载 -->
  <script defer></script>
</body>

</html>
   ```
