// ============================================================
// 交互脚本：主题切换 + 中英语言切换 + 页脚年份
// 语言方案：HTML 默认英文，data-i18n 元素按字典切换，偏好存 localStorage
// ============================================================

(function () {
  // ---------- 中英文案字典 ----------
  // 键与 index.html 里的 data-i18n 一一对应；新增内容时两处都要加
  const I18N = {
    en: {
      "title": "Orion Zhang · Homepage",
      "nav.logo": "Orion Zhang",
      "nav.about": "About",
      "nav.news": "News",
      "nav.research": "Research",
      "nav.projects": "Projects",
      "nav.toolbox": "Toolbox",
      "nav.timeline": "Experience",
      "nav.blog": "Blog",

      "hero.name": "Orion Zhang",
      "side.role": "Algorithm Engineer",
      "side.org": "ForwardX Robotics",
      "side.loc": "Beijing, China",
      "side.mail.gmail": "Gmail",
      "side.mail.qq": "QQ",
      "side.mail.163": "163",
      "side.mail.work": "Work",
      "hero.bio1":
        "Hi! I am Orion Zhang, currently an algorithm &amp; Golang engineer at ForwardX Robotics (Beijing), building multi-robot fleet scheduling systems for warehouse logistics. I received my bachelor's degree in Artificial Intelligence from Soochow University.",
      "hero.bio2":
        "My interests center on multi-agent systems (MAPF, task allocation, traffic coordination) and natural language processing. Looking ahead, I'm moving toward large language models and embodied AI — bringing LLM-based reasoning into real-world robot fleets.",

      "news.title": "News",
      "news.i1": "Joined ForwardX Robotics, working on fleet scheduling systems for warehouse-logistics AMRs.",
      "news.i0": "Our invention patent application \"A Four-Way Shuttle and Its Operating Method\" was published (CN121516438A), with me as a co-inventor.",
      "news.i2": "Our in-house RCS went live in multiple automated-warehouse projects — from zero to a productized scheduler.",
      "news.i3": "Built the multi-shuttle concurrent scheduling system at Suzhou Mocang Robotics.",
      "news.i4": "Graduated from Soochow University with a B.Eng. in Artificial Intelligence.",

      "research.title": "What I Work On",
      "research.desc":
        "I care about three questions: <strong>how a fleet of agents can coordinate efficiently and safely in the physical world</strong>, <strong>how machines understand the emotions and semantics in human language</strong>, and <strong>how LLM-based agents can reason and act in the real world</strong>. The first two are what I have built; the third is where I am heading.",
      "res.a.title": "Multi-Agent Systems &amp; Fleet Scheduling",
      "res.a.desc":
        "Scheduling for warehouse-logistics robot fleets: multi-agent path finding (MAPF) built on CBS conflict-based search and SIPP space-time reservation, optimal task–vehicle matching via the Hungarian algorithm, deadlock avoidance via Banker's algorithm, plus order-level combinatorial optimization (GBDT ETA estimation, bin packing, clustering). These algorithms run at scale on heterogeneous fleets (AMRs / four-way shuttles). I'd like to further explore multi-agent reinforcement learning (MARL) under real-world constraints.",
      "res.b.title": "Digital Twin &amp; Simulation Validation",
      "res.b.desc":
        "I built a tick-driven warehouse simulation engine: trapezoidal-velocity kinematics, collision detection and deadlock resolution. It runs as a virtual PLC against the real scheduler for hardware-in-the-loop validation, with fault injection, replay and headless capacity stress tests — so scheduling algorithms are fully verified before they touch a real warehouse.",
      "res.c.title": "NLP · Affective Computing",
      "res.c.desc":
        "The core of my undergraduate research: EmoVecLSTM, an end-to-end emotion-recognition framework that fuses the NVDM neural topic model with LSTM, trained and ablated on DailyDialog. Next I'd like to explore emotion understanding and dialogue modeling in the LLM era.",
      "res.d.title": "Knowledge Graphs &amp; Information Extraction",
      "res.d.desc":
        "Built a COVID biomedical knowledge graph: named entity recognition, rule-based relation extraction, and the full pipeline from literature collection to graph construction. Interested in domain-specific knowledge engineering and KGQA.",
      "res.e.title": "Looking Ahead: LLM &amp; Embodied AI",
      "res.e.desc":
        "My next step: bringing large-model reasoning into embodied systems — LLM-based task planning and decision-making for robot fleets, vision-language-action (VLA) models, and sim-to-real evaluation. This is where I am investing my time now, and I would love to go further in this direction.",
      "pub.title": "Papers &amp; Patents",
      "pub.p1.title": "A Four-Way Shuttle and Its Operating Method",
      "pub.p1.meta": "Wang Lei, Shi Xianliang, Wang Peng, <strong>Orion Zhang</strong>, Xue Ye · Chinese Invention Patent Application",
      "pub.p1.date": "filed 2025.11.28, published 2026.02.13",

      "projects.title": "Selected Projects",
      "projects.desc": "Things I put a lot of heart into and that best represent me, in reverse chronological order.",
      "proj1.title": "Fleet Scheduling System for Warehouse AMRs (ERMS)",
      "proj1.desc":
        "Working on a scheduling platform for large AMR fleets: a multi-robot traffic-control engine (meeting / overtaking / detour / deadlock recovery), a from-scratch GBDT for robot ETA estimation, combinatorial-optimization algorithms such as bin packing and mutual-nearest-neighbor clustering, and an on-robot edge agent bridging ROS with multi-chassis adaptation.",
      "proj1.t1": "Go Microservices / gRPC",
      "proj1.t3": "Combinatorial Optimization",
      "proj2.title": "Multi-Agent Warehouse Scheduler (RCS)",
      "proj2.desc":
        "A four-way-shuttle scheduling kernel built from zero: multi-agent path finding with CBS conflict-based search + SIPP space-time reservation, Hungarian-algorithm task–vehicle matching, and Banker's-algorithm deadlock avoidance; supports dozens of shuttles concurrently across multi-level warehouses and shipped to multiple projects.",
      "proj2.t3": "Hungarian Algorithm",
      "proj2.t4": "Banker's Algorithm",
      "proj3.title": "Digital Twin Simulation Platform",
      "proj3.desc":
        "A digital-twin simulation engine for the scheduler: tick-driven at 20 TPS, with trapezoidal kinematics, collision detection and deadlock resolution. It acts as a virtual PLC for hardware-in-the-loop validation, supports fault injection, replay and headless capacity stress tests, and is guarded by 150+ automated tests.",
      "proj3.t3": "Digital Twin",
      "proj3.t4": "Fault Injection",
      "proj4.title": "Emotion Recognition via Conversational Topic Modeling",
      "proj4.desc":
        "EmoVecLSTM: a framework combining the NVDM neural topic model with LSTM, fusing topic distributions with affective features for end-to-end emotion recognition; trained and evaluated on DailyDialog.",
      "proj5.title": "Generative Machine Translation &amp; Dialogue",
      "proj5.desc":
        "Implemented Transformer and Seq2Seq models in PyTorch, trained on English–French parallel corpora and the Cornell Movie Dialogs Corpus, for end-to-end translation and human–machine dialogue.",
      "proj6.title": "COVID Biomedical Knowledge Graph",
      "proj6.desc":
        "Named entity recognition with BioSpaCy and rule-based relation extraction, covering the full pipeline from literature crawling to a lightweight knowledge graph; owned the crawler, information extraction and graph construction.",
      "proj6.t2": "Knowledge Graph",
      "proj6.t3": "Crawler",

      "toolbox.title": "Toolbox",
      "toolbox.desc": "What I actually use day to day — not resume keywords.",
      "tb.cat1": "Most-used",
      "tb.cat2": "Algorithms",
      "tb.cat3": "Engineering",
      "tb.cat4": "Languages",
      "tb.a1": "MAPF (CBS / SIPP)",
      "tb.a2": "Hungarian Algorithm",
      "tb.a3": "Banker's Algorithm",
      "tb.a5": "Bin Packing / Clustering",
      "tb.e1": "Kratos Microservices",
      "tb.l1": "Chinese · native",
      "tb.l2": "English · CET-6, at ease with papers &amp; docs",

      "timeline.title": "Experience",
      "tl1.org": "ForwardX Robotics",
      "tl1.period": "2026.03 – Present",
      "tl1.role": "Algorithm &amp; Golang Engineer",
      "tl1.desc":
        "Working on the fleet scheduling system for warehouse-logistics AMRs: traffic control, task scheduling and order-optimization algorithms, plus the on-robot edge agent and multi-chassis adaptation.",
      "tl2.org": "Suzhou Aotelai Logistics Technology Co., Ltd. (ATL)",
      "tl2.role": "Algorithm / Software Engineer · Software Center",
      "tl2.desc":
        "Built an in-house multi-agent warehouse scheduler (RCS) from zero: a highly compatible scheduling kernel supporting our own and mainstream four-way shuttles, with CBS/SIPP path finding and Hungarian matching at its core; integrated WMS/WCS into a reusable, configurable standardized product that accelerated delivery.",
      "tl3.org": "Suzhou Mocang Robotics Co. (MagicStore)",
      "tl3.role": "Golang Engineer · Software Dept.",
      "tl3.desc":
        "Designed and implemented a concurrent multi-shuttle scheduling system on the Kratos microservice framework; developed core modules for communication, path planning and task queues; introduced task pre-allocation and dynamic load balancing, cutting empty runs and task waiting time.",
      "tl4.org": "Soochow University",
      "tl4.role": "B.Eng. in Artificial Intelligence · School of Computer Science &amp; Technology (211 / Double First-Class)",
      "tl4.desc":
        "GPA 3.2/4.0 (NLP 3.9, Deep Learning 3.8, etc.); served as President of the Student Union of the School of CS and head of the Sports Department.",

      "awards.title": "Selected Honors",
      "awards.desc": "Some competitions and campus honors along the way.",
      "aw1.name": "Mathematical Contest in Modeling (MCM/ICM) · Meritorious Winner",
      "aw1.meta": "International · 2023",
      "aw2.name": "Lanqiao Cup Programming Contest · Jiangsu, Group A · Third Prize",
      "aw2.meta": "Provincial · 2023",
      "aw3.name": "China College Students' \"Internet+\" Innovation &amp; Entrepreneurship Competition · Campus Third Prize",
      "aw3.meta": "Campus · 2022",
      "aw4.name": "National English Competition for College Students · Third Prize",
      "aw4.meta": "National · 2022",

      "blog.title": "Blog",
      "blog.desc":
        "Study notes, technical thoughts, occasionally life. <a href=\"blog/index.html\">View all →</a>",
      "blog.post1": "Hello, World · My First Post",

      "footer.name": "Orion Zhang",
      "footer.hosted": "Hosted on"
    },

    zh: {
      "title": "张宇 · 个人主页",
      "nav.logo": "张宇",
      "nav.about": "关于",
      "nav.news": "近况",
      "nav.research": "研究",
      "nav.projects": "项目",
      "nav.toolbox": "工具箱",
      "nav.timeline": "经历",
      "nav.blog": "随笔",

      "hero.name": "张宇",
      "side.role": "算法工程师",
      "side.org": "北京灵动科技（ForwardX Robotics）",
      "side.loc": "中国 · 北京",
      "side.mail.gmail": "Gmail",
      "side.mail.qq": "QQ",
      "side.mail.163": "163",
      "side.mail.work": "工作邮箱",
      "hero.bio1":
        "Hi! 我是张宇，目前在北京灵动科技（ForwardX Robotics）担任算法与 Golang 开发工程师，从事仓储物流多机器人集群调度系统的研发。我本科毕业于苏州大学人工智能专业。",
      "hero.bio2":
        "我的兴趣横跨多智能体系统（多智能体路径规划、任务分配与交通管控）与自然语言处理。着眼未来，我希望深入大语言模型与具身智能，把基于大模型的推理与决策带进真实的机器人集群。",

      "news.title": "近况",
      "news.i1": "入职北京灵动科技（ForwardX Robotics），参与仓储物流 AMR 集群调度系统的研发。",
      "news.i0": "参与发明的专利申请《一种四向穿梭车及其使用方法》公开（CN121516438A）。",
      "news.i2": "自研 RCS 推动多个立体库项目软件落地，完成从 0 到 1 的产品化。",
      "news.i3": "在苏州魔仓机器人参与多辆四向车并发调度的智能调度系统研发。",
      "news.i4": "从苏州大学人工智能专业毕业，结束四年本科时光。",

      "research.title": "我在研究什么",
      "research.desc":
        "我关注三个问题：<strong>一群智能体如何在真实物理环境中高效、安全地协同</strong>，<strong>机器如何读懂语言中的情感与语义</strong>，以及<strong>基于大模型的智能体如何在真实世界中推理与行动</strong>。前两个是我已经做过的，第三个是我正在走向的方向。",
      "res.a.title": "多智能体系统与集群调度",
      "res.a.desc":
        "面向仓储物流场景的多机器人集群调度：以 CBS 冲突搜索与 SIPP 时空预约为核心的多智能体路径规划（MAPF）、匈牙利算法任务-车辆最优匹配、银行家算法死锁避免，以及 GBDT 到达时间预估、装箱与聚类等订单组合优化；算法在异构机器人集群（AMR / 四向穿梭车）上规模化落地。希望进一步探索多智能体强化学习（MARL）在真实约束下的应用。",
      "res.b.title": "数字孪生与仿真验证",
      "res.b.desc":
        "自研 tick 驱动的仓储仿真引擎：梯形加减速运动学、碰撞检测与死锁解环，以「虚拟 PLC」身份对接真实调度系统做硬件在环式验证，支持故障注入、仿真回放与产能压测——让调度算法在部署到真实仓库前就能被完整检验。",
      "res.c.title": "自然语言处理 · 情感计算",
      "res.c.desc":
        "本科阶段的核心研究积累：融合神经主题模型（NVDM）与 LSTM 的端到端情绪识别框架 EmoVecLSTM，在 DailyDialog 数据集上完成训练与消融实验；后续希望探索大语言模型时代的情感理解与对话建模。",
      "res.d.title": "知识图谱与信息抽取",
      "res.d.desc":
        "完成新冠生物医学知识图谱的构建：命名实体识别、基于规则的关系抽取、从文献采集到图谱落地的完整流程。关注垂直领域知识工程与图谱问答方向。",
      "res.e.title": "下一站：大模型与具身智能",
      "res.e.desc":
        "希望把大模型的推理能力带进具身系统：面向机器人集群的 LLM 任务规划与决策、视觉-语言-动作模型（VLA），以及仿真到真实的迁移评估。这是我正在补课与投入的方向，也期待在这一方向上继续深造。",
      "pub.title": "论文 / 专利",
      "pub.p1.title": "一种四向穿梭车及其使用方法",
      "pub.p1.meta": "王磊、史显良、王鹏、<strong>张宇</strong>、薛烨 · 中国发明专利申请",
      "pub.p1.date": "2025.11.28 申请，2026.02.13 公开",

      "projects.title": "做过的事",
      "projects.desc": "几件我投入过很多心血、也最能代表我的东西，按时间倒序排列。",
      "proj1.title": "仓储物流 AMR 集群调度系统（ERMS）",
      "proj1.desc":
        "参与研发面向大规模 AMR 集群的调度平台：多机交通管控引擎（会车 / 超车 / 绕行 / 死锁恢复）、自研 GBDT 预估机器人到达时间、装箱与互近邻聚类等订单组合优化算法，以及 ROS 桥接的车端边缘代理与多底盘适配。",
      "proj1.t1": "Go 微服务 / gRPC",
      "proj1.t3": "组合优化",
      "proj2.title": "多智能体仓储调度系统（RCS）",
      "proj2.desc":
        "从 0 到 1 自研的四向穿梭车调度内核：CBS 冲突搜索 + SIPP 时空预约的多智能体路径规划、匈牙利算法任务-车辆最优匹配、银行家算法死锁避免；支撑多层立体库数十台穿梭车并发调度，推动多个项目软件落地。",
      "proj2.t3": "匈牙利算法",
      "proj2.t4": "银行家算法",
      "proj3.title": "数字孪生仿真平台",
      "proj3.desc":
        "为调度系统自研的数字孪生仿真引擎：20 TPS tick 驱动，梯形加减速运动学、碰撞检测与死锁解环；以虚拟 PLC 身份对接真实调度系统做硬件在环验证，支持故障注入、仿真回放与无头产能压测，150+ 项自动化测试保障回归。",
      "proj3.t3": "数字孪生",
      "proj3.t4": "故障注入",
      "proj4.title": "基于对话主题建模的情绪识别",
      "proj4.desc":
        "采用神经主题模型（NVDM）与 LSTM 结合的 EmoVecLSTM 框架，融合主题分布与情感特征做端到端情绪识别，在 DailyDialog 数据集上训练与实验。",
      "proj5.title": "生成式机器翻译与对话系统",
      "proj5.desc":
        "基于 PyTorch 实现 Transformer 与 Seq2Seq 模型，分别使用英法平行语料与 Cornell 电影对话语料训练，构建端到端的机器翻译与人机对话系统。",
      "proj6.title": "新冠生物医学知识图谱构建",
      "proj6.desc":
        "基于 BioSpaCy 的命名实体识别与规则驱动的关系抽取，完成从文献数据采集到轻量级知识图谱构建；负责爬虫开发、知识抽取与图谱构建。",
      "proj6.t2": "知识图谱",
      "proj6.t3": "爬虫",

      "toolbox.title": "工具箱",
      "toolbox.desc": "这些是我日常真正在用的东西，不是简历关键词。",
      "tb.cat1": "写得最多的",
      "tb.cat2": "算法侧重",
      "tb.cat3": "工程生态",
      "tb.cat4": "语言",
      "tb.a1": "MAPF（CBS / SIPP）",
      "tb.a2": "匈牙利算法",
      "tb.a3": "银行家算法",
      "tb.a5": "装箱 / 聚类",
      "tb.e1": "Kratos 微服务",
      "tb.l1": "中文 · 母语",
      "tb.l2": "英语 · CET-6，读文献无压力",

      "timeline.title": "走过的路",
      "tl1.org": "北京灵动科技有限公司",
      "tl1.period": "2026.03 - 至今",
      "tl1.role": "算法与 Golang 开发工程师",
      "tl1.desc":
        "参与仓储物流 AMR 集群调度系统研发：交通管控、任务调度与订单优化算法，以及车端边缘代理与多底盘适配等核心模块。",
      "tl2.org": "苏州市奥特莱物流科技有限公司",
      "tl2.role": "算法工程师 / 软件工程师 · 软件中心",
      "tl2.desc":
        "自研多智能体仓储调度系统（RCS）：基于公司业务场景从 0 到 1 开发高兼容性调度内核，支持自有及主流厂商四向车；以 CBS / SIPP 多智能体路径规划与匈牙利算法任务匹配为核心，融合 WMS / WCS 打造可复用、可配置的标准化产品，加速项目交付。",
      "tl3.org": "苏州魔仓机器人有限公司",
      "tl3.role": "Golang 开发工程师 · 软件部",
      "tl3.desc":
        "基于 Kratos 微服务架构设计并实现多辆四向车并发调度的智能调度系统；研发通信、路径规划、任务队列管理等核心模块；引入任务预分配与动态负载均衡，有效降低车辆空驶率与任务等待时间。",
      "tl4.org": "苏州大学",
      "tl4.role": "人工智能 · 本科 · 计算机科学与技术学院（211 / 双一流）",
      "tl4.desc":
        "总绩点 3.2 / 4.0（自然语言处理 3.9、深度学习 3.8 等）；曾任计算机科学与技术学院学生会主席、体育部部长。",

      "awards.title": "一些认可",
      "awards.desc": "比赛和校园里拿过的一些奖，聊作纪念。",
      "aw1.name": "美国大学生数学建模竞赛（MCM/ICM）· M 奖",
      "aw1.meta": "国际级 · 2023",
      "aw2.name": "蓝桥杯程序设计大赛 · 江苏省 A 组三等奖",
      "aw2.meta": "省级 · 2023",
      "aw3.name": "「互联网+」大学生创新创业大赛 · 校三等奖",
      "aw3.meta": "校级 · 2022",
      "aw4.name": "全国大学生英语能力竞赛 · 三等奖",
      "aw4.meta": "国家级 · 2022",

      "blog.title": "随笔",
      "blog.desc": "学习笔记、技术思考，偶尔写点生活。<a href=\"blog/index.html\">查看全部 →</a>",
      "blog.post1": "你好，世界 · 我的第一篇博客",

      "footer.name": "张宇",
      "footer.hosted": "托管于"
    }
  };

  // ---------- 1. 主题切换（亮 / 暗） ----------
  const THEME_KEY = "theme-preference";
  const themeToggle = document.getElementById("theme-toggle");

  function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "dark" ? "◑" : "◐";
  }

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current =
        document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ---------- 2. 语言切换（英 / 中） ----------
  const LANG_KEY = "lang-preference";
  const langToggle = document.getElementById("lang-toggle");

  function applyLang(lang) {
    const dict = I18N[lang];
    if (!dict) return;
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.title = dict["title"];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    if (langToggle) langToggle.textContent = lang === "zh" ? "EN" : "中文";
  }

  const savedLang = localStorage.getItem(LANG_KEY) === "zh" ? "zh" : "en";
  applyLang(savedLang);

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const current = localStorage.getItem(LANG_KEY) === "zh" ? "zh" : "en";
      const next = current === "zh" ? "en" : "zh";
      localStorage.setItem(LANG_KEY, next);
      applyLang(next);
    });
  }

  // ---------- 3. 页脚年份自动更新 ----------
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
