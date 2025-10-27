# dov-miniapp 文档中心

欢迎使用 dov-miniapp 文档！这里包含了框架的完整使用指南。

---

## 📚 文档列表

### 1. [完整使用文档](./README.md)
**适合人群**: 所有用户

包含框架的完整介绍、核心概念、配置功能、组件文档、最佳实践等。

**主要内容**:
- 概述和核心特点
- 快速开始指南
- 核心概念详解
- JSON结构规范
- 组件文档（7种组件）
- 配置功能详解
- 路由系统说明
- 最佳实践
- 常见问题解答

---

### 2. [JSON 结构规范](./JSON-SCHEMA.md)
**适合人群**: 开发者、内容管理员

详细定义了所有 JSON 配置的结构规范，包括 TypeScript 类型定义。

**主要内容**:
- 通用规范和命名规则
- Site 结构详解
- Channel 结构详解
- Page 结构详解
- Module 结构详解
- Component 结构详解（7种组件）
- Pagelet 结构详解
- Settings 配置详解
- 完整示例
- 验证规则

---

### 3. [快速参考](./QUICK-REFERENCE.md)
**适合人群**: 熟悉框架的用户

快速查阅常用配置和代码片段的速查手册。

**主要内容**:
- 层级结构速查
- 常用配置模板
- 组件速查（7种组件）
- 链接协议速查
- Settings 速查
- 常用样式变量
- 路由规范
- 版本管理
- 文件命名规范
- 常见问题速查
- 调试技巧
- 图片规范
- 性能优化

---

## 🚀 快速导航

### 新手入门

