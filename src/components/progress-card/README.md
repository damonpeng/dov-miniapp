# Progress Card 组件

## 📊 组件说明

`progress-card` 是一个融合了总体进度展示和详细协作表格的复合卡片组件。顶部采用渐变设计展示总体进度，底部嵌入表格展示各阶段的多角色协作情况。

## 🎨 视觉效果

```
┌─────────────────────────────────────────┐
│  🎨 渐变背景区域                         │
│  工程总进度                     25%      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│  ███████░░░░░░░░░░░░░░░░░░░░░░░░        │
│                                          │
│  当前阶段: 水电改造                       │
│  总工期: 60天 | 已完成: 15天 | 剩余: 45天 │
├─────────────────────────────────────────┤
│  阶段      │ 我    │装修公司│设计师│监理│
├──────────┼──────┼──────┼─────┼────┤
│  准备阶段  │☑考察签约│      │     │    │
│  设计阶段  │☑过稿   │      │     │    │
│  拆建工程  │       │      │     │    │
│  水电改造  │       │      │     │    │
│  ...      │       │      │     │    │
└─────────────────────────────────────────┘
```

## 📋 数据结构

### Component 配置

```json
{
  "struct": "component",
  "type": "progress-card",
  "items": [
    {
      "title": "工程总进度",
      "progress": 25,
      "currentStage": "水电改造",
      "totalDays": 60,
      "completedDays": 15,
      "table": {
        "headers": ["阶段", "我", "装修公司", "设计师", "监理"],
        "rows": [
          {
            "id": 1,
            "label": "准备阶段",
            "cells": [
              {
                "type": "checkbox",
                "checked": true,
                "text": "考察签约"
              },
              null,
              null,
              null
            ]
          }
        ]
      }
    }
  ]
}
```

## 📖 字段说明

### 顶部进度区域

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 卡片标题（如"工程总进度"） |
| `progress` | number | 是 | 总体进度百分比（0-100） |
| `currentStage` | string | 是 | 当前所处阶段名称 |
| `totalDays` | number | 是 | 总工期天数 |
| `completedDays` | number | 是 | 已完成天数 |

### 底部表格区域

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `table` | object | 否 | 表格数据（如不提供则不显示表格） |
| `table.headers` | array | 是 | 表头数组 |
| `table.rows` | array | 是 | 行数据数组 |

#### Table.rows 数组

每个 row 对象包含：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number/string | 是 | 行唯一标识 |
| `label` | string | 是 | 第一列的标签文本（阶段名） |
| `cells` | array | 是 | 该行的单元格数据数组 |

#### Cell 对象

单元格可以是 `null`（空单元格）或包含以下字段的对象：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 单元格类型：`checkbox` / `text` |
| `checked` | boolean | 否 | checkbox 类型时的选中状态 |
| `text` | string | 是 | 显示的文本内容 |

## 🎯 使用示例

### 1. 只有进度卡片（不含表格）

```json
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
```

### 2. 进度卡片 + 表格（完整版）

```json
{
  "struct": "component",
  "type": "progress-card",
  "items": [
    {
      "title": "工程总进度",
      "progress": 25,
      "currentStage": "水电改造",
      "totalDays": 60,
      "completedDays": 15,
      "table": {
        "headers": ["阶段", "我", "装修公司", "设计师", "监理"],
        "rows": [
          {
            "id": 1,
            "label": "准备阶段",
            "cells": [
              { "type": "checkbox", "checked": true, "text": "考察签约" },
              null,
              null,
              null
            ]
          },
          {
            "id": 2,
            "label": "设计阶段",
            "cells": [
              { "type": "checkbox", "checked": true, "text": "过稿" },
              null,
              { "type": "text", "text": "出图" },
              null
            ]
          },
          {
            "id": 3,
            "label": "水电改造",
            "cells": [
              null,
              { "type": "text", "text": "施工" },
              null,
              { "type": "text", "text": "验收" }
            ]
          }
        ]
      }
    }
  ]
}
```

### 3. 任务管理场景

```json
{
  "struct": "component",
  "type": "progress-card",
  "items": [
    {
      "title": "项目进度",
      "progress": 60,
      "currentStage": "开发阶段",
      "totalDays": 30,
      "completedDays": 18,
      "table": {
        "headers": ["任务", "前端", "后端", "测试"],
        "rows": [
          {
            "id": 1,
            "label": "需求分析",
            "cells": [
              { "type": "checkbox", "checked": true, "text": "完成" },
              { "type": "checkbox", "checked": true, "text": "完成" },
              { "type": "checkbox", "checked": true, "text": "完成" }
            ]
          },
          {
            "id": 2,
            "label": "UI设计",
            "cells": [
              { "type": "checkbox", "checked": true, "text": "完成" },
              null,
              null
            ]
          },
          {
            "id": 3,
            "label": "开发",
            "cells": [
              { "type": "checkbox", "checked": false, "text": "进行中" },
              { "type": "checkbox", "checked": false, "text": "进行中" },
              null
            ]
          }
        ]
      }
    }
  ]
}
```

