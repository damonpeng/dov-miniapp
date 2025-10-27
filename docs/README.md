# dov-miniapp 完整使用文档

## 目录

- [概述](#概述)
- [快速开始](#快速开始)
- [核心概念](#核心概念)
- [JSON结构规范](#json结构规范)
- [组件文档](#组件文档)
- [配置功能](#配置功能)
- [路由系统](#路由系统)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)

---

## 概述

### 什么是 dov-miniapp？

dov-miniapp 是一个基于JSON配置的微信小程序静态化框架，采用"小程序代码固定 + JSON配置更新"的模式，实现**开发无代码、静态轻运维**。

### 核心特点

- **无代码更新**：仅需初始化发布一次小程序代码
- **无需发布**：修改JSON配置即可实现内容变更
- **轻量架构**：轻松对接云CDN架构，可支撑海量请求
- **类CMS系统**：通过JSON管理所有内容，无需后端数据库

### 技术栈

- **UI框架**：[Vant Weapp](https://youzan.github.io/vant-weapp/)
- **图标库**：[OpenMoji](https://openmoji.org/)
- **开发语言**：TypeScript
- **配置格式**：JSON

---

## 快速开始

### 1. 安装

#### 方式一：直接使用源码

```bash
# 克隆项目
git clone <repository-url>
cd dov-miniapp

# 使用微信开发者工具打开项目
```

#### 方式二：npm安装（混合应用）

```bash
npm install -S dov-miniapp
```

安装后需要在微信开发者工具中选择"工具 -> 构建npm"使生效。

### 2. 本地调试配置

因为是走本地运行模式，需要替换以下文件中的端口号：

- `miniprogram/app.js`
- `miniprogram/manifest/index-1.0.json`

将 `127.0.0.1` 后的端口替换为实际端口。端口号可通过微信开发者工具的 Network 抓包，查看 Referer 获取（每次重启开发者工具会更新）。

**示例**：
```json
{
  "script": "http://127.0.0.1:17208/appservice/manifest/reading/s1-${version}.json"
}
```

### 3. 发布上线

1. 在[小程序MP](https://mp.weixin.qq.com/)上申请真实的appid
2. 将JSON配置文件部署到CDN
3. 修改配置中的URL为CDN地址
4. 提交审核发布

---

## 核心概念

### 层级结构

dov-miniapp 采用五层嵌套结构，通过 `struct` 字段标识：

```
site (站点)
  └── channel (频道/底部Tab)
      └── page (页面/顶部Tab)
          └── module (模块)
              └── component (组件)
```

### 特殊层级：pagelet

`pagelet` 是一个特殊的半屏页面层级，用于展示详情内容，不属于主层级结构。

### 数据流转

1. **入口**：`index-1.0.json` (site级配置)
2. **动态加载**：通过 `script` 字段指定远程JSON地址
3. **版本控制**：通过 `version` 字段实现配置版本管理

---

## JSON结构规范

### 通用字段

所有层级都支持以下基础字段：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | string | ✅ | 结构类型：site/channel/page/module/component/pagelet |
| `title` | string | ✅ | 标题 |
| `router` | string | ✅ | 路由路径 |
| `items` | array | - | 子项列表 |
| `settings` | object | - | 配置项 |
| `desc` | string | - | 描述 |

### 1. Site 级配置

站点级配置是整个小程序的入口文件，通常命名为 `index-1.0.json`。

#### 完整示例

```json
{
  "struct": "site",
  "title": "Hi多福",
  "icon": "/static/icon/logo.png",
  "plugins": {
    "txc": {
      "productId": 0
    }
  },
  "settings": {
    "style": {
      "--cell-font-size": "22px",
      "--button-primary-background-color": "#07c160"
    },
    "shareInfo": {
      "title": "${default}",
      "path": "${default}",
      "query": "${default}",
      "image": "${default}"
    }
  },
  "items": [
    {
      "struct": "channel",
      "router": "/index",
      "title": "首页",
      "icon": "/static/icon/home-default.png",
      "iconActive": "/static/icon/home.png",
      "items": []
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `icon` | string | 站点图标 |
| `plugins` | object | 插件配置（如兔小巢反馈） |
| `settings.style` | object | 全局样式变量 |
| `settings.shareInfo` | object | 分享配置 |

#### 分享配置模板变量

- `${default}`: 优先取 page 配置的 title 字段，site 保底
- `${logo}`: 取 site 的 icon 字段

---

### 2. Channel 级配置

频道对应小程序底部的 Tab 导航。

#### 完整示例

```json
{
  "struct": "channel",
  "router": "/reading",
  "title": "读古诗",
  "icon": "/static/icon/reading-default.png",
  "iconActive": "/static/icon/reading.png",
  "items": [
    {
      "struct": "page",
      "title": "唐诗三百首",
      "router": "/reading/s1",
      "script": "https://cdn.example.com/manifest/reading/s1-${version}.json",
      "version": "1.0"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `icon` | string | 未选中状态图标 |
| `iconActive` | string | 选中状态图标 |

---

### 3. Page 级配置

页面对应顶部的二级导航（如果有多个page）。

#### 完整示例

```json
{
  "struct": "page",
  "title": "🐥 一年级",
  "router": "/reading/s1",
  "version": "1.0",
  "settings": {
    "keepScreenOn": true
  },
  "items": [
    {
      "struct": "module",
      "title": "唐诗",
      "router": "/reading/s1/list",
      "items": []
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `script` | string | 远程JSON地址（支持版本变量） |
| `version` | string | 配置版本号 |
| `settings.keepScreenOn` | boolean | 是否保持屏幕常亮 |

---

### 4. Module 级配置

模块是页面内的内容分组。

#### 完整示例

```json
{
  "struct": "module",
  "title": "🎵 常听",
  "desc": "经典儿歌",
  "router": "/index/listening/music",
  "settings": {
    "hideTitle": true
  },
  "items": [
    {
      "struct": "component",
      "type": "grid",
      "items": []
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `settings.hideTitle` | boolean | 是否隐藏模块标题 |

---

### 5. Component 级配置

组件是实际渲染的UI元素。

#### 完整示例

```json
{
  "struct": "component",
  "type": "grid",
  "title": "播放列表",
  "items": [
    {
      "title": "Super Simple Songs",
      "desc": "磨耳朵系列",
      "poster": "https://example.com/poster.jpg",
      "link": "#小程序://QQ音乐/3ozn00yAvM5edCG"
    }
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `type` | string | 组件类型：card/cell/grid/player/swiper/image/map |
| `items` | array | 组件数据项 |

---

### 6. Pagelet 级配置

半屏详情页，用于展示详细内容。

#### 完整示例

```json
{
  "struct": "pagelet",
  "title": "檀香紫檀",
  "router": "/wood/hongmu/tanxiangzitan",
  "author": "林业专家",
  "images": [
    "/static/images/wood/tanxiangzitan-1.jpg",
    "/static/images/wood/tanxiangzitan-2.jpg"
  ],
  "texts": [
    ["学名", "Pterocarpus santalinus"],
    ["俗称", "小叶紫檀"],
    ["产地", "印度南部"]
  ]
}
```

#### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `author` | string | 作者 |
| `images` | array | 图片列表 |
| `texts` | array | 文本内容（二维数组，每项为[标签, 内容]） |

---

## 组件文档

### 1. Card 组件

图文卡片组件，用于展示图文混排内容。

#### 配置示例

```json
{
  "struct": "component",
  "type": "card",
  "items": [
    {
      "title": "标题",
      "desc": "描述文字",
      "thumb": "https://example.com/thumb.jpg",
      "link": "dov:#/pagelet/detail"
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 卡片标题 |
| `desc` | string | 卡片描述 |
| `thumb` | string | 缩略图URL |
| `link` | string | 点击跳转链接 |

---

### 2. Cell 组件

通栏条组件，支持折叠展开。

#### 配置示例

```json
{
  "struct": "component",
  "type": "cell",
  "title": "唐诗",
  "items": [
    {
      "title": "咏鹅",
      "author": "[唐] 骆宾王",
      "contents": [
        "鹅，鹅，鹅",
        "曲项向天歌",
        "白毛浮绿水",
        "红掌拨清波"
      ]
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标题 |
| `author` | string | 作者 |
| `contents` | array | 内容行数组 |
| `link` | string | 点击跳转链接 |

---

### 3. Grid 组件

网格布局组件，用于展示卡片列表。

#### 配置示例

```json
{
  "struct": "component",
  "type": "grid",
  "title": "播放列表",
  "items": [
    {
      "title": "Super Simple Songs",
      "desc": "磨耳朵系列",
      "poster": "https://example.com/poster.jpg",
      "link": "#小程序://QQ音乐/3ozn00yAvM5edCG"
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标题 |
| `desc` | string | 描述 |
| `poster` | string | 海报图URL |
| `link` | string | 点击跳转链接 |
| `external_link` | string | 外部链接（长按显示） |

---

### 4. Player 组件

音乐播放器组件。

#### 配置示例

```json
{
  "struct": "component",
  "type": "player",
  "items": [
    {
      "title": "歌曲名",
      "author": "歌手",
      "poster": "https://example.com/cover.jpg",
      "src": "https://example.com/music.mp3"
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 歌曲名 |
| `author` | string | 歌手 |
| `poster` | string | 封面图URL |
| `src` | string | 音频文件URL |

---

### 5. Swiper 组件

轮播图组件。

#### 配置示例

```json
{
  "struct": "component",
  "type": "swiper",
  "items": [
    {
      "image": "https://example.com/banner1.jpg",
      "link": "dov:#/pagelet/detail1"
    },
    {
      "image": "https://example.com/banner2.jpg",
      "link": "dov:#/pagelet/detail2"
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `image` | string | 图片URL |
| `link` | string | 点击跳转链接 |

---

### 6. Image 组件

单图展示组件。

#### 配置示例

```json
{
  "struct": "component",
  "type": "image",
  "items": [
    {
      "src": "https://example.com/image.jpg",
      "mode": "aspectFit"
    }
  ]
}
```

#### 数据项字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `src` | string | 图片URL |
| `mode` | string | 图片裁剪模式 |

---

### 7. Map 组件

地图组件（基于高德地图）。

#### 配置示例

```json
{
  "struct": "component",
  "type": "map",
  "items": [
    {
      "latitude": 39.9042,
      "longitude": 116.4074,
      "markers": [
        {
          "id": 1,
          "latitude": 39.9042,
          "longitude": 116.4074,
          "title": "天安门"
        }
      ]
    }
  ]
}
```

---

## 配置功能

### 1. 全局样式定制

在 site 级配置中设置全局样式变量：

```json
{
  "struct": "site",
  "settings": {
    "style": {
      "--cell-font-size": "22px",
      "--button-primary-background-color": "#07c160",
      "--button-primary-border-color": "#07c160"
    }
  }
}
```

支持的样式变量参考 [Vant Weapp 样式变量](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)。

---

### 2. 分享功能

在 site 级配置中开启分享：

```json
{
  "struct": "site",
  "settings": {
    "shareInfo": {
      "title": "${default}",
      "path": "${default}",
      "query": "${default}",
      "image": "${logo}"
    }
  }
}
```

**模板变量**：
- `${default}`: 优先使用当前页面的 title，否则使用 site 的 title
- `${logo}`: 使用 site 的 icon 字段

---

### 3. 屏幕常亮

在 page 级配置中设置：

```json
{
  "struct": "page",
  "settings": {
    "keepScreenOn": true
  }
}
```

适用场景：音乐播放、视频观看等需要长时间显示的页面。

---

### 4. 隐藏模块标题

在 module 级配置中设置：

```json
{
  "struct": "module",
  "settings": {
    "hideTitle": true
  }
}
```

---

## 路由系统

### 路由结构

dov-miniapp 使用统一的路由页面 `pages/dov`，通过参数区分不同层级：

```
pages/dov?channel=/reading&page=/reading/s1&pagelet=/wood/hongmu/tanxiangzitan
```

### 路由参数

| 参数 | 说明 | 示例 |
|------|------|------|
| `channel` | 底部一级导航 | `/reading` |
| `page` | 顶部二级导航 | `/reading/s1` |
| `pagelet` | 半屏详情页 | `/wood/hongmu/tanxiangzitan` |

### 链接协议

#### 1. dov 内部协议

```
dov:#/pagelet/script-url
```

用于打开 pagelet 半屏页面。

**示例**：
```json
{
  "link": "dov:#https://cdn.example.com/manifest/wood/hongmu/tanxiangzitan.json"
}
```

#### 2. 小程序跳转协议

```
#小程序://应用名/路径参数
```

用于跳转到其他小程序。

**示例**：
```json
{
  "link": "#小程序://QQ音乐/3ozn00yAvM5edCG"
}
```

#### 3. weapp 协议

```
weapp://appid/path
```

用于跳转到指定 appid 的小程序。

**示例**：
```json
{
  "link": "weapp://wx1234567890/pages/index/index"
}
```

---

## 最佳实践

### 1. 文件组织

推荐的目录结构：

```
manifest/
├── index-1.0.json          # 站点入口
├── reading/                # 频道目录
│   ├── s1-1.0.json        # 页面配置
│   ├── s2-1.0.json
│   └── poems/             # pagelet目录
│       ├── yonge.json
│       └── jiangnan.json
└── listening/
    └── list-1.0.json
```

### 2. 版本管理

使用版本号管理配置文件：

```json
{
  "script": "https://cdn.example.com/manifest/reading/s1-${version}.json",
  "version": "1.0"
}
```

更新内容时，修改版本号即可：
- `1.0` → `1.1`: 小更新
- `1.0` → `2.0`: 大更新

### 3. CDN部署

1. 将所有 JSON 文件上传到 CDN
2. 配置 CDN 缓存策略：
   - 入口文件 `index-1.0.json`: 短缓存（5分钟）
   - 其他配置文件: 长缓存（1天）
3. 使用版本号实现缓存更新

### 4. 图片资源

- 使用 CDN 托管图片
- 推荐尺寸：
  - 海报图: 750x750
  - 缩略图: 200x200
  - 轮播图: 750x400
- 格式: JPG/PNG/WebP

### 5. 性能优化

- 按需加载：使用 `script` 字段实现懒加载
- 图片优化：使用 WebP 格式，压缩图片大小
- 减少嵌套：避免过深的层级结构（建议不超过5层）

---

## 常见问题

### Q1: 如何更新小程序内容？

**A**: 只需修改 CDN 上的 JSON 配置文件，无需重新发布小程序。建议修改版本号以刷新缓存。

### Q2: 如何添加新的频道？

**A**: 在 `index-1.0.json` 的 `items` 数组中添加新的 channel 配置：

```json
{
  "items": [
    {
      "struct": "channel",
      "router": "/new-channel",
      "title": "新频道",
      "icon": "/static/icon/new-default.png",
      "iconActive": "/static/icon/new.png",
      "items": []
    }
  ]
}
```

### Q3: 如何自定义组件样式？

**A**: 在 site 级配置的 `settings.style` 中设置样式变量：

```json
{
  "settings": {
    "style": {
      "--cell-font-size": "24px",
      "--cell-line-height": "32px"
    }
  }
}
```

### Q4: 本地开发时端口号总是变化怎么办？

**A**: 可以使用 `npm run dev` 启动开发服务器，或者每次重启开发者工具后，通过 Network 抓包查看 Referer 获取新端口号。

### Q5: 如何实现详情页？

**A**: 使用 pagelet 结构，通过 `dov:#` 协议打开：

```json
{
  "link": "dov:#https://cdn.example.com/manifest/detail/item1.json"
}
```

### Q6: 支持哪些图标？

**A**: 支持 [iconfont](https://www.iconfont.cn/collections/detail?cid=31945) 图标库。

### Q7: 如何集成第三方小程序？

**A**: 使用小程序跳转协议：

```json
{
  "link": "#小程序://应用名/路径参数"
}
```

或使用 weapp 协议：

```json
{
  "link": "weapp://wx1234567890/pages/index/index"
}
```

---

## 开发调试

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发模式
npm run dev

# 构建
npm run build
```

### 调试技巧

1. **JSON 数据调试**：将远程 URL 替换为本地地址
   ```
   http://127.0.0.1:PORT/appservice/manifest/
   ```

2. **查看端口号**：在 Network 抓包查看 header 的 Referer

3. **构建 npm**：每次更新 npm 包后，需要在微信开发者工具选择"工具 -> 构建npm"

---

## 贡献指南

欢迎提交 MR 贡献代码！

### 相关资源

- UI 方案：https://youzan.github.io/vant-weapp/
- 图标方案：https://openmoji.org/
- 图标库：https://www.iconfont.cn/collections/detail?cid=31945

---

## 许可证

MIT License

---

## 致谢

- UI 方案：[Vant Weapp](https://youzan.github.io/vant-weapp/)
- 图标方案：[OpenMoji](https://openmoji.org/)
- 多福 & 妈妈

Built with ❤️
