# 🧰 百宝箱

一个部署在 GitHub Pages 上、手机友好的个人多功能工具站。每个功能是一张卡片，点开即用。当前已有「每日金价」，可持续添加新功能。

- **线上地址**：https://xiaochuan201.github.io/gold-price/
- **仓库**：https://github.com/xiaochuan201/gold-price
- 纯静态网页（HTML + CSS + 原生 JS），无后端、无构建步骤，打开即拉取最新数据。

---

## 功能

### 🪙 每日金价（`tools/gold.html`）
- 黄金美元/盎司、人民币/克、美元→人民币汇率
- 国内金价参考（估算）：银行投资金条、金店足金饰品
- 数据来源（纯前端调用，免 key、支持跨域）：
  - 金价：`https://api.gold-api.com/price/XAU`（国际现货 XAU，近实时；**注意不接受 query 参数**）
  - 汇率：`https://open.er-api.com/v6/latest/USD`（取 `.rates.CNY`，每日更新一次）
- 换算：`人民币/克 = 美元盎司价 ÷ 31.1034768 × 汇率`
- 国内价均为估算（国内交易所接口不支持网页跨域）。溢价常量在文件顶部可调：
  - `BANK_SPREAD`（银行金条点差，默认 10 元/克）
  - `JEWELRY_LOW` / `JEWELRY_HIGH`（金饰品牌溢价，默认 150~250 元/克）

---

## 目录结构

```
gold-price/
├── index.html              # 百宝箱首页（工具网格）
├── manifest.json           # PWA 配置（添加到主屏幕时的名称/图标）
├── icon.svg                # App 图标源文件（深色底 + 金色宝箱）
├── icon-192.png            # 主屏/PWA 图标（由 icon.svg 生成）
├── icon-512.png            #   同上
├── apple-touch-icon.png    # iOS 主屏图标 180×180（由 icon.svg 生成）
├── deploy.sh               # 一键上线脚本
├── assets/
│   ├── style.css           # 共享主题样式（改这里全站统一生效）
│   └── common.js           # 共享函数：fmt() / jget() / makeCooldownButton()
└── tools/
    ├── gold.html           # 每日金价工具
    └── _template.html      # 新功能模板（加功能时复制它）
```

### 共享函数（`assets/common.js`）
| 函数 | 说明 |
|---|---|
| `fmt(n, d=2)` | 数字格式化：千分位 + d 位小数 |
| `jget(url)` | 不走缓存的 GET 请求，返回解析后的 JSON |
| `makeCooldownButton(btnId, action, seconds=5)` | 给按钮加「点击转一圈 + N 秒冷却倒计时」 |

---

## 本地开发

源码就是普通文件，**无需安装任何依赖**。

```bash
# 仓库已克隆在本机
cd ~/gold-price

# 浏览器直接打开预览
open index.html
```

> 提示：本地直接打开文件即可看效果；外部数据接口支持跨域，本地也能正常请求。

---

## 新增一个功能（3 步）

1. **复制模板**，改成你的功能：
   ```bash
   cp ~/gold-price/tools/_template.html ~/gold-price/tools/汇率换算.html
   ```
   模板里已接好共享样式和函数，按注释改逻辑即可。

2. **首页加一张卡片**：编辑 `index.html` 的 `.tool-grid`，加入：
   ```html
   <a class="tool" href="tools/汇率换算.html">
     <span class="icon">💱</span>
     <span class="name">汇率换算</span>
     <span class="desc">多币种实时换算</span>
   </a>
   ```

3. **上线**（见下）。

---

## 部署上线

GitHub Pages 已开启（`main` 分支根目录），**推送即自动构建**，约 1 分钟生效。

```bash
# 一键上线：自动 add + commit + push
~/gold-price/deploy.sh "这次改了什么"
```

也可以手动：
```bash
cd ~/gold-price
git add -A && git commit -m "说明" && git push
```

或直接在 GitHub 网页上改文件 → Commit，同样自动上线。

### 重新生成图标
改了 `icon.svg` 后，重新生成 PNG（macOS 自带工具）：
```bash
cd ~/gold-price
qlmanage -t -s 512 -o /tmp icon.svg
sips -z 512 512 /tmp/icon.svg.png --out icon-512.png
sips -z 192 192 /tmp/icon.svg.png --out icon-192.png
sips -z 180 180 /tmp/icon.svg.png --out apple-touch-icon.png
```

---

## 手机使用 / 添加到主屏幕

浏览器打开线上地址后：
- **iPhone（Safari）**：分享 → 添加到主屏幕
- **安卓（Chrome）**：菜单 → 添加到主屏幕 / 安装应用

之后桌面会出现「百宝箱」图标（金色宝箱），点开像独立 App 一样使用。

---

## 备注

- 页面已加 no-cache 设置，更新后一般刷新即可看到最新版；iOS 偶尔需关掉标签页重开。
- 所有功能纯前端，数据来自第三方公开接口，仅供参考，不构成任何投资建议。
