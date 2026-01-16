# monorepo-vue-starter

现代化 Monorepo 架构的 Vue 起始项目，基于 **Bun**、**Vite (Rolldown)**、**Vue 3**、**TypeScript**，内置 **TailwindCSS v4** 原子化方案，采用 **Bun** 作为包管理工具，适合中大型团队高效开发与协作。

## 项目亮点

- **Monorepo 架构**：基于 Bun workspaces，支持多包统一管理，便于模块复用与团队协作。
- **Vue 3 + Vite**：极速开发体验，集成最新 Rolldown-Vite，支持 Composition API。
- **TypeScript 全量类型支持**：集成 vue-tsc，类型安全无忧。
- **TailwindCSS v4**：下一代 TailwindCSS，无需 PostCSS 配置，性能更强。
- **双重代码检查**：
  - **Oxlint**：极速代码检查（比 ESLint 快 50-100 倍）。
  - **ESLint + Prettier**：全面的代码规范与格式化。
- **严格提交规范**：集成 Commitlint、Husky，保障团队代码质量。
- **现代化开发体验**：支持 VSCode + Volar，集成 `code-inspector-plugin` 点击页面元素跳转代码。

## 目录结构

```text
monorepo-vue-starter/
├── packages/                # Monorepo 子包（可扩展自定义工具包）
├── src/                     # 主应用源码
│   ├── assets/              # 静态资源与全局样式
│   ├── components/          # 通用组件
│   ├── views/               # 页面视图
│   ├── stores/              # 状态管理
│   └── router/              # 路由配置
├── public/                  # 公共资源
├── package.json             # 根包配置，依赖与脚本
├── bun.lock                 # Bun 锁定文件
├── vite.config.ts           # Vite 配置，已集成 TailwindCSS v4
├── eslint.config.ts         # ESLint 配置
└── ...                      # 其他配置文件
```

## 快速开始

### 环境要求

- [Bun](https://bun.sh/) 1.0 及以上
- Node.js 18 及以上（部分工具依赖）

### 安装依赖

```sh
bun install
```

### 代码检查与格式化

```sh
bun run lint         # 运行 Oxlint 和 ESLint
bun run lint:oxlint  # 仅运行 Oxlint (极速)
bun run format       # 代码格式化
```

### 类型检查

```sh
bun run type-check
```

### 启动开发服务器

```sh
bun dev
```

### 构建生产环境

```sh
bun run build
```

## 推荐开发工具

- [VSCode](https://code.visualstudio.com/)
- [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## 依赖说明

- **主依赖**：
  - `vue`、`vue-router`、`@vueuse/core`、`lucide-vue-next`
- **开发依赖**：
  - `vite` (Rolldown)、`@tailwindcss/vite` (v4)
  - `oxlint`、`eslint`、`prettier`
  - `husky`、`commitlint`、`lint-staged`
  - `typescript`、`vue-tsc`

## 代码规范与提交

- 采用 **Oxlint** 进行快速反馈，**ESLint + Prettier** 统一代码风格
- 提交前自动 lint & format (Husky)
- 使用 Commitlint 规范提交信息 (`bun run commit` 可使用交互式提交)

## 进阶用法

- 可在 `packages/` 目录下扩展自定义工具包
- TailwindCSS v4 配置更加精简，直接在 CSS 中使用 `@theme`
- 支持多环境配置与环境变量注入

## 参考文档

- [Bun 官方文档](https://bun.sh/docs)
- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [TailwindCSS v4 文档](https://tailwindcss.com/)
- [Oxlint 文档](https://oxc.rs/docs/guide/usage/linter.html)

---

如需二次开发或团队协作建议，欢迎补充需求！
