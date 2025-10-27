# dov-miniapp 快速参考

快速查阅常用配置和代码片段。

---

## 层级结构速查

```
site (站点)
  ├── settings (全局设置)
  └── items[]
      └── channel (频道/底部Tab)
          └── items[]
              └── page (页面/顶部Tab)
                  └── items[]
                      └── module (模块)
                          └── items[]
                              └── component (组件)
                                  └── items[] (数据)

pagelet (半屏详情页) - 独立层级
```

---

## 常用配置模板

### 1. 新建频道

```json
{
  "struct": "channel",
  "router": "/new-channel",
  "title": "新频道",
  "icon": "/static/icon/new-default.png",
  "iconActive": "/static/icon/new.png",
  "items": [
    {
      "struct": "page",
      "title": "首页",
      "router": "/new-channel/index",
      "script": "https://cdn.example.com/manifest/new-channel/index-${version}.json",
      "version": "1.0"
    }
  ]
}
```

### 2. 新建页面

```json
{
  "struct": "page",
  "title": "页面标题",
  "router": "/channel/page",
  "version": "1.0",
  "items": [
    {
      "struct": "module",
      "title": "模块标题",
      "router": "/channel/page/module",
      "items": []
    }
  ]
}
```

### 3. 新建模块

```json
{
  "struct": "module",
  "title": "模块标题",
  "router": "/channel/page/module",
  "settings": {
    "hideTitle": false
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

---

## 组件速查

### Card 组件

```json
{
  "struct": "component",
  "type": "card",
  "items": [
    {
      "title": "标题",
      "desc": "描述",
      "thumb": "https://example.com/thumb.jpg",
      "link": "dov:#https://example.com/detail.json"
    }
  ]
}
```

### Cell 组件（折叠列表）

```json
{
  "struct": "component",
  "type": "cell",
  "title": "列表标题",
  "items": [
    {
      "title": "项目标题",
      "author": "作者",
      "contents": ["行1", "行2", "行3"]
    }
  ]
}
```

### Grid 组件（网格）

```json
{
  "struct": "component",
  "type": "grid",
  "title": "网格标题",
  "items": [
    {
      "title": "标题",
      "desc": "描述",
      "poster": "https://example.com/poster.jpg",
      "link": "#小程序://应用名/路径"
    }
  ]
}
```

### Player 组件（音乐播放器）

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

### Swiper 组件（轮播图）

```json
{
  "struct": "component",
  "type": "swiper",
  "items": [
    {
      "image": "https://example.com/banner.jpg",
      "link": "dov:#https://example.com/detail.json"
    }
  ]
}
```

### Image 组件

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

### Map 组件

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
          "title": "标记点"
        }
      ]
    }
  ]
}
```

---

## 链接协议速查

### dov 内部协议

```json
{
  "link": "dov:#https://cdn.example.com/manifest/detail.json"
}
```

### 小程序跳转

```json
{
  "link": "#小程序://QQ音乐/3ozn00yAvM5edCG"
}
```

### weapp 协议

```json
{
  "link": "weapp://wx1234567890/pages/index/index"
}
```

---

## Settings 速查

### 全局样式

```json
{
  "settings": {
    "style": {
      "--cell-font-size": "22px",
      "--cell-line-height": "28px",
      "--button-primary-background-color": "#07c160"
    }
  }
}
```

### 分享配置

```json
{
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

### 屏幕常亮

```json
{
  "settings": {
    "keepScreenOn": true
  }
}
```

### 隐藏标题

```json
{
  "settings": {
    "hideTitle": true
  }
}
```

---

## 常用样式变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--cell-font-size` | 单元格字体大小 | `14px` |
| `--cell-line-height` | 单元格行高 | `24px` |
| `--button-primary-background-color` | 主按钮背景色 | `#07c160` |
| `--button-primary-border-color` | 主按钮边框色 | `#07c160` |
| `--button-default-background-color` | 默认按钮背景色 | `#fff` |
| `--button-default-border-color` | 默认按钮边框色 | `#ebedf0` |

更多变量参考：[Vant Weapp 样式变量](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)

---

## 路由规范

### 命名规则

- 必须以 `/` 开头
- 使用小写字母和连字符
- 层级之间用 `/` 分隔

### 示例

```
/reading                    # channel
/reading/s1                 # page
/reading/s1/list            # module
/wood/hongmu/tanxiangzitan  # pagelet
```

---

## 版本管理

### 版本号格式

```
major.minor
```

### 示例

```
1.0  # 初始版本
1.1  # 小更新（内容修改）
2.0  # 大更新（结构变化）
```

### 使用版本变量

```json
{
  "script": "https://cdn.example.com/manifest/page-${version}.json",
  "version": "1.0"
}
```

实际请求：`https://cdn.example.com/manifest/page-1.0.json`

---

## 文件命名规范

### 格式

```
{name}-{version}.json
```

### 示例

```
index-1.0.json
s1-1.0.json
list-1.0.json
tanxiangzitan.json  # pagelet 可以不带版本号
```

---

## 常见问题速查

### Q: 如何添加新频道？

在 `index-1.0.json` 的 `items` 数组中添加新的 channel 配置。

### Q: 如何更新内容？

修改 CDN 上的 JSON 文件，建议同时更新版本号。

### Q: 如何打开详情页？

使用 `dov:#` 协议：

```json
{
  "link": "dov:#https://cdn.example.com/manifest/detail.json"
}
```

### Q: 如何跳转到其他小程序？

使用小程序跳转协议：

```json
{
  "link": "#小程序://应用名/路径参数"
}
```

### Q: 如何自定义样式？

在 site 级配置的 `settings.style` 中设置样式变量。

### Q: 如何保持屏幕常亮？

在 page 级配置中设置：

```json
{
  "settings": {
    "keepScreenOn": true
  }
}
```

---

## 调试技巧

### 本地开发端口

```
http://127.0.0.1:PORT/appservice/manifest/
```

端口号在 Network 抓包的 Referer 中查看。

### 构建 npm

每次更新 npm 包后，在微信开发者工具选择：

```
工具 -> 构建npm
```

---

## 图片规范

### 推荐尺寸

| 类型 | 尺寸 | 格式 |
|------|------|------|
| 海报图 | 750x750 | JPG/PNG/WebP |
| 缩略图 | 200x200 | JPG/PNG/WebP |
| 轮播图 | 750x400 | JPG/PNG/WebP |
| 图标 | 64x64 | PNG |

### CDN 部署

- 使用 CDN 托管所有图片
- 启用 WebP 格式支持
- 配置合理的缓存策略

---

## 性能优化

### 1. 按需加载

使用 `script` 字段实现懒加载：

```json
{
  "script": "https://cdn.example.com/manifest/page-${version}.json",
  "version": "1.0"
}
```

### 2. 图片优化

- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速

### 3. 减少嵌套

避免过深的层级结构（建议不超过5层）。

### 4. 缓存策略

- 入口文件：短缓存（5分钟）
- 其他文件：长缓存（1天）
- 使用版本号刷新缓存

---

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发模式
npm run dev

# 构建
npm run build
```

---

## 相关资源

- [Vant Weapp 文档](https://youzan.github.io/vant-weapp/)
- [OpenMoji 图标](https://openmoji.org/)
- [iconfont 图标库](https://www.iconfont.cn/collections/detail?cid=31945)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

---

**文档版本**: 1.0.0  
**最后更新**: 2024-01-01
