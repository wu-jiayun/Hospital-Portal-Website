# through医院门户（Vue + Vite）

## 项目简介

这是一个基于 Vue 3 + Vite 的医院门户演示项目，提供预约挂号、在线咨询、健康科普、满意度调查、科普订阅，以及“医疗场景化信息展示”等功能。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Font Awesome

## 本地运行

在 `vite-through-hospital/` 目录下：

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

## 路由与页面

- `/` 首页
- `/appointment` 预约挂号（需要登录）
- `/consult` 在线咨询（需要登录）
- `/health` 健康科普
- `/scene` 特色内容：专家坐诊筛选 / 医院环境实拍 / 科普文章与视频
- `/satisfaction` 满意度调查（需要登录）
- `/subscribe` 科普订阅（需要登录）
- `/auth` 登录/注册

## 登录拦截与回跳

对需要登录的路由使用 `meta.requiresAuth` 标记。

未登录访问受限页面会跳转到：

`/auth?redirect=原路径&reason=login`

登录成功后会自动回跳至 `redirect` 对应页面。

## 图片资源（河南/郑州医院实拍，离线可用）

项目使用本地图片：`vite-through-hospital/public/images/scene/`。

包含：

- `hero.jpg`（首页宣传图）
- `entrance.jpg`（医院入口/门诊楼）
- `exterior.jpg`（医院外景/楼体）
- `emergency.jpg`（急诊相关）
- `lobby-1.jpg`、`lobby-2.jpg`（大厅/门诊区域）
- `reception.jpg`（导诊/接待区域）
- `waiting-room.jpg`（候诊区）
- `corridor.jpg`（走廊/通道）

### 一键重新下载/覆盖照片

在 `vite-through-hospital/` 目录下执行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\download-scene-photos.ps1
```

该脚本会从公开可用来源下载并覆盖上述文件名（用于演示）。

## 目录结构（简要）

```
远思茹/
├── README.md
└── vite-through-hospital/
    ├── public/
    │   └── images/scene/
    ├── src/
    │   ├── views/
    │   ├── router/
    │   └── stores/
    ├── download-scene-photos.ps1
    └── package.json
```
