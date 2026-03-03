# Table 组件

## 📊 组件说明

`table` 是一个通用的表格组件，支持自定义表头、行列数据、复选框等功能，适用于多种数据展示场景。

## 🎨 视觉效果

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│  标题    │  列1     │  列2     │  列3     │  列4     │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│  行1     │  ☑ 数据  │          │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│  行2     │  文本    │  文本    │          │          │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│  行3     │          │          │  ☑ 数据  │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

## 📋 数据结构

### Component 配置

```json
{
  "struct": "component",
  "type": "table",
  "items": [
    {
      "title": "表格标题（可选）",
      "headers": ["第一列", "第二列", "第三列", "第四列"],
      "rows": [
        {
          "id": 1,
          "label": "行标签1",
          "cells": [
            {
              "type": "checkbox",
              "checked": true,
              "text": "已完成"
            },
            {
              "type": "text",
              "text": "普通文本"
            },
            null,
            {
              "type": "text",
              "text": "数据"
            }
          ]
        },
        {
          "id": 2,
          "label": "行标签2",
          "cells": [
            null,
            {
              "type": "checkbox",
              "checked": false,
              "text": "待办"
            },
            {
              "type": "text",
              "text": "内容"
            },
            null
          ]
        }
      ]
    }
  ]
}
```

## 📖 字段说明

### 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 否 | 表格标题（暂不显示） |
| `headers` | array | 是 | 表头列标题数组 |
| `rows` | array | 是 | 表格行数据数组 |

### Headers 数组

- 第一个元素：第一列（行标题列）的标题
- 其余元素：其他列的标题
- 示例：`["阶段", "我", "装修公司", "设计师", "监理"]`

### Rows 数组

每个 row 对象包含：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | number/string | 是 | 行唯一标识 |
| `label` | string | 是 | 第一列的标签文本 |
| `cells` | array | 是 | 该行的单元格数据数组 |

### Cell 对象

单元格可以是 `null`（空单元格）或包含以下字段的对象：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `type` | string | 是 | 单元格类型：`checkbox` / `text` |
| `checked` | boolean | 否 | checkbox 类型时的选中状态 |
| `text` | string | 是 | 显示的文本内容 |

## 🎯 使用示例

### 1. 简单文本表格

```json
{
  "struct": "component",
  "type": "table",
  "items": [
    {
      "headers": ["姓名", "年龄", "职位"],
      "rows": [
        {
          "id": 1,
          "label": "张三",
          "cells": [
            { "type": "text", "text": "25" },
            { "type": "text", "text": "工程师" }
          ]
        },
        {
          "id": 2,
          "label": "李四",
          "cells": [
            { "type": "text", "text": "30" },
            { "type": "text", "text": "设计师" }
          ]
        }
      ]
    }
  ]
}
```

### 2. 任务清单表格（带复选框）

```json
{
  "struct": "component",
  "type": "table",
  "items": [
    {
      "headers": ["任务", "负责人", "状态"],
      "rows": [
        {
          "id": 1,
          "label": "需求分析",
          "cells": [
            { "type": "text", "text": "张三" },
            { "type": "checkbox", "checked": true, "text": "已完成" }
          ]
        },
        {
          "id": 2,
          "label": "原型设计",
          "cells": [
            { "type": "text", "text": "李四" },
            { "type": "checkbox", "checked": false, "text": "进行中" }
          ]
        }
      ]
    }
  ]
}
```

### 3. 装修进度协作表格

```json
{
  "struct": "component",
  "type": "table",
  "items": [
    {
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
  ]
}
```

### 4. 空单元格示例

```json
{
  "rows": [
    {
      "id": 1,
      "label": "示例行",
      "cells": [
        { "type": "text", "text": "有内容" },
        null,  // 空单元格
        { "type": "text", "text": "有内容" },
        null   // 空单元格
      ]
    }
  ]
}
```

## 🎨 样式定制

### 颜色变量

```wxss
/* 可通过覆盖样式自定义 */
.table {
  --table-header-bg: #f5f5f5;
  --table-border-color: #e5e5e5;
  --checkbox-checked-bg: #333;
  --checkbox-border-color: #d1d5db;
}
```

### 布局调整

- **第一列宽度**: 默认 160rpx，修改 `.table__cell--first`
- **其他列宽度**: 自动平均分配
- **行高**: 默认 88rpx，修改 `.table__cell` 的 `min-height`
- **单元格内边距**: 默认 24rpx 16rpx

## 🔧 交互事件

### celltap 事件

点击单元格时触发（不包括第一列）：

```javascript
// 在父组件中监听
<table 
  items="{{items}}" 
  bind:celltap="onCellTap"
/>

// 处理函数
onCellTap(e) {
  const { row, col, cell } = e.detail;
  console.log('点击了:', row, col, cell);
  // row: 行标签
  // col: 列索引（0-based）
  // cell: 单元格数据对象
}
```

## 📱 响应式支持

- **小屏幕优化**: 自动调整字体大小和间距（max-width: 375px）
- **横向滚动**: 添加 `table--scrollable` class 启用

```wxml
<view class="table table--scrollable">
  ...
</view>
```

## 🎯 适用场景

1. ✅ **协作任务分配**: 多角色任务表格
2. ✅ **进度追踪**: 阶段进度表
3. ✅ **数据对比**: 多维度数据展示
4. ✅ **清单管理**: 待办事项列表
5. ✅ **信息汇总**: 结构化信息展示

## 🔄 与其他组件的对比

| 组件 | 用途 | 特点 |
|------|------|------|
| `table` | 通用表格 | 灵活配置，支持多种数据类型 |
| `grid` | 网格布局 | 等宽等高，适合卡片展示 |
| `card` | 卡片列表 | 纵向列表，适合详情展示 |
| `cell` | 单元格列表 | 简单列表，适合设置项 |

## 🚀 最佳实践

### 1. 控制列数
建议不超过 5 列，否则考虑：
- 使用横向滚动
- 精简列数
- 改用其他布局

### 2. 简洁文本
- 表头：2-4 个字
- 单元格：2-6 个字
- 避免长文本换行

### 3. 合理使用复选框
- 仅用于表示状态
- 不实现实际勾选交互（需父组件处理）
- checked 字段控制选中状态

### 4. 空单元格处理
- 使用 `null` 表示空单元格
- 不影响列对齐
- 保持数据结构完整性

### 5. 行数控制
- 建议不超过 15 行
- 超长表格影响性能
- 考虑分页或折叠

## 📝 注意事项

1. **数据一致性**: 所有 `rows[].cells` 数组长度应等于 `headers.length - 1`
2. **唯一 ID**: 每个 row 的 id 必须唯一
3. **类型限制**: cell.type 仅支持 `checkbox` 和 `text`
4. **只读展示**: 复选框仅展示状态，交互需在父组件实现
5. **第一列特殊**: 第一列作为行标签，固定宽度且不可点击

## 🎨 设计规范

| 元素 | 规范 |
|------|------|
| 表头高度 | 88rpx |
| 行高 | 88rpx（最小值） |
| 单元格内边距 | 24rpx 16rpx |
| 边框颜色 | #f0f0f0 |
| 边框粗细 | 2rpx |
| 表头字体 | 28rpx / 600 |
| 内容字体 | 26rpx / 500 |
| 复选框尺寸 | 36rpx × 36rpx |
| 圆角 | 16rpx |
| 投影 | 0 4rpx 12rpx rgba(0,0,0,0.08) |

## 🔄 版本历史

- **v1.0**: 初始版本，支持基础表格、复选框、文本展示
