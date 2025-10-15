# dov - 基于JSON配置的小程序静态化框架

采取“小程序代码固定 + JSON配置更新”的模式，**开发无代码、静态轻运维**。更新小程序，只需更改CDN上的JSON配置即可。

特点：
 - **无代码**：仅需初始化发布一次
 - **无发布**：修改JSON即可实现变更
 - **轻架构**：轻松对接云CDN架构，可支撑海量请求


## 示例

源码附在本工程内的`miniprogram/`，微信扫码体验：

![Hi多福](./hidov.jpg)


## 快速开始

1. 复制工程代码到本地，使用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)打开。

2. 因为是走本地运行模式，因此需要替换`miniprogram/app.js` 和 `miniprogram/manifest/index-1.0.json` 中的127.0.0.1后的端口，可以通过微信开发者工具network抓包的Referer看到真实端口（端口在每次重启开发者工具会更新）。

3. 调试正常后，在[小程序MP](https://mp.weixin.qq.com/)上申请真实的appid，并走提审发布即可。

也可以在现有小程序中，`npm install -S dov-miniapp` 手动安装此包，进行混合应用。

注意，每次更新npm包版本后，需要在微信开发者工具，选择“工具 -> 构建npm”使生效，详见[小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)。


## 配置文档

配置文件均在 `manifest/` 下，按需修改。整体层级`struct`遵循：**site -  channel - page - module - component**。

### C1 "struct": "site" 级功能
#### C1.1 开启分享
```
{
  "struct": "site",
  "settings": {
    "shareInfo": {
      "title": "${default}",
      "path": "${default}",
      "query": "${default}",
      "image": "${default}"
    }
  }
}
```
可以组合指定分享文案，其中的模板变量：
 - ${default}: 优先取 `page` 配置的title字段，`site` 保底
 - ${logo}：取 `site` 的icon字段

#### C1.2 全局样式定制
```
{
  "struct": "site",
  "settings": {
    "style": {
      "--cell-font-size": "22px"
    }
  }
}
```
名称和控制范围，可参考[有赞style var](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)。

### C2 "struct": "channel" 级功能
#### C2.1 指定底部tab的图标
```
{
  "struct": "channel",
  "icon": "/static/icon/reading-default.png",
  "iconActive": "/static/icon/reading.png",
}
```

### C3 "struct": "page" 级功能
#### C3.1 设置屏幕常亮
```
{
  "struct": "page",
  "settings": {
    "keepScreenOn": true
  }
}
```

### C4 "struct": "module" 级功能
#### C4.1 隐藏模块标题
```
{
  "struct": "module",
  "settings": {
    "hideTitle": true
  }
}
```

### C5 "struct": "component" 级功能

支持的组件如下表。

| 组件名称 | 功能             |
| -------- | ---------------- |
| card     | 图文卡           |
| cell     | 通栏条，支持折叠 |
| grid     | 网格             |
| player   | 音乐播放器       |


## Todos

* 页面背景色设置，目前还在pages/*.wxss设置
* 字体加载走配置，当前还未真机生效
* JSON 配置文件的可视化工具，让内容变更更便捷
* 更多结合服务端提供的插件功能，如留言板
* 设置启动音频：位于`app.js`里，待迁移到配置
* 配置操作反馈`settings.feedback`，待支持
* 接入意见反馈兔小槽，待优化样式


## 加入贡献

欢迎加入，提交MR。

本地调试：调试中JSON数据文件频繁变更，可以指定本地文件。可将请求远程URL替换为本地，如：`http://127.0.0.1:PORT/appservice/manifest/`。其中端口号PORT可在network抓包查看`header`的`Referer`中获取。

相关资源：
* 支持的图标库：https://www.iconfont.cn/collections/detail?cid=31945
* 本地开发：`npm run dev`，改动后在小程序开发者工具构建npm

路由结构：
* path：都是 `pages/dov`，参数内置有channel、page、pagelet三个页面路由层级
* channel：底部一级导航
* page：顶部二级导航，如 channel=/watching&page=/watching/documentary",
* pagelet：半屏页面，如 pagelet=/wood/hongmu/tanxiangzitan

## 致谢

 - UI 方案：<https://youzan.github.io/vant-weapp/>
 - 图标方案：<https://openmoji.org/>
 - 多福 & 妈妈

Built with love.
