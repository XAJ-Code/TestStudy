# Markdown 扩展示例

本页面演示了VitePress提供的一些内置的markdown扩展。

## 语法高亮

VitePress提供语法高亮显示，由[Shikiji](https://github.com/antfu/shikiji)提供支持，具有其他功能，如高亮显示线条：

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**生成**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details 点击查看更多细节
This is a details block.
:::
```

**生成**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details 点击查看更多细节
This is a details block.
:::

## 更多信息

查看文档 [full list of markdown extensions](https://vitepress.dev/guide/markdown).
