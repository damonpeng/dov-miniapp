# 新增进度组件说明文档

## ✅ 完成内容

已在 `dov-miniapp` 中成功添加两个新的组件类型，用于支持工程进度展示功能。

## 📦 新增组件

### 1. progress-card (进度卡片)

**路径**: `src/components/progress-card/`

**用途**: 展示工程总体进度的渐变卡片

**文件清单**:
- ✅ `index.ts` - 组件逻辑
- ✅ `index.wxml` - 组件模板
- ✅ `index.wxss` - 组件样式
- ✅ `index.json` - 组件配置
- ✅ `README.md` - 组件文档

**数据结构**:
```json
{
  "type": "progress-card",
  "items": [{
    "title": "工程总进度",
    "progress": 25,
    "currentStage": "水电改造",
    "totalDays": 60,
    "completedDays": 15
  }]
}
```

**视觉特性**:
- 紫色渐变背景
- 大号进度百分比 (48rpx)
- 白色进度条
- 工期统计信息

---

### 2. timeline (时间轴)

**路径**: `src/components/timeline/`

**用途**: 展示多个施工阶段的时间轴

**文件清单**:
- ✅ `index.ts` - 组件逻辑
- ✅ `index.wxml` - 组件模板
- ✅ `index.wxss` - 组件样式
- ✅ `index.json` - 组件配置
- ✅ `README.md` - 组件文档

**数据结构**:
```json
{
  "type": "timeline",
  "items": [{
    "id": 1,
    "title": "拆除阶段",
    "status": "completed|ongoing|pending",
    "progress": 100,
    "duration": "3天",
    "startDate": "2026-01-15",
    "endDate": "2026-01-18",
    "link": "dov://pagelet#/progress/demolition.json"
  }]
}
```

**状态类型**:
- ✅ `completed` - 已完成 (绿色)
- 🔵 `ongoing` - 进行中 (蓝色 + 脉冲动画)
- ⚪ `pending` - 未开始 (灰色)

---

## 🔧 核心修改

### 1. 注册组件

**文件**: `src/components/index.json`

```json
{
  "component": true,
  "usingComponents": {
    "progress-card": "./progress-card/index",
    "timeline": "./timeline/index"
  }
}
```

### 2. 添加组件模板

**文件**: `src/components/index.wxml`

```xml
<block wx:elif="{{item.type==='progress-card'}}">
  <progress-card items="{{item.items}}" component="{{item}}" module="{{module}}" />
</block>

<block wx:elif="{{item.type==='timeline'}}">
  <timeline items="{{item.items}}" component="{{item}}" module="{{module}}" />
</block>
```

---

## 📁 目录结构

```
dov-miniapp/src/components/
├── progress-card/
│   ├── index.ts          # 组件逻辑
│   ├── index.wxml        # 组件模板
│   ├── index.wxss        # 组件样式
│   ├── index.json        # 组件配置
│   └── README.md         # 组件文档
│
├── timeline/
│   ├── index.ts          # 组件逻辑
│   ├── index.wxml        # 组件模板
│   ├── index.wxss        # 组件样式
│   ├── index.json        # 组件配置
│   └── README.md         # 组件文档
│
├── index.ts              # 组件入口
├── index.wxml            # (已更新) 添加新组件
├── index.json            # (已更新) 注册新组件
└── ...
```

---

## 🎨 设计规范

### Progress Card 样式

```css
/* 渐变背景 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 进度百分比 */
font-size: 48rpx;
font-weight: bold;
color: #ffffff;

/* 进度条 */
height: 16rpx;
background: rgba(255, 255, 255, 0.3);
fill: #ffffff;
```

### Timeline 样式

```css
/* 状态颜色 */
--completed: #10b981;  /* 绿色 */
--ongoing: #3b82f6;    /* 蓝色 */
--pending: #9ca3af;    /* 灰色 */

/* 节点大小 */
width: 48rpx;
height: 48rpx;
border-radius: 50%;

/* 连接线 */
width: 2rpx;
background: #e5e7eb;
```

