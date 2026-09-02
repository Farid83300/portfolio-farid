# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Farid Zaffalone (freelance PHP/React & WordPress developer, Draguignan, France). Monorepo with two independent apps:

- `frontend/` — Next.js 15 (App Router) site, deployed standalone.
- `backend/` — hand-rolled PHP 8.1+ MVC API (no framework), consumed by the frontend for contact form, blog posts, and portfolio/project data.

Commit messages and UI copy are in French.

Do not scan `frontend/node_modules`, `frontend/.next`, or `backend/vendor` — they are dependency/build output and irrelevant to the code.

## Frontend (`frontend/`)

### Commands

```bash
npm run dev      # dev server, http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run format   # prettier --write .
```

No test suite exists in this project.

### Origin and current state

Built from the "Reeni" Next.js portfolio template (ThemeForest/Inversweb), which originally shipped 22 home-page demos, each in dark and "-white" (light) variants, plus vendor demo-switcher UI. **Only demo 1, dark mode, is kept.** All other demos, all `-white` route variants, and every trace of the original template's branding (the "Reeni"/"Inversweb"/ThemeForest name, demo-switcher modal, "buy this template" button, demo screenshots) have been removed as of the 2026-09-02 cleanup. Concretely this means:

- Home page is `app/page.js` at the app root — there is no `/index-01` route.
- Surviving routes: `/`, `/about`, `/contact`, `/blog` (+ `/blog/category/[category]`, `/blog/tag/[tag]`, `/blog-details/[slug]`), `/project` (+ `/project-details/[slug]`), `/service` (+ `/service-details/[slug]`).
- Surviving header/footer/nav components: `Header1`, `Nav1`, `Sidebar`, `MobileMenu`, `Footer1`, `Footer3`, `Copyright`. `Header2-5`, `Footer2/4/5`, the "onepage" nav variants, and the demo-switcher components (`DemoToggler`, `Demomodal`) were deleted as dead code — do not re-add them.
- The logo lives at `public/assets/images/logo/logo.png` (already the user's real logo, referenced as both `darkLogo` and `lightLogo` defaults).
- Some components (e.g. `components/blog/Blogs.jsx`, `components/common/Portfolio*.jsx`, `components/services/Services.jsx`) still carry an unused `isLight` prop that toggled between dark/white route variants. It's harmless dead code (the branch is now unreachable) — no need to touch it unless doing a deeper refactor.
- Real content lives in `frontend/data/*.js` (`blogs.js`, `portfolio.js`, `services.js`, `menu.js`, etc.); several entries still have template placeholder copy (Latin filler text, generic testimonials) that hasn't been rewritten yet.

### Architecture

- App Router pages under `app/`, grouped by route type: `(homes)` no longer used (only the root `page.js` remains), `(blogs)`, `(projects)`, `(services)`, plus `about/` and `contact/`.
- Each page composes section components from `components/common/` (many numbered variants like `Services`, `Services2`, `Services3` — these are legitimate alternate section layouts mixed into the single surviving demo, not per-demo duplicates; don't assume unused ones are dead).
- `components/homes/home-1/` holds the hero/testimonials pieces specific to the one surviving home page.
- `components/common/CommonComponents.jsx` is mounted on every page and renders global floating UI: `Chat`, `ScrollTop`, `Sidebar`, `MobileMenu`.
- Styling is SCSS under `public/assets/scss/`, imported once in `app/layout.js` via `main.scss`. Bootstrap 5 + custom template SCSS.
- Site content (blog posts, portfolio items, services, nav menu) is static data in `frontend/data/*.js`, not fetched from the backend yet — the PHP backend exists but the frontend doesn't call it yet for content.

## Backend (`backend/`)

### Commands

```bash
composer install
cp .env.example .env    # fill in DB + JWT_SECRET
```

No built-in dev-server script or test suite is defined (`composer.json` has no `scripts` key). `public/.htaccess` rewrites everything to `public/index.php`, which implies Apache/MAMP as the intended local server (comments in `AuthMiddleware.php` reference MAMP explicitly for the `Authorization` header workaround). To run with PHP's built-in server instead: `php -S localhost:8000 -t public`.

Database schema: run `database/migrations.sql` against the DB named in `.env` (`DB_NAME`).

### Architecture

Minimal hand-rolled MVC, PSR-4 autoloaded under `App\` → `src/`:

- `public/index.php` — front controller: applies `CorsMiddleware`, boots `App`, includes `routes/api.php`, dispatches.
- `routes/api.php` requires `routes/public.routes.php` and `routes/admin.routes.php`, both given the `$router` instance.
- `src/Core/Router.php` — trivial exact-match routing (`method + uri → callable`), no params/wildcards.
- `src/Core/{Request,Response}.php` — thin wrappers (JSON body parsing, JSON responses).
- `src/config/Database.php` — PDO singleton (mysql, reads `src/config/config.php`, which reads `.env`).
- Auth: `AuthService` (bcrypt hashing + `firebase/php-jwt` signing/verification) + `AuthMiddleware` (expects `Authorization: Bearer <token>`, reads it via `getallheaders()` with `$_SERVER` fallbacks for FastCGI/MAMP).
- Controllers split `Controllers/Admin/*` (JWT-protected, behind `AuthMiddleware::handle()`) vs `Controllers/Public/*` (open, for the frontend to consume).

### Implementation status (as of 2026-09-02)

Only these are implemented:
- Core (`Router`, `Request`, `Response`, `App`), `CorsMiddleware`, `AuthMiddleware`
- `AuthService` (hash/verify/generate/verify JWT)
- `Database.php` singleton
- `Models/User.php`
- `Controllers/Admin/AuthController.php` (`login`)
- `Controllers/Admin/DashboardController.php` (stub — returns a welcome message only)
- `database/migrations.sql` (full schema: `users`, `posts`, `comments`, `projects`, `messages`, with FKs)

Everything else is a scaffolded, empty (0-line) file — not a bug, just not written yet:
- `Models/{Post,Project,Comment,Message,Media}.php`
- `Controllers/Admin/{PostController,ProjectController,CommentController,MessageController}.php`
- `Controllers/Public/{PostController,ProjectController,CommentController,ContactController}.php`
- `Services/{MailService,UploadService}.php`
- `Middlewares/ValidationMiddleware.php`
- `Core/Session.php`

`routes/public.routes.php` and `routes/admin.routes.php` currently register exactly one route each (`POST /admin/login` and `GET /admin/dashboard`, respectively) — expect to add the CRUD routes for posts/projects/comments/messages as those controllers get built out.
