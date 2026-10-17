# 个人主页 · Personal Homepage

极简黑白灰风格的个人主页，纯 HTML/CSS/JS，零依赖零构建，直接托管在 GitHub Pages。

## 目录结构

```
.
├── index.html              主页（4 个板块：关于 / 项目 / 博客 / 经历）
├── styles.css              全局样式（所有颜色走 CSS 变量）
├── script.js               交互脚本（主题切换 + 页脚年份）
├── assets/
│   ├── avatar.svg          头像占位图，替换成你自己的即可
│   ├── favicon.svg         浏览器标签页图标
│   └── resume.pdf          （可选）如需公开简历可再放回，注意其中的隐私信息
├── blog/
│   ├── index.html          博客列表页
│   └── hello-world.html    示例文章 / 文章模板
└── README.md
```

## 本地预览

用任意方式打开 `index.html` 即可，例如：

```bash
# 方式 1：直接双击
# 方式 2：用 Python 起一个本地服务器（推荐，避免 file:// 的跨域问题）
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 部署到 GitHub Pages

**关键**：仓库名必须是 `<用户名>.github.io`，才能得到 `https://<用户名>.github.io/` 这个专属地址。
你已有的其他仓库都不影响，这只是新增的一个仓库。

假设你的 GitHub 用户名是 `Bussterflowre`：

1. 在 GitHub 上新建仓库，名字填 `Bussterflowre.github.io`（**Public**，私有仓库免费账户不支持 Pages）
2. 在本地初始化并推送：

   ```bash
   cd F:\CodeProject-personal-homepage
   git init
   git add .
   git commit -m "init: personal homepage"
   git branch -M main
   git remote add origin https://github.com/Bussterflowre/Bussterflowre.github.io.git
   git push -u origin main
   ```

3. 打开仓库页面 → **Settings** → 左侧 **Pages**
4. **Source** 选 `Deploy from a branch`
5. **Branch** 选 `main` / `/ (root)`，点 **Save**
6. 等 1-2 分钟，就能通过 `https://Bussterflowre.github.io/` 访问

之后每次修改，`git add . && git commit -m "update" && git push`，1 分钟左右自动生效。

## 怎么改内容

### 改自我介绍
编辑 `index.html` 里 `<!-- ========== 1. 自我介绍 ========== -->` 那一段。

### 换头像
把 `assets/avatar.svg` 换成 `assets/avatar.jpg`（或 png），然后改 `index.html` 里的 `<img src="assets/avatar.svg">` 为对应文件名。

### 新增一个项目
复制 `index.html` 里的 `<article class="card">...</article>` 一整块，改标题/描述/标签/链接即可。
建议按重要性排序，最得意的放最前面。

### 新增一篇博客
1. 复制 `blog/hello-world.html` → `blog/2026-10-15-我的标题.html`
2. 改文件里的 `<h1>`、日期、正文
3. 在 `blog/index.html` 和 `index.html` 的 `<ul class="post-list">` 里加一个 `<li class="post-item">` 指向它

### 改颜色 / 主题
`styles.css` 顶部的 `:root` 和 `[data-theme="dark"]` 两块 CSS 变量集中定义了所有颜色，改这里就能整体换风格。

## 后续可拓展方向

- **绑定自定义域名**：Settings → Pages → Custom domain，按提示在域名商那边加一条 CNAME 记录
- **加评论系统**：Giscus（基于 GitHub Discussions，免费）
- **加访问统计**：Umami / Plausible / Google Analytics
- **升级成静态站生成器**：如果博客写多了想直接用 Markdown，可以考虑迁到 Astro / VitePress / Hugo
