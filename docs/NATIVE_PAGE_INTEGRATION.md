# 原生页面集成指南

本文档介绍如何在 dov-miniapp 框架中集成原生小程序页面。

---

## 目录

- [功能概述](#功能概述)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [使用场景](#使用场景)
- [完整示例](#完整示例)
- [最佳实践](#最佳实践)

---

## 功能概述

### 什么是原生页面集成？

dov-miniapp 框架原本只支持通过 JSON 配置动态渲染页面。现在扩展了对**原生小程序页面**的支持，允许你：

- 在 dov 框架中混合使用原生 `.wxml/.wxss/.ts/.js` 页面
- 通过 JSON 配置直接跳转到原生页面
- 保持 dov 框架的配置优势，同时获得原生页面的灵活性

### 支持的跳转方式

框架的 `openURL` 方法现在支持以下 URL scheme：

| Scheme | 示例 | 说明 |
|--------|------|------|
| `dov://` | `dov://pagelet#/path/to/file.json` | dov 内部 pagelet 页面 |
| `/pages/` | `/pages/example/index` | **原生小程序页面（新增）** |
| `weapp://` | `weapp://appid/path` | 跳转到其他小程序 |
| `#小程序://` | `#小程序://...` | 微信小程序短链 |

---

## 快速开始

### 1. 创建原生页面

在你的小程序项目中创建标准的页面文件：

```
your-miniapp/
└── miniprogram/
    └── pages/
        └── example/
            ├── index.json    # 页面配置
            ├── index.wxml    # 页面模板
            ├── index.wxss    # 页面样式
            └── index.ts      # 页面逻辑
```

### 2. 注册页面

在 `app.json` 中注册页面：

```json
{
  "pages": [
    "pages/dov",
    "pages/example/index"
  ]
}
```

### 3. 在 manifest 中配置

在 dov 的 manifest JSON 中配置跳转链接：

```json
{
  "struct": "component",
  "type": "grid",
  "items": [
    {
      "title": "示例页面",
      "desc": "点击进入原生页面",
      "poster": "/static/icon/example.png",
      "link": "/pages/example/index"
    }
  ]
}
```

### 4. 完成！

用户点击 grid 项时，框架会自动调用 `wx.navigateTo` 跳转到原生页面。

---

## 配置说明

### Grid 组件配置

```json
{
  "struct": "component",
  "type": "grid",
  "items": [
    {
      "title": "标题",
      "desc": "描述",
      "poster": "图标URL",
      "link": "/pages/your-page/index",     // 原生页面路径
      "router": "/your/router"               // 可选：内部路由标识
    }
  ]
}
```

### Cell 组件配置

```json
{
  "struct": "component",
  "type": "cell",
  "items": [
    {
      "title": "打开原生页面",
      "desc": "点击跳转",
      "link": "/pages/your-page/index",
      "icon": "arrow"
    }
  ]
}
```

### 带参数跳转

支持在路径中添加查询参数：

```json
{
  "link": "/pages/example/index?id=123&type=detail"
}
```

在目标页面中获取参数：

```typescript
Page({
  onLoad(options) {
    console.log(options.id);    // "123"
    console.log(options.type);  // "detail"
  }
});
```

---

## 使用场景

### 场景 1：复杂交互页面

当页面需要复杂的交互逻辑，JSON 配置难以满足时：

```json
{
  "title": "黄道吉日计算器",
  "desc": "查看今日宜忌·选择吉时良辰",
  "link": "/pages/calendar/index"
}
```

### 场景 2：需要第三方组件

当需要使用 vant、tdesign 等第三方 UI 组件时：

```json
{
  "title": "表单提交",
  "desc": "使用原生表单组件",
  "link": "/pages/form/index"
}
```

### 场景 3：需要 Canvas/Map/Video 等原生能力

当需要使用小程序的原生组件时：

```json
{
  "title": "地图导航",
  "desc": "使用原生地图组件",
  "link": "/pages/map/index"
}
```

### 场景 4：渐进式迁移

从传统小程序逐步迁移到 dov 框架：

```json
{
  "struct": "channel",
  "title": "功能模块",
  "items": [
    {
      "title": "新功能（dov）",
      "router": "/new/feature",
      "script": "/manifest/new-feature-1.0.json"
    },
    {
      "title": "旧功能（原生）",
      "link": "/pages/legacy/index"
    }
  ]
}
```

---

## 完整示例

### 示例 1：从 dov channel 跳转到原生页面

**manifest 配置** (`manifest/index-1.0.json`):

```json
{
  "struct": "site",
  "title": "我的应用",
  "items": [
    {
      "struct": "channel",
      "router": "/tools",
      "title": "工具",
      "icon": "/static/icon/tools.png",
      "items": [
        {
          "struct": "page",
          "title": "工具列表",
          "router": "/tools/index",
          "items": [
            {
              "struct": "module",
              "title": "常用工具",
              "router": "/tools/common",
              "items": [
                {
                  "struct": "component",
                  "type": "grid",
                  "settings": {
                    "width": 160,
                    "height": 160,
                    "column-num": 3
                  },
                  "items": [
                    {
                      "title": "计算器",
                      "poster": "/static/icon/calculator.png",
                      "link": "/pages/calculator/index"
                    },
                    {
                      "title": "黄历",
                      "poster": "/static/icon/calendar.png",
                      "link": "/pages/calendar/index"
                    },
                    {
                      "title": "设置",
                      "poster": "/static/icon/settings.png",
                      "link": "/pages/settings/index"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

**原生页面** (`pages/calculator/index.ts`):

```typescript
Page({
  data: {
    result: ''
  },

  onLoad() {
    console.log('计算器页面加载');
  },

  onBack() {
    // 返回到 dov 框架页面
    wx.navigateBack();
  }
});
```

### 示例 2：在原生页面中跳转回 dov 页面

```typescript
Page({
  methods: {
    goToDovPage() {
      // 方式1：使用 switchTab 跳转到 dov channel
      wx.switchTab({
        url: '/pages/dov?channel=/home'
      });

      // 方式2：使用 navigateTo 打开 dov pagelet
      // 注意：这需要在 dov 框架中有相应的处理逻辑
    }
  }
});
```

---

## 最佳实践

### 1. 页面命名规范

建议使用清晰的目录结构：

```
pages/
├── dov           # dov 框架入口页面
└── custom/       # 自定义原生页面目录
    ├── calculator/
    ├── calendar/
    └── settings/
```

### 2. 路径管理

在 manifest 中使用常量管理原生页面路径：

```json
{
  "settings": {
    "nativePages": {
      "calculator": "/pages/custom/calculator/index",
      "calendar": "/pages/custom/calendar/index"
    }
  }
}
```

### 3. 错误处理

框架已内置错误处理，当 `navigateTo` 失败时会自动尝试 `switchTab`：

```typescript
// dov-miniapp/src/dov.ts (已实现)
wx.navigateTo({
  url: url,
  fail: (err) => {
    // 自动尝试 switchTab（适用于 tabBar 页面）
    wx.switchTab({
      url: url.split('?')[0]
    });
  }
});
```

### 4. 返回导航

在原生页面中提供返回按钮：

```xml
<!-- index.wxml -->
<view class="header">
  <view class="back-button" bindtap="onBack">
    ← 返回
  </view>
  <view class="title">页面标题</view>
</view>
```

```typescript
// index.ts
Page({
  onBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
```

### 5. 统一样式

让原生页面的样式与 dov 框架保持一致：

```css
/* 使用 dov 框架的主题色 */
.container {
  background-color: var(--dov-background-color, #f5f5f5);
  color: var(--dov-text-color, #333);
}
```

### 6. 生命周期管理

注意原生页面和 dov 页面的生命周期差异：

```typescript
Page({
  // 页面加载
  onLoad(options) {
    // 获取跳转参数
  },

  // 页面显示
  onShow() {
    // 每次显示时刷新数据
  },

  // 页面卸载
  onUnload() {
    // 清理资源
  }
});
```

### 7. 数据传递

**从 dov 到原生页面**：

```json
{
  "link": "/pages/detail/index?id=123&type=product"
}
```

**从原生页面返回数据**：

使用 eventChannel 或全局数据：

```typescript
// 原生页面
Page({
  onConfirm() {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    
    // 给上一页传递数据
    prevPage.setData({
      selectedItem: this.data.currentItem
    });
    
    wx.navigateBack();
  }
});
```

---

## 技术原理

### openURL 方法实现

```typescript
dov.openURL = async (url: string, pagelet: string) => {
  if (url.startsWith('dov:')) {
    // dov 内部路由
    // ...
  } else if (url.startsWith('/pages/')) {
    // 原生页面路由（新增）
    wx.navigateTo({
      url: url,
      fail: (err) => {
        // 失败时尝试 switchTab
        wx.switchTab({
          url: url.split('?')[0]
        });
      }
    });
  } else if (/^weapp:\/\//.test(url)) {
    // 跳转其他小程序
    // ...
  }
}
```

### 支持的组件

目前已支持原生页面跳转的组件：

- ✅ **grid** - 网格组件
- ✅ **cell** - 单元格组件
- 🔄 其他组件可根据需要扩展

---

## 常见问题

### Q: 原生页面可以返回 dov 页面吗？

A: 可以。使用 `wx.navigateBack()` 即可返回。

### Q: 可以在原生页面中再次跳转到 dov 页面吗？

A: 可以。使用 `wx.switchTab` 跳转到 dov 的 channel：

```typescript
wx.switchTab({
  url: '/pages/dov?channel=/home'
});
```

### Q: 原生页面可以使用 dov 的数据吗？

A: 可以通过 URL 参数传递，或使用 `getApp().dov` 访问框架实例。

### Q: 是否影响性能？

A: 不影响。原生页面是标准的小程序页面，性能与普通小程序一致。

---

## 更新日志

### v1.1.0 (2026-02-16)

- ✨ 新增对原生小程序页面的支持
- ✨ `openURL` 方法支持 `/pages/` 路径
- ✨ Grid 组件支持 `link` 字段跳转原生页面
- ✨ Cell 组件支持 `link` 字段跳转原生页面
- 🐛 修复跳转失败时的错误处理

---

## 总结

通过扩展 `openURL` 方法，dov-miniapp 框架现在可以无缝集成原生小程序页面，为开发者提供更大的灵活性：

- 🎯 简单配置：只需在 manifest 中添加 `link` 字段
- 🔧 灵活扩展：复杂功能用原生页面，简单内容用 JSON 配置
- 🚀 渐进迁移：支持逐步从传统小程序迁移到 dov 框架
- 💪 最佳实践：保留 dov 框架的配置优势，同时获得原生能力

立即开始使用原生页面集成功能，让你的 dov 小程序更加强大！
