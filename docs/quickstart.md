# 快速上手

## 使用之前

在开始使用之前，你需要先阅读 [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/) 的相关文档。

## 如何使用

首先到 [GitHub](https://github.com/wux-weapp/wux-weapp/) 下载 `Wux Weapp` 的代码，然后 将`dist/` 目录拷贝到自己的项目中。按照如下的方式使用组件，以 Badge 为例，其它组件在对应的文档页查看：

### 在 page.json 中引入组件

```json
"usingComponents": {
    "wux-badge": "../../dist/badge/index"
}
```

### 在 page.wxml 中使用组件

```html
<wux-badge count="22" />
<wux-badge count="44" />
<wux-badge count="66" />
```

## 预览

您可以扫描下方的小程序码体验或用 [微信web开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html) 打开 `example` 目录（请注意，是 example 目录，不是整个项目）。

![logo](_images/qrcode.jpg)