# Changelog

All notable changes to dov-miniapp will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- 原生小程序页面集成支持
- `openURL` 方法支持 `/pages/` 路径跳转
- Grid 组件支持 `link` 字段跳转原生页面
- Cell 组件支持 `link` 字段跳转原生页面
- 详细的原生页面集成文档 (`docs/NATIVE_PAGE_INTEGRATION.md`)
- 自动错误处理：navigateTo 失败时自动尝试 switchTab

### Changed
- 更新 README 添加原生页面集成说明
- 优化 `openURL` 错误日志输出

### Fixed
- 修复跳转 tabBar 页面时的错误处理

---

## [1.0.0] - 2024-XX-XX

### Added
- 初始发布
- 基于 JSON 配置的小程序框架
- Site/Channel/Page/Module/Component 层级结构
- Grid/Cell/Card/Player 组件支持
- Pagelet 半屏页面支持
- 全局样式定制
- 分享功能配置
- 屏幕常亮设置

---

## 特性说明

### 原生页面集成 (v1.1.0)

**功能概述：**
- 在纯 JSON 配置的 dov 框架中集成原生 `.wxml/.wxss/.ts` 页面
- 通过 `link` 字段实现无缝跳转
- 支持带参数跳转
- 自动处理不同类型的页面跳转

**使用示例：**

```json
{
  "struct": "component",
  "type": "grid",
  "items": [
    {
      "title": "原生页面",
      "desc": "点击跳转",
      "poster": "/static/icon/page.png",
      "link": "/pages/custom/index?id=123"
    }
  ]
}
```

**支持的 URL Scheme：**
- `dov://pagelet#...` - dov 内部 pagelet
- `/pages/...` - 原生小程序页面 ✨NEW
- `weapp://...` - 跳转其他小程序
- `#小程序://...` - 微信小程序短链

**技术细节：**

扩展了 `dov.openURL` 方法：

```typescript
if (url.startsWith('/pages/')) {
  wx.navigateTo({
    url: url,
    fail: (err) => {
      // 自动尝试 switchTab（适用于 tabBar 页面）
      wx.switchTab({
        url: url.split('?')[0]
      });
    }
  });
}
```

**适用场景：**
1. 复杂交互逻辑页面
2. 需要第三方组件库
3. 使用原生组件（Canvas/Map/Video）
4. 渐进式迁移传统小程序

**文档：**
- 详细文档：`docs/NATIVE_PAGE_INTEGRATION.md`
- 包含完整示例、最佳实践、常见问题

---

## 开发说明

### 构建

```bash
npm run dev
```

### 测试

在微信开发者工具中打开项目，选择"工具 -> 构建 npm"。

### 发布

```bash
npm version patch  # 或 minor, major
npm publish
```

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 PR 前请：
1. 运行 `npm run dev` 确保编译通过
2. 在微信开发者工具中测试
3. 更新相关文档
4. 更新 CHANGELOG.md

---

## 致谢

感谢所有贡献者和使用者！

Built with ❤️
