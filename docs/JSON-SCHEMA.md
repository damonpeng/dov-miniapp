# dov-miniapp JSON 结构规范

本文档详细定义了 dov-miniapp 框架中所有 JSON 配置的结构规范。

---

## 目录

- [通用规范](#通用规范)
- [Site 结构](#site-结构)
- [Channel 结构](#channel-结构)
- [Page 结构](#page-结构)
- [Module 结构](#module-结构)
- [Component 结构](#component-结构)
- [Pagelet 结构](#pagelet-结构)
- [Settings 配置](#settings-配置)
- [完整示例](#完整示例)

---

## 通用规范

### 基础字段

所有层级的配置都遵循以下基础结构：

```typescript
interface BaseNode {
  struct: 'site' | 'channel' | 'page' | 'module' | 'component' | 'pagelet';
  title: string;
  router: string;
  desc?: string;
  items?: Array<any>;
  settings?: object;
}
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | string | ✅ | 结构类型标识 |
| `title` | string | ✅ | 显示标题 |
| `router` | string | ✅ | 路由路径，必须以 `/` 开头 |
| `desc` | string | - | 描述信息 |
| `items` | array | - | 子项列表 |
| `settings` | object | - | 配置项 |

### 命名规范

1. **router 路径**：
   - 必须以 `/` 开头
   - 使用小写字母和连字符
   - 层级之间用 `/` 分隔
   - 示例：`/reading/s1/list`

2. **文件命名**：
   - 格式：`{name}-{version}.json`
   - 示例：`index-1.0.json`, `s1-1.0.json`

3. **版本号**：
   - 格式：`major.minor`
   - 示例：`1.0`, `1.1`, `2.0`

---

## Site 结构

站点级配置，整个小程序的入口文件。

### TypeScript 定义

```typescript
interface SiteNode {
  struct: 'site';
  title: string;
  icon?: string;
  router?: string;
  plugins?: {
    txc?: {
      productId: number;
    };
  };
  settings?: {
    style?: Record<string, string>;
    shareInfo?: {
      title?: string;
      path?: string;
      query?: string;
      image?: string;
    };
  };
  items: Array<ChannelNode>;
}
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'site'` | ✅ | 固定值 |
| `title` | string | ✅ | 小程序名称 |
| `icon` | string | - | 小程序图标路径 |
| `router` | string | - | 根路由（通常为空） |
| `plugins` | object | - | 插件配置 |
| `plugins.txc` | object | - | 兔小巢反馈插件 |
| `plugins.txc.productId` | number | - | 兔小巢产品ID |
| `settings` | object | - | 全局设置 |
| `settings.style` | object | - | 全局样式变量 |
| `settings.shareInfo` | object | - | 分享配置 |
| `items` | array | ✅ | Channel 列表 |

### 完整示例

```json
{
  "struct": "site",
  "title": "Hi多福",
  "icon": "/static/icon/logo.png",
  "plugins": {
    "txc": {
      "productId": 123456
    }
  },
  "settings": {
    "style": {
      "--cell-font-size": "22px",
      "--cell-line-height": "28px",
      "--button-primary-background-color": "#07c160",
      "--button-primary-border-color": "#07c160"
    },
    "shareInfo": {
      "title": "${default}",
      "path": "${default}",
      "query": "${default}",
      "image": "${logo}"
    }
  },
  "items": []
}
```

---

## Channel 结构

频道级配置，对应小程序底部 Tab 导航。

### TypeScript 定义

```typescript
interface ChannelNode {
  struct: 'channel';
  title: string;
  router: string;
  icon?: string;
  iconActive?: string;
  desc?: string;
  items: Array<PageNode>;
}
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'channel'` | ✅ | 固定值 |
| `title` | string | ✅ | Tab 标题 |
| `router` | string | ✅ | 路由路径，如 `/reading` |
| `icon` | string | - | 未选中状态图标 |
| `iconActive` | string | - | 选中状态图标 |
| `desc` | string | - | 描述 |
| `items` | array | ✅ | Page 列表 |

### 完整示例

```json
{
  "struct": "channel",
  "router": "/reading",
  "title": "读古诗",
  "icon": "/static/icon/reading-default.png",
  "iconActive": "/static/icon/reading.png",
  "desc": "经典古诗词",
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

---

## Page 结构

页面级配置，对应顶部二级导航。

### TypeScript 定义

```typescript
interface PageNode {
  struct: 'page';
  title: string;
  router: string;
  script?: string;
  version?: string;
  desc?: string;
  settings?: {
    keepScreenOn?: boolean;
  };
  items?: Array<ModuleNode>;
}
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'page'` | ✅ | 固定值 |
| `title` | string | ✅ | 页面标题 |
| `router` | string | ✅ | 路由路径，如 `/reading/s1` |
| `script` | string | - | 远程JSON地址（支持 `${version}` 变量） |
| `version` | string | - | 配置版本号 |
| `desc` | string | - | 描述 |
| `settings` | object | - | 页面设置 |
| `settings.keepScreenOn` | boolean | - | 是否保持屏幕常亮 |
| `items` | array | - | Module 列表（如果使用 script，则不需要） |

### 完整示例

#### 方式一：使用 script 远程加载

```json
{
  "struct": "page",
  "title": "唐诗三百首",
  "router": "/reading/s1",
  "script": "https://cdn.example.com/manifest/reading/s1-${version}.json",
  "version": "1.0"
}
```

#### 方式二：直接包含 items

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

---

## Module 结构

模块级配置，页面内的内容分组。

### TypeScript 定义

```typescript
interface ModuleNode {
  struct: 'module';
  title: string;
  router: string;
  desc?: string;
  extends?: object;
  settings?: {
    hideTitle?: boolean;
  };
  items: Array<ComponentNode>;
}
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'module'` | ✅ | 固定值 |
| `title` | string | ✅ | 模块标题 |
| `router` | string | ✅ | 路由路径 |
| `desc` | string | - | 描述 |
| `extends` | object | - | 扩展字段 |
| `settings` | object | - | 模块设置 |
| `settings.hideTitle` | boolean | - | 是否隐藏标题 |
| `items` | array | ✅ | Component 列表 |

### 完整示例

```json
{
  "struct": "module",
  "title": "🎵 常听",
  "desc": "经典儿歌",
  "router": "/index/listening/music",
  "extends": {},
  "settings": {
    "hideTitle": false
  },
  "items": [
    {
      "struct": "component",
      "type": "grid",
      "title": "播放列表",
      "items": []
    }
  ]
}
```

---

## Component 结构

组件级配置，实际渲染的UI元素。

### TypeScript 定义

```typescript
interface ComponentNode {
  struct: 'component';
  type: 'card' | 'cell' | 'grid' | 'player' | 'swiper' | 'image' | 'map';
  title?: string;
  items: Array<ComponentItem>;
}

type ComponentItem = CardItem | CellItem | GridItem | PlayerItem | SwiperItem | ImageItem | MapItem;
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'component'` | ✅ | 固定值 |
| `type` | string | ✅ | 组件类型 |
| `title` | string | - | 组件标题 |
| `items` | array | ✅ | 组件数据项 |

### 组件类型

#### 1. Card 组件

```typescript
interface CardItem {
  title: string;
  desc?: string;
  thumb?: string;
  link?: string;
}
```

**示例**：
```json
{
  "struct": "component",
  "type": "card",
  "items": [
    {
      "title": "檀香紫檀",
      "desc": "小叶紫檀",
      "thumb": "https://example.com/thumb.jpg",
      "link": "dov:#https://example.com/detail.json"
    }
  ]
}
```

#### 2. Cell 组件

```typescript
interface CellItem {
  title: string;
  author?: string;
  contents?: Array<string>;
  link?: string;
}
```

**示例**：
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

#### 3. Grid 组件

```typescript
interface GridItem {
  title: string;
  desc?: string;
  poster?: string;
  link?: string;
  external_link?: string;
}
```

**示例**：
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
      "link": "#小程序://QQ音乐/3ozn00yAvM5edCG",
      "external_link": "https://example.com/detail"
    }
  ]
}
```

#### 4. Player 组件

```typescript
interface PlayerItem {
  title: string;
  author?: string;
  poster?: string;
  src: string;
}
```

**示例**：
```json
{
  "struct": "component",
  "type": "player",
  "items": [
    {
      "title": "小星星",
      "author": "儿歌",
      "poster": "https://example.com/cover.jpg",
      "src": "https://example.com/music.mp3"
    }
  ]
}
```

#### 5. Swiper 组件

```typescript
interface SwiperItem {
  image: string;
  link?: string;
}
```

**示例**：
```json
{
  "struct": "component",
  "type": "swiper",
  "items": [
    {
      "image": "https://example.com/banner1.jpg",
      "link": "dov:#https://example.com/detail1.json"
    },
    {
      "image": "https://example.com/banner2.jpg",
      "link": "dov:#https://example.com/detail2.json"
    }
  ]
}
```

#### 6. Image 组件

```typescript
interface ImageItem {
  src: string;
  mode?: string;
}
```

**示例**：
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

#### 7. Map 组件

```typescript
interface MapItem {
  latitude: number;
  longitude: number;
  markers?: Array<{
    id: number;
    latitude: number;
    longitude: number;
    title?: string;
  }>;
}
```

**示例**：
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

## Pagelet 结构

半屏详情页配置。

### TypeScript 定义

```typescript
interface PageletNode {
  struct: 'pagelet';
  title: string;
  router: string;
  author?: string;
  images?: Array<string>;
  texts?: Array<[string, string]>;
}
```

### 字段详解

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `struct` | `'pagelet'` | ✅ | 固定值 |
| `title` | string | ✅ | 标题 |
| `router` | string | ✅ | 路由路径 |
| `author` | string | - | 作者 |
| `images` | array | - | 图片列表 |
| `texts` | array | - | 文本内容（二维数组） |

### 完整示例

```json
{
  "struct": "pagelet",
  "title": "檀香紫檀",
  "router": "/wood/hongmu/tanxiangzitan",
  "author": "林业专家",
  "images": [
    "/static/images/wood/tanxiangzitan-1.jpg",
    "/static/images/wood/tanxiangzitan-2.jpg",
    "/static/images/wood/tanxiangzitan-3.jpg"
  ],
  "texts": [
    ["学名", "Pterocarpus santalinus"],
    ["俗称", "小叶紫檀"],
    ["科属", "豆科紫檀属"],
    ["产地", "印度南部"],
    ["特征", "木质坚硬，纹理细密，色泽深紫"],
    ["用途", "高档家具、工艺品、乐器"]
  ]
}
```

---

## Settings 配置

### Site Settings

```typescript
interface SiteSettings {
  style?: Record<string, string>;
  shareInfo?: {
    title?: string;
    path?: string;
    query?: string;
    image?: string;
  };
}
```

#### style 样式变量

支持所有 Vant Weapp 的样式变量，常用的有：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--cell-font-size` | 单元格字体大小 | `14px` |
| `--cell-line-height` | 单元格行高 | `24px` |
| `--button-primary-background-color` | 主按钮背景色 | `#07c160` |
| `--button-primary-border-color` | 主按钮边框色 | `#07c160` |

完整列表参考：[Vant Weapp 样式变量](https://github.com/youzan/vant-weapp/blob/dev/packages/common/style/var.less)

#### shareInfo 分享配置

| 字段 | 说明 | 模板变量 |
|------|------|----------|
| `title` | 分享标题 | `${default}`, `${logo}` |
| `path` | 分享路径 | `${default}` |
| `query` | 分享参数 | `${default}` |
| `image` | 分享图片 | `${default}`, `${logo}` |

**模板变量说明**：
- `${default}`: 优先使用当前页面的值，否则使用 site 的值
- `${logo}`: 使用 site 的 icon 字段

### Page Settings

```typescript
interface PageSettings {
  keepScreenOn?: boolean;
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `keepScreenOn` | boolean | 是否保持屏幕常亮 |

### Module Settings

```typescript
interface ModuleSettings {
  hideTitle?: boolean;
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `hideTitle` | boolean | 是否隐藏模块标题 |

---

## 完整示例

### 示例1：完整的 Site 配置

```json
{
  "struct": "site",
  "title": "Hi多福",
  "icon": "/static/icon/logo.png",
  "plugins": {
    "txc": {
      "productId": 123456
    }
  },
  "settings": {
    "style": {
      "--cell-font-size": "22px"
    },
    "shareInfo": {
      "title": "${default}",
      "path": "${default}",
      "query": "${default}",
      "image": "${logo}"
    }
  },
  "items": [
    {
      "struct": "channel",
      "router": "/index",
      "title": "听音律",
      "icon": "/static/icon/listening-default.png",
      "iconActive": "/static/icon/listening.png",
      "items": [
        {
          "struct": "page",
          "title": "歌单",
          "router": "/index/listening",
          "script": "https://cdn.example.com/manifest/listening/list-${version}.json",
          "version": "1.0"
        }
      ]
    },
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
  ]
}
```

### 示例2：完整的 Page 配置

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
      "settings": {
        "hideTitle": true
      },
      "items": [
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
      ]
    },
    {
      "struct": "module",
      "title": "🎵 儿歌",
      "router": "/reading/s1/songs",
      "items": [
        {
          "struct": "component",
          "type": "grid",
          "title": "播放列表",
          "items": [
            {
              "title": "小星星",
              "desc": "经典儿歌",
              "poster": "https://example.com/poster.jpg",
              "link": "#小程序://QQ音乐/xxxxx"
            }
          ]
        }
      ]
    }
  ]
}
```

### 示例3：Pagelet 配置

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
    ["科属", "豆科紫檀属"],
    ["产地", "印度南部"],
    ["特征", "木质坚硬，纹理细密，色泽深紫"],
    ["用途", "高档家具、工艺品、乐器"],
    ["价值", "极其珍贵，有'木中之王'的美誉"]
  ]
}
```

---

## 验证规则

### 必填字段验证

1. 所有层级必须包含 `struct` 和 `title` 字段
2. `router` 字段必须以 `/` 开头
3. `items` 数组不能为空（除了 component 和 pagelet）

### 类型验证

1. `struct` 必须是以下值之一：`site`, `channel`, `page`, `module`, `component`, `pagelet`
2. `component.type` 必须是以下值之一：`card`, `cell`, `grid`, `player`, `swiper`, `image`, `map`

### 路由验证

1. 同一层级的 `router` 不能重复
2. `router` 路径必须符合层级关系：
   - channel: `/xxx`
   - page: `/xxx/yyy`
   - module: `/xxx/yyy/zzz`

---

## 最佳实践

### 1. 使用 TypeScript 类型定义

在开发时使用 TypeScript 类型定义可以获得更好的代码提示和类型检查。

### 2. JSON 格式化

使用 2 空格缩进，保持 JSON 文件的可读性。

### 3. 版本管理

- 小更新（内容修改）：递增小版本号 `1.0` → `1.1`
- 大更新（结构变化）：递增大版本号 `1.0` → `2.0`

### 4. 注释

虽然 JSON 不支持注释，但可以使用 `desc` 字段添加说明。

---

## 工具推荐

### JSON Schema 验证

可以使用 JSON Schema 验证工具验证配置文件的正确性。

### 在线编辑器

- [JSON Editor Online](https://jsoneditoronline.org/)
- [JSON Formatter](https://jsonformatter.org/)

### VS Code 插件

- JSON Tools
- Prettier - Code formatter

---

## 更新日志

- **v1.0.0** (2024-01-01): 初始版本
- 支持 site, channel, page, module, component, pagelet 六种结构
- 支持 card, cell, grid, player, swiper, image, map 七种组件

---

**文档版本**: 1.0.0  
**最后更新**: 2024-01-01
