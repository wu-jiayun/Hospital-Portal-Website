# through医院（Vite 工程化版本）

这是一个基于 **Vite + Vue 3 + Vue Router** 的医院门户单页应用（SPA），包含：
- 预约挂号
- 在线咨询
- 健康科普
- 就医满意度调查
- 健康科普推送订阅
- 夜间模式切换（本地持久化）

## 目录结构

```bash
vite-through-hospital/
  index.html
  package.json
  vite.config.js
  src/
    main.js
    App.vue
    router/
      index.js
    assets/
      theme.css
    views/
      HomeView.vue
      AppointmentView.vue
      ConsultView.vue
      HealthView.vue
      SatisfactionView.vue
      SubscribeView.vue
```

## 启动方式

1. 安装 Node.js（建议 18+）
2. 在该目录执行：

```bash
npm install
npm run dev
```

浏览器访问：

- http://localhost:5173/

## 打包与预览

```bash
npm run build
npm run preview
```

## 路由说明

使用 Hash 路由，适合直接用静态文件部署：
- `/#/` 首页
- `/#/appointment` 预约挂号
- `/#/consult` 在线咨询
- `/#/health` 健康科普
- `/#/satisfaction` 满意度调查
- `/#/subscribe` 科普订阅
