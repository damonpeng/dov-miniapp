# Timeline 组件

## 概述

`timeline` 是一个垂直时间轴组件，用于展示工程各阶段的进度和状态，支持三种状态的视觉区分。

## 组件类型

`type: "timeline"`

## 数据结构

```json
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
      "router": "/progress/stages/demolition",
      "link": "dov://pagelet#/progress/demolition.json"
    }
  ]
}
```

## 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number | ✅ | 阶段唯一标识 |
| `title` | string | ✅ | 阶段名称 |
| `status` | string | ✅ | 状态: completed/ongoing/pending |
| `progress` | number | ✅ | 进度百分比 (0-100) |
| `duration` | string | ✅ | 工期说明 (如 "3天") |
| `startDate` | string | ✅ | 开始日期 (YYYY-MM-DD) |
| `endDate` | string | ✅ | 结束日期 (YYYY-MM-DD) |
| `router` | string | - | 路由地址 |
| `link` | string | - | Pagelet 链接 |

## 状态说明

### 1. completed (已完成)
- **节点颜色**: 绿色 (#10b981)
- **图标**: ✓
- **背景**: 淡绿色 (#f0fdf4)
- **状态标签**: "已完成" - 绿色背景

### 2. ongoing (进行中)
- **节点颜色**: 蓝色 (#3b82f6)
- **图标**: ● (带脉冲动画)
- **背景**: 淡蓝色 (#eff6ff)
- **状态标签**: "进行中" - 蓝色背景
- **特殊效果**: 蓝色边框 + 投影

### 3. pending (未开始)
- **节点颜色**: 灰色 (#9ca3af)
- **图标**: ○
- **背景**: 浅灰色 (#f9fafb)
- **状态标签**: "未开始" - 灰色背景

## 交互功能

### 1. 点击卡片查看详情
点击阶段卡片会跳转到对应的 pagelet 详情页

```javascript
onClickItem(event) {
  const { link, router } = event.currentTarget.dataset;
  await app.dov.openURL(link, router);
}
```

### 2. 脉冲动画
进行中的阶段节点会有脉冲动画效果，吸引注意力

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

## 使用示例

### 在 manifest JSON 中使用

```json
{
  "struct": "module",
  "title": "施工阶段",
  "router": "/progress/overview/stages",
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

## 布局特点

### 时间轴结构
```
节点 ━━ 连线 ━━ 内容卡片
 ●           ┌─────────┐
 │           │ 标题    │
 │           │ 状态    │
 │           │ 日期    │
 │           │ 进度条  │
 │           └─────────┘
 ●
```

### 响应式设计
- 节点固定宽度 48rpx
- 内容卡片自适应宽度
- 最后一个阶段不显示连线

## 样式定制

### 状态颜色
```css
--completed-color: #10b981;
--ongoing-color: #3b82f6;
--pending-color: #9ca3af;
```

### 背景颜色
```css
--completed-bg: #f0fdf4;
--ongoing-bg: #eff6ff;
--pending-bg: #f9fafb;
```

## 注意事项

1. `status` 必须是 `completed`、`ongoing`、`pending` 之一
2. 同一时间只应有一个 `ongoing` 状态
3. 进度百分比应在 0-100 之间
4. 日期格式建议使用 YYYY-MM-DD
5. 点击跳转需要配置 `link` 或 `router`