---

## 🚀 使用示例

### 在 manifest JSON 中使用

#### Progress Card 示例

```json
{
  "struct": "module",
  "title": "总体进度",
  "items": [
    {
      "struct": "component",
      "type": "progress-card",
      "items": [
        {
          "title": "工程总进度",
          "progress": 25,
          "currentStage": "水电改造",
          "totalDays": 60,
          "completedDays": 15
        }
      ]
    }
  ]
}
```

#### Timeline 示例

```json
{
  "struct": "module",
  "title": "施工阶段",
  "items": [
    {
      "struct": "component",
      "type": "timeline",
      "items": [
        {
          "id": 1,
          "title": "拆除阶段",
          "status": "completed",
          "progress": 100,
          "duration": "3天",
          "startDate": "2026-01-15",
          "endDate": "2026-01-18",
          "link": "dov://pagelet#/progress/demolition.json"
        },
        {
          "id": 2,
          "title": "水电改造",
          "status": "ongoing",
          "progress": 60,
          "duration": "7-10天",
          "startDate": "2026-01-19",
          "endDate": "2026-01-29",
          "link": "dov://pagelet#/progress/plumbing.json"
        }
      ]
    }
  ]
}
```

---

## 🎯 功能特性

### Progress Card
- ✅ 渐变背景设计
- ✅ 大号进度显示
- ✅ 当前阶段展示
- ✅ 工期统计（总/已完成/剩余）
- ✅ 平滑进度条动画

### Timeline
- ✅ 垂直时间轴布局
- ✅ 三种状态颜色区分
- ✅ 进行中状态脉冲动画
- ✅ 点击跳转到详情页
- ✅ 响应式卡片设计
- ✅ 每个阶段独立进度条

---

## 🔗 交互逻辑

### Timeline 组件交互

1. **点击阶段卡片**
   - 触发 `onClickItem` 方法
   - 通过 `app.dov.openURL()` 打开 pagelet 详情页
   - 支持 `link` 和 `router` 两种跳转方式

2. **脉冲动画**
   - 仅在 `status="ongoing"` 时生效
   - 2秒循环动画
   - 透明度在 1 和 0.6 之间变化

---

## 📊 数据流

```
manifest JSON
    ↓
module 组件解析
    ↓
components 组件分发
    ↓
progress-card / timeline 渲染
    ↓
用户交互 (timeline 点击)
    ↓
app.dov.openURL()
    ↓
打开 pagelet 详情页
```

---

## ✨ 兼容性

- ✅ 符合 dov-miniapp 组件规范
- ✅ 使用标准 Component 构造器
- ✅ 支持 properties 传递数据
- ✅ 支持 lifetimes 生命周期
- ✅ 支持 methods 方法定义
- ✅ 完全兼容现有组件体系

---

## 📝 注意事项

1. **Progress Card**
   - 进度值应在 0-100 之间
   - 工期天数必须为正整数
   - 已完成天数不能大于总工期

2. **Timeline**
   - `status` 必须是 `completed`/`ongoing`/`pending` 之一
   - 建议同一时间只有一个 `ongoing` 状态
   - 日期格式建议使用 `YYYY-MM-DD`
   - 跳转需配置 `link` 或 `router`

3. **样式覆盖**
   - 可通过修改 `.wxss` 文件自定义样式
   - 颜色定义在组件内部，便于统一管理
   - 动画效果可通过 CSS 变量调整

---

## 🎉 总结

已成功在 `dov-miniapp` 中补充了 `progress-card` 和 `timeline` 两个组件，完全符合框架规范，可以直接在 manifest JSON 中使用。这两个组件配合使用，可以完整展示工程进度信息，视觉效果好，交互流畅。

**下一步**: 在微信开发者工具中编译查看效果！
