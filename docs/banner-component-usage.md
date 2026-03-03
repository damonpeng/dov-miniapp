# Banner 组件使用文档

## 组件简介

Banner 组件是一个用于展示多张宣传图的轮播组件，支持自动播放、循环滚动、指示器显示等功能。

## 基本用法

在 manifest 配置文件中使用 banner 组件：

```json
{
  "struct": "component",
  "type": "banner",
  "items": [
    {
      "poster": "https://example.com/banner1.jpg",
      "title": "宣传标题 1",
      "desc": "宣传描述信息",
      "link": "https://example.com/page1"
    },
    {
      "poster": "https://example.com/banner2.jpg",
      "title": "宣传标题 2",
      "router": "/pages/detail"
    },
    {
      "poster": "https://example.com/banner3.jpg"
    }
  ],
  "settings": {
    "height": "200px",
    "autoplay": true,
    "interval": 5000,
    "duration": 500,
    "circular": true,
    "indicatorDots": true,
    "indicatorColor": "rgba(0, 0, 0, .3)",
    "indicatorActiveColor": "#000",
    "borderRadius": "8px",
    "mode": "aspectFill",
    "lazyLoad": true,
    "contentPosition": "bottom"
  }
}
```

## 配置项说明

### items 数据项

每个 banner 项支持以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `poster` / `image` / `src` | String | 图片地址（三个字段任选其一） |
| `title` | String | 标题（可选） |
| `desc` | String | 描述（可选） |
| `link` | String | 外部链接（可选） |
| `router` | String | 内部路由（可选） |

### settings 配置项

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | String | `'200px'` | 轮播图高度 |
| `autoplay` | Boolean | `true` | 是否自动播放 |
| `interval` | Number | `5000` | 自动切换时间间隔（毫秒） |
| `duration` | Number | `500` | 滑动动画时长（毫秒） |
| `circular` | Boolean | `true` | 是否循环播放 |
| `indicatorDots` | Boolean | `true` | 是否显示指示点 |
| `indicatorColor` | String | `'rgba(0, 0, 0, .3)'` | 指示点颜色 |
| `indicatorActiveColor` | String | `'#000'` | 当前选中指示点颜色 |
| `borderRadius` | String | `'0px'` | 圆角大小 |
| `mode` | String | `'aspectFill'` | 图片裁剪模式 |
| `lazyLoad` | Boolean | `true` | 是否懒加载 |
| `contentPosition` | String | `'bottom'` | 文字内容位置（`'top'` 或 `'bottom'`） |

## CSS 变量

可以通过 CSS 变量自定义样式：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--dov-banner__text-color` | `#fff` | 文字颜色 |
| `--dov-banner__title-font-size` | `16px` | 标题字体大小 |
| `--dov-banner__title-font-weight` | `500` | 标题字体粗细 |
| `--dov-banner__desc-font-size` | `12px` | 描述字体大小 |

## 使用示例

### 示例 1：基础轮播图

```json
{
  "struct": "component",
  "type": "banner",
  "items": [
    {
      "poster": "https://s.dayanmo.com/fo/banner/1.jpg"
    },
    {
      "poster": "https://s.dayanmo.com/fo/banner/2.jpg"
    },
    {
      "poster": "https://s.dayanmo.com/fo/banner/3.jpg"
    }
  ],
  "settings": {
    "height": "180px"
  }
}
```

### 示例 2：带标题和链接的轮播图

```json
{
  "struct": "component",
  "type": "banner",
  "items": [
    {
      "poster": "https://s.dayanmo.com/fo/banner/sutra.jpg",
      "title": "心经诵读",
      "desc": "每日一读，心灵平静",
      "router": "/sutra/xinjing"
    },
    {
      "poster": "https://s.dayanmo.com/fo/banner/fortune.jpg",
      "title": "2025 好运势",
      "desc": "化太岁，求好运",
      "router": "/fortune/taisui"
    }
  ],
  "settings": {
    "height": "200px",
    "borderRadius": "12px",
    "interval": 3000
  }
}
```

### 示例 3：单张图片（不轮播）

```json
{
  "struct": "component",
  "type": "banner",
  "items": [
    {
      "poster": "https://s.dayanmo.com/fo/banner/promo.jpg",
      "link": "https://example.com/promo"
    }
  ],
  "settings": {
    "height": "150px",
    "autoplay": false,
    "indicatorDots": false
  }
}
```

## 注意事项

1. 当只有一张图片时，建议关闭自动播放和指示器
2. 图片建议使用 CDN 地址以提高加载速度
3. 建议开启懒加载以优化性能
4. 高度可以根据实际需求调整，建议在 150px-300px 之间
5. 点击 banner 图会触发跳转，优先使用 `link`（外部链接），其次使用 `router`（内部路由）
