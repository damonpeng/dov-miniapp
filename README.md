# dov - 基于JSON配置的小程序静态化框架

**开发无代码、静态轻运维**：写好JSON配置，就完成了小程序开发。

## 设计思路

* 小程序：无需开发，极简内容发布一次即可。
* 配置文件：JSON标准格式，存储在CDN，支持版本管理。

特点：
 - **无代码**：仅需初始化发布一次
 - **无发布**：修改JSON即可实现变更
 - **轻架构**：轻松对接云CDN架构，可支撑海量请求


## 示例

微信扫码体验：
![Hi多福](./hidov.jpg)

源码参考：<https://github.com/damonpeng/dov-miniapp.git>


## 快速开始

### 1. 安装

```
npm install -S dov-miniapp
```

在微信开发者工具，选择“工具 -> 构建npm”，即可在项目中使用。

### 2. 发布小程序载体

完整代码包，见`miniprogram`文件夹。下载后，通过开发者工具提审发布一次即可，也可以融入普通小程序混合开发。
如何申请小程序，及代码提审发布流程，请查看微信官网文档。

### 3. 配置内容JSON

示例配置文件，见`manifest`文件夹，按需修改。


## 配置文档

按照`struct`层级：site -  channel - page - module - component 分级说明。

### "struct": "site" 级功能

#### 开启分享
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
```

其中：
 - ${default}: 优先取 `page` 配置的title字段，`site` 保底
 - ${logo}：取 `site` 的icon字段

#### 设置启动音频
```
App({
  async onLaunch(options) {
    this.dov.start({
      audio: '/static/media/loading.mp3'
    });
  }
})
```

### 配置操作反馈(todo)
```
{
  "struct": "site",
  "settings": {
    "feedback": {
      "audio": "AUDIO URL",
      "vibrate": true
    }
  }
}
```

### 接入意见反馈
兔小槽接入：https://txc.qq.com/helper/WEAPPGuide
```
{
  "struct": "site",
  "plugins": {
    "txc": {
      "productId": 具体ID
    }
  }
}
```

### "struct": "channel" 级功能



### "struct": "page" 级功能

#### 设置屏幕常亮

```
{
  "struct": "page",
  "settings": {
    "keepScreenOn": true
  }
}
```

### "struct": "module" 级功能

#### 隐藏模块标题
```
{
  "struct": "module",
  "settings": {
    "hideTitle": true
  }
}
```


### "struct": "component" 级功能

支持的组件如下表。

| 组件名称 | 功能             |
| -------- | ---------------- |
| card     | 图文卡           |
| cell     | 通栏条，支持折叠 |
| grid     | 网格             |
| player   | 音乐播放器       |
| swiper   | 图片轮播         |


### 全局样式定制
参见：https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less

## Todos

* 页面背景色设置，目前还在pages/*.wxss设置
* 字体加载走配置，当前还未真机生效
* JSON 配置文件的可视化工具，让内容变更更便捷
* 更多结合服务端提供的插件功能


## 加入贡献

欢迎加入，提交MR。

本地调试：调试中JSON数据文件频繁变更，可以指定本地文件。可将请求远程URL替换为本地，如：`http://127.0.0.1:PORT/appservice/manifest/`。其中端口号PORT可在network抓包查看`header`的`Referer`中获取。

## 致谢

 - UI 方案：<https://youzan.github.io/vant-weapp/>
 - 图标方案：<https://openmoji.org/>
 - 多福 & 妈妈

built with love.
