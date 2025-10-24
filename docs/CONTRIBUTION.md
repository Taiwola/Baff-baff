Perfect 👍 I’ll extend your **`CONTRIBUTION.md`** to include **workflow rules** for contributors. This way, it not only explains the folder structure but also documents **how to collaborate** on Baffa Baffa.

Here’s the complete version:

```markdown
# Baffa Baffa – Project Contribution Guide

Welcome to **Baffa Baffa** 🎉  
This document provides guidelines on how the project is structured and how contributors should navigate, organize, and work on the codebase.  

A clear and consistent project structure is essential for maintainability and scalability. Please follow this guide when contributing.

---

## 📂 Core Project Structure

At the root of the project, the structure looks like this:

```

├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── utils/
│   └── styles/
├── public/
├── package.json
└── next.config.js

```

---

## 📦 The `src` Directory

We use a `src/` directory to separate source code from configuration files.  
**Why?**
- Keeps the root clean
- Consistent with larger JavaScript/TypeScript projects
- Easier integration with tooling and build processes

All application code lives in `src/`.

---

## 🛣 The `app` Directory

The **App Router** in Next.js 15 powers our routing.  

Example structure:

```

src/app/
├── layout.tsx
├── page.tsx
├── (auth)/
│   ├── login/
│   └── register/
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/
└── api/

```

### Notes:
- `layout.tsx` → Defines layout for a section
- `page.tsx` → Defines a route page
- Folders → Create new routes
- Parentheses `( )` → Create **route groups** (don’t affect URL)
- `api/` → API route handlers

---

## 🧩 Components Organization

All reusable components live in `src/components/`.  

```
src/components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   └── Modal/
├── layout/
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
└── features/
    ├── auth/
    └── dashboard/

```

### Types of Components
- **UI Components (`ui/`)** → Building blocks like buttons, inputs, modals  
- **Layout Components (`layout/`)** → Structural pieces like header, footer, sidebar  
- **Feature Components (`features/`)** → Business-specific, e.g., `LoginForm`, `DashboardStats`

---

## ⚙ Utilities and Libraries

We separate pure utilities from business logic:

```

src/
├── utils/
│   ├── formatting.ts
│   ├── validation.ts
│   └── helpers.ts
└── lib/
├── auth.ts
├── api.ts
└── database.ts

```

- **`utils/`** → Pure functions (date formatting, string helpers, calculations)  
- **`lib/`** → Business logic and integrations (auth, API, DB connections, state)  

---

## 🗄 State Management & Models

For state, we use **Zustand**. Each domain has its own store:

```

src/
├── store/
│   ├── auth.store.ts
│   ├── user.store.ts
│   └── theme.store.ts
└── models/
├── user.model.ts
└── product.model.ts

```

- **Stores** → One per domain (auth, user, theme, etc.)  
- **Models** → TypeScript interfaces shared across app  

---

## 🎨 Styling Guidelines

```

src/
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── themes/
│       ├── light.css
│       └── dark.css
└── components/
└── Button/
├── Button.tsx
└── Button.module.css

```

- **Global styles** → `styles/global.css`, `variables.css`, `themes/`  
- **Component styles** → Co-located with component (`Button.module.css`)  

---

## 🏗 Scaling to a Monorepo

If Baffa Baffa grows, we support **Turborepo + pnpm workspaces**:

```

├── apps/
│   ├── web/
│   └── admin/
├── packages/
│   ├── ui/
│   ├── config/
│   └── utils/
├── pnpm-workspace.yaml
└── turbo.json

````

- `apps/` → Each Next.js app (web, admin, etc.)  
- `packages/` → Shared code (UI components, config, utils)  

---

## ✅ Contribution Workflow

### 1. Fork & Branch
- Fork the repository to your GitHub account  
- Create a new branch for your work:  

```bash
git checkout -b feature/your-feature-name
````

### 2. Branch Naming

Use **conventional branch names**:

* `feature/*` → For new features
* `fix/*` → For bug fixes
* `chore/*` → For maintenance tasks
* `docs/*` → For documentation updates

Example:

```
feature/auth-login
fix/dashboard-stats-bug
docs/contribution-update
```

### 3. Commit Messages

Follow **Conventional Commits**:

```
<type>(scope): short description
```

Types:

* `feat` → New feature
* `fix` → Bug fix
* `docs` → Documentation change
* `style` → Code style (formatting, no logic changes)
* `refactor` → Code restructuring
* `test` → Adding or updating tests
* `chore` → Build tools, CI/CD, etc.

Examples:

```
feat(auth): add login form component
fix(dashboard): correct stats calculation bug
docs: update contribution guide
```

### 4. Testing

* Run tests before pushing:

```bash
npm run test
```

* Write tests for new components, utilities, or features

### 5. Pull Requests

* Push your branch:

```bash
git push origin feature/your-feature-name
```

* Open a Pull Request (PR) against `main`
* PR description should include:

  * Summary of changes
  * Screenshots (if UI-related)
  * Reference to any related issues

### 6. Code Review

* At least **one approval** required before merging
* Be open to feedback and iterate as needed

---

## ✅ Best Practices

* **Keep it flat** → Avoid deep nesting of folders
* **Use index files** → Export multiple components/utilities from one place
* **Co-locate files** → Keep related files together
* **Document structure** → Update this guide if the structure changes
* **Be consistent** → Follow conventions across all contributions

---

## 📝 Conclusion

The folder structure and workflow for **Baffa Baffa** are designed to be scalable, maintainable, and developer-friendly.

> Remember: structure should evolve with the project. Refactor when needed, but keep consistency and update this documentation.

Happy coding! 🚀

```

---

Would you like me to also **add a Git commit template** (`.gitmessage.txt`) that enforces this Conventional Commit format so contributors don’t forget, or should I just leave it as part of this doc?
```
