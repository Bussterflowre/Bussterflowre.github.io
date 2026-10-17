# 个人主页 · Orion Zhang

极简黑白灰风格的个人主页，纯 HTML/CSS/JS，零依赖零构建，托管在 GitHub Pages。

- 线上地址：https://orionzhang-ai.github.io/
- 定位：求职简历 + 科研申请双用途（多智能体调度 / 自然语言处理 / 大模型与具身智能）
- 默认英文，导航栏可切换中文

## 目录结构

```
.
├── index.html              主页（两栏布局：左侧信息栏 + 右侧内容区）
├── styles.css              全局样式（颜色全部走 CSS 变量，含亮/暗主题）
├── script.js               交互脚本（主题切换 + 中英切换 + 页脚年份 + 全部文案字典）
├── assets/
│   ├── avatar.jpg          头像（替换同名文件即可）
│   ├── avatar.svg          旧版占位头像，可删
│   └── favicon.svg         浏览器标签页图标
├── blog/
│   ├── index.html          博客列表页
│   └── hello-world.html    示例文章 / 文章模板
└── README.md
```

## 本地预览

```bash
# 方式 1：直接双击 index.html
# 方式 2：本地服务器（推荐）
python -m http.server 8000
# 访问 http://localhost:8000
```

## 日常更新与发布

改完内容后：

```bash
cd F:\CodeProject-personal-homepage
git add -A
git commit -m "update: 说明改了什么"
git push
```

> 如果 `git push` 报 `Connection was reset`，说明需要走代理（Clash Verge 默认端口 7897）：
> ```bash
> git -c http.proxy=http://127.0.0.1:7897 -c https.proxy=http://127.0.0.1:7897 push origin main
> ```

推送后 1–2 分钟自动生效，浏览器记得 `Ctrl+F5` 强刷。

## 中英双语机制（重要）

HTML 默认写英文，中文文案存在 `script.js` 的字典里。**新增任何内容都要改三处**：

1. `index.html` 里元素加 `data-i18n="key"` 属性，内容写英文默认值
2. `script.js` 的 `en` 字典加同 key 的英文
3. `script.js` 的 `zh` 字典加同 key 的中文

key 命名规则：板块名.字段，例如 `news.i5`、`proj7.title`、`pub.p2.meta`。

改完后最省事的自查：点导航栏 `中文` 切一次，看有没有残留英文、或者哪句话没变——漏配的键会保持英文原文。

## 怎么改内容

### 新增一条近况（推荐经常更新）
在 `index.html` 的 `<ul class="news-list">` 最上面加：
```html
<li class="news-item">
  <span class="news-date">2026.11</span>
  <span class="news-text" data-i18n="news.i5">English text</span>
</li>
```
再在 `script.js` 两个字典里加 `news.i5`。

### 新增一个项目
复制 `index.html` 里一个完整的 `<article class="card">...</article>`，改标题/描述/标签，键名顺延（如 `proj7.*`）。
建议按时间倒序，最新的放最前。

### 新增论文 / 专利
复制研究板块 `<ul class="pub-list">` 里的一个 `<li>`，格式：
`作者（自己加粗） · 类型 · 编号（可加链接）· 申请/公开日期`。

### 新增一篇博客
1. 复制 `blog/hello-world.html` → `blog/2026-11-01-标题.html`
2. 改 `<h1>`、日期、正文
3. 在 `blog/index.html` 和 `index.html` 的 `<ul class="post-list">` 里各加一条 `<li class="post-item">`

### 换头像
用同名文件覆盖 `assets/avatar.jpg` 即可，无需改代码。

### 改颜色 / 主题
`styles.css` 顶部 `:root`（亮色）和 `[data-theme="dark"]`（暗色）两块变量集中控制全站配色。

## 部署信息

- 仓库：`orionzhang-ai/orionzhang-ai.github.io`（仓库名 = `<用户名>.github.io` 才会作为用户站点发布）
- Pages：Settings → Pages → Source 选 `Deploy from a branch`，Branch 选 `main` / `/ (root)`
- 旧地址 `bussterflowre.github.io` 在账号改名后已失效，简历/签名请使用新地址

## 后续可拓展

- **自定义域名**：`orionzhang.com` 目前未被注册，可在域名商购买后于 Settings → Pages → Custom domain 绑定，并加 A 记录指向 GitHub Pages
- **Google Scholar / LinkedIn**：侧栏 `side-links` 里有注释模板，填入后即显示
- **评论系统**：Giscus（基于 GitHub Discussions，免费）
- **访问统计**：Umami / Plausible
- **博客多了以后**：可考虑迁到 Astro / VitePress 用 Markdown 写