1. 阅读 [完整使用文档 - 概述](./README.md#概述) 了解框架特点
2. 跟随 [快速开始](./README.md#快速开始) 搭建第一个项目
3. 学习 [核心概念](./README.md#核心概念) 理解层级结构
4. 参考 [JSON结构规范](./JSON-SCHEMA.md) 编写配置文件

### 开发配置

1. 查看 [JSON结构规范](./JSON-SCHEMA.md) 了解完整的配置结构
2. 使用 [快速参考](./QUICK-REFERENCE.md) 快速查找配置模板
3. 参考 [组件文档](./README.md#组件文档) 使用各种UI组件
4. 学习 [路由系统](./README.md#路由系统) 实现页面跳转

### 内容管理

1. 使用 [快速参考 - 常用配置模板](./QUICK-REFERENCE.md#常用配置模板) 快速创建内容
2. 参考 [组件速查](./QUICK-REFERENCE.md#组件速查) 选择合适的组件
3. 遵循 [最佳实践](./README.md#最佳实践) 组织文件结构
4. 使用 [版本管理](./QUICK-REFERENCE.md#版本管理) 更新内容

### 问题排查

1. 查看 [常见问题](./README.md#常见问题) 寻找解决方案
2. 使用 [调试技巧](./QUICK-REFERENCE.md#调试技巧) 进行本地调试
3. 检查 [验证规则](./JSON-SCHEMA.md#验证规则) 确保配置正确

---

## 📖 按主题查找

### 层级结构

- [核心概念 - 层级结构](./README.md#核心概念)
- [JSON结构规范 - 通用规范](./JSON-SCHEMA.md#通用规范)
- [快速参考 - 层级结构速查](./QUICK-REFERENCE.md#层级结构速查)

### Site 配置

- [JSON结构规范 - Site 结构](./JSON-SCHEMA.md#site-结构)
- [快速参考 - 全局样式](./QUICK-REFERENCE.md#settings-速查)

### Channel 配置

- [JSON结构规范 - Channel 结构](./JSON-SCHEMA.md#channel-结构)
- [快速参考 - 新建频道](./QUICK-REFERENCE.md#1-新建频道)

### Page 配置

- [JSON结构规范 - Page 结构](./JSON-SCHEMA.md#page-结构)
- [快速参考 - 新建页面](./QUICK-REFERENCE.md#2-新建页面)

### Module 配置

- [JSON结构规范 - Module 结构](./JSON-SCHEMA.md#module-结构)
- [快速参考 - 新建模块](./QUICK-REFERENCE.md#3-新建模块)

### Component 组件

- [完整使用文档 - 组件文档](./README.md#组件文档)
- [JSON结构规范 - Component 结构](./JSON-SCHEMA.md#component-结构)
- [快速参考 - 组件速查](./QUICK-REFERENCE.md#组件速查)

### Pagelet 详情页

- [JSON结构规范 - Pagelet 结构](./JSON-SCHEMA.md#pagelet-结构)
- [完整使用文档 - 路由系统](./README.md#路由系统)

### 样式定制

- [完整使用文档 - 全局样式定制](./README.md#1-全局样式定制)
- [JSON结构规范 - Settings 配置](./JSON-SCHEMA.md#settings-配置)
- [快速参考 - 常用样式变量](./QUICK-REFERENCE.md#常用样式变量)

### 路由和链接

- [完整使用文档 - 路由系统](./README.md#路由系统)
- [快速参考 - 链接协议速查](./QUICK-REFERENCE.md#链接协议速查)
- [快速参考 - 路由规范](./QUICK-REFERENCE.md#路由规范)

### 版本管理

- [完整使用文档 - 版本管理](./README.md#2-版本管理)
- [快速参考 - 版本管理](./QUICK-REFERENCE.md#版本管理)

---

## 🎯 常见任务

### 创建新频道

1. 参考 [快速参考 - 新建频道](./QUICK-REFERENCE.md#1-新建频道)
2. 在 `index-1.0.json` 中添加配置
3. 准备图标文件（默认和激活状态）

### 添加新页面

1. 参考 [快速参考 - 新建页面](./QUICK-REFERENCE.md#2-新建页面)
2. 创建页面配置文件
3. 在 channel 的 items 中引用

### 使用组件

1. 查看 [组件文档](./README.md#组件文档) 选择合适的组件
2. 参考 [组件速查](./QUICK-REFERENCE.md#组件速查) 获取配置模板
3. 根据 [JSON结构规范](./JSON-SCHEMA.md#component-结构) 填写数据

### 自定义样式

1. 查看 [常用样式变量](./QUICK-REFERENCE.md#常用样式变量)
2. 在 site 配置的 `settings.style` 中设置
3. 参考 [Vant Weapp 样式变量](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)

### 更新内容

1. 修改对应的 JSON 配置文件
2. 更新版本号（参考 [版本管理](./QUICK-REFERENCE.md#版本管理)）
3. 上传到 CDN
4. 等待缓存刷新

---

## 💡 学习路径

### 初级（1-2天）

1. ✅ 了解框架特点和优势
2. ✅ 搭建本地开发环境
3. ✅ 理解层级结构（site → channel → page → module → component）
4. ✅ 创建第一个频道和页面
5. ✅ 使用基础组件（card, cell, grid）

### 中级（3-5天）

1. ✅ 掌握所有组件的使用
2. ✅ 理解路由系统和链接协议
3. ✅ 使用 pagelet 创建详情页
4. ✅ 自定义全局样式
5. ✅ 实现版本管理和内容更新

### 高级（1周+）

1. ✅ 优化性能（按需加载、图片优化）
2. ✅ 设计合理的文件组织结构
3. ✅ 配置 CDN 缓存策略
4. ✅ 集成第三方小程序
5. ✅ 开发自定义组件（需要修改源码）

---

## 🔧 开发工具

### 必备工具

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)

### 推荐插件

- JSON Tools (VS Code)
- Prettier - Code formatter (VS Code)
- [JSON Editor Online](https://jsoneditoronline.org/)

### 在线资源

- [Vant Weapp 文档](https://youzan.github.io/vant-weapp/)
- [OpenMoji 图标](https://openmoji.org/)
- [iconfont 图标库](https://www.iconfont.cn/collections/detail?cid=31945)

---

## 📝 更新日志

### v1.0.0 (2024-01-01)

- ✅ 完整使用文档
- ✅ JSON 结构规范
- ✅ 快速参考手册
- ✅ 文档索引

---

## 🤝 贡献

欢迎提交文档改进建议！

如果您发现文档中的错误或有改进建议，请：

1. 提交 Issue
2. 发起 Pull Request
3. 联系维护者

---

## 📄 许可证

MIT License

---

## 💬 获取帮助

- 查看 [常见问题](./README.md#常见问题)
- 阅读 [完整使用文档](./README.md)
- 参考 [JSON结构规范](./JSON-SCHEMA.md)
- 使用 [快速参考](./QUICK-REFERENCE.md)

---

**文档版本**: 1.0.0  
**最后更新**: 2024-01-01  
**维护者**: dov-miniapp Team

Built with ❤️