## 🎨 样式特性

### 顶部渐变区域

- **背景渐变**: 紫蓝渐变 (#667eea → #764ba2)
- **圆角**: 顶部圆角 16rpx
- **投影**: 柔和阴影
- **字体颜色**: 全白色
- **进度条**: 白色半透明底 + 白色填充

### 底部表格区域

- **背景**: 纯白色
- **圆角**: 底部圆角 16rpx
- **表头**: 浅灰背景 #f5f5f5
- **边框**: 细线分隔 2rpx
- **第一列宽度**: 140rpx（移动端优化）
- **其他列**: 自动平均分配

## 🔧 交互事件

### celltap 事件

点击表格单元格时触发：

```javascript
// 在父组件中监听
<progress-card 
  items="{{items}}" 
  bind:celltap="onCellTap"
/>

// 处理函数
onCellTap(e) {
  const { row, col, cell } = e.detail;
  console.log('点击了:', row, col, cell);
  // row: 行标签（阶段名）
  // col: 列索引（0-based）
  // cell: 单元格数据对象
}
```

## 📱 响应式支持

### 小屏幕优化 (max-width: 375px)

- 表格单元格内边距减小
- 字体大小缩小
- 第一列宽度调整为 120rpx
- 复选框尺寸调整

## 🎯 适用场景

1. ✅ **装修进度管理** - 总体进度 + 多角色协作
2. ✅ **项目管理** - 项目进度 + 任务分配
3. ✅ **工程监控** - 工程进度 + 责任追踪
4. ✅ **团队协作** - 整体进度 + 人员分工
5. ✅ **任何需要进度+明细的场景**

## 🔄 与其他组件的对比

| 组件 | 特点 | 适用场景 |
|------|------|----------|
| `progress-card` | 进度 + 表格融合 | 需要同时展示总览和明细 |
| `table` | 纯表格 | 只需要表格展示 |
| `timeline` | 时间轴 | 强调时间顺序 |

## 🚀 最佳实践

### 1. 合理控制表格行数

```javascript
// ✅ 推荐：5-10 行
"rows": [...]  // 10 行以内

// ❌ 不推荐：过多行数
"rows": [...]  // 超过 15 行影响体验
```

### 2. 简洁的文本

```json
// ✅ 推荐
{ "text": "考察签约" }  // 2-4 个字

// ❌ 不推荐
{ "text": "进行现场考察并签订装修合同" }  // 过长
```

### 3. 合理使用空单元格

```json
// ✅ 清晰明确
"cells": [
  { "type": "checkbox", "checked": true, "text": "完成" },
  null,  // 明确表示该角色无此任务
  null
]
```

### 4. 表格可选性

```json
// 如果只需要进度，可以不提供 table
{
  "title": "总进度",
  "progress": 50,
  "currentStage": "施工中",
  "totalDays": 60,
  "completedDays": 30
  // 没有 table 字段
}
```

## 📝 注意事项

1. **表格可选** - `table` 字段可选，不提供则只显示顶部进度卡片
2. **数据一致性** - `cells` 长度必须等于 `headers.length - 1`
3. **唯一 ID** - 每个 row 的 id 必须唯一
4. **复选框只读** - 复选框仅展示状态，交互需在父组件实现
5. **自动计算剩余** - 剩余天数会自动计算 (totalDays - completedDays)

## 🎨 设计规范

### 顶部进度区域

| 元素 | 规范 |
|------|------|
| 内边距 | 32rpx |
| 标题字体 | 32rpx / bold |
| 进度字体 | 48rpx / bold |
| 进度条高度 | 16rpx |
| 标签字体 | 24rpx |
| 数值字体 | 28rpx / 500 |

### 底部表格区域

| 元素 | 规范 |
|------|------|
| 表头高度 | 80rpx |
| 行高 | 80rpx（最小值） |
| 单元格内边距 | 20rpx 12rpx |
| 表头字体 | 26rpx / 600 |
| 内容字体 | 24rpx / 500 |
| 复选框尺寸 | 32rpx × 32rpx |
| 第一列宽度 | 140rpx |

## ✨ 组件优势

1. **一体化设计** - 总览 + 明细在一个卡片中
2. **视觉层次清晰** - 渐变区域和白色表格形成对比
3. **信息密度高** - 在有限空间展示更多信息
4. **灵活可扩展** - 表格部分可选，支持多种场景
5. **响应式友好** - 自适应各种屏幕尺寸

## 🔄 版本历史

- **v2.0**: 融合表格功能，支持总览 + 明细展示
- **v1.0**: 基础进度卡片功能
