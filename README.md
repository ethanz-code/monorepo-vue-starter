# monorepo-vue-starter

现代化 Monorepo 架构的 Vue 起始项目，基于 Vite、Vue 3、TypeScript，内置 TailwindCSS 原子化方案，采用 pnpm 作为 Monorepo 包管理工具，适合中大型团队高效开发与协作。

## 项目特性

- **Monorepo 架构**：采用 pnpm workspace 管理多包，便于模块复用与团队协作。
- **Vue 3 + Vite**：极速开发体验，支持最新 Composition API。
- **TypeScript 全量类型支持**：集成 vue-tsc，类型安全无忧。
- **TailwindCSS 原子化 CSS**：极致灵活的样式方案，支持自定义扩展。
- **内置通用工具包**：
  - `@monorepo-vue-starter/axios`：高可用 axios 封装，支持全局配置、拦截器、自动重试等。
  - `@monorepo-vue-starter/pinia`：Pinia 状态管理二次封装，集成持久化与插件机制。
- **严格代码规范**：集成 ESLint、Prettier、Commitlint、Husky，保障团队代码质量。
- **现代化开发体验**：支持 VSCode + Volar，类型推断与高亮无缝体验。

## 目录结构

```
monorepo-vue-starter/
├── packages/                # Monorepo 子包
│   ├── axios/               # axios 封装库
│   └── pinia/               # pinia 封装库
├── src/                     # 主应用源码
│   ├── assets/              # 静态资源与全局样式（已引入 TailwindCSS）
│   ├── components/          # 通用组件
│   ├── views/               # 页面视图
│   ├── stores/              # 状态管理
│   └── router/              # 路由配置
├── public/                  # 公共资源
├── package.json             # 根包配置，依赖与脚本
├── pnpm-workspace.yaml      # Monorepo 配置
├── vite.config.ts           # Vite 配置，已集成 TailwindCSS
└── ...                      # 其他配置文件
```

## 快速开始

### 环境要求

- Node.js 18+
- [pnpm](https://pnpm.io/) 10+（Monorepo 依赖管理）

### 安装依赖

```sh
pnpm install
```

### 代码检查与格式化

```sh
pnpm run lint      # 代码规范检查
pnpm run format    # 代码格式化
```

### 类型检查

```sh
pnpm run type-check
```

## 推荐开发工具

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（请禁用 Vetur）

## 依赖说明

- **主依赖**：`vue`、`vue-router`、`@vueuse/core`
- **开发依赖**：`vite`、`@vitejs/plugin-vue`、`tailwindcss`、`eslint`、`prettier`、`husky`、`vue-tsc` 等
- **子包依赖**：
  - `@monorepo-vue-starter/axios`：`axios`、`axios-retry`、`qs`
  - `@monorepo-vue-starter/pinia`：`pinia`、`pinia-plugin-persistedstate`、`zipson`

## 代码规范与提交

- 采用 ESLint + Prettier 统一代码风格
- 提交前自动 lint & format
- 使用 Commitlint 规范提交信息
- Husky 钩子自动化流程

## 进阶用法

- 可在 `packages/` 目录下扩展自定义工具包
- TailwindCSS 配置可在根目录自定义
- 支持多环境配置与环境变量注入

## 参考文档

- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TailwindCSS 官方文档](https://tailwindcss.com/)
- [pnpm 官方文档](https://pnpm.io/)

---

如需二次开发或团队协作建议，欢迎补充需求！
