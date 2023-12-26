---
outline: deep
---

# 运行时API示例

本页演示了VitePress提供的一些运行时API的用法。

该`useData（）` API可用于访问当前页面的网站、主题和页面数据。它在“.md”和“.vue”文件中都有效：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 输出结果

### 主题数据
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置数据
<pre>{{ frontmatter }}</pre>

## More

更多请查看文档 [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
