# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Farid Zaffalone (freelance PHP/React & WordPress developer, Draguignan, France). Monorepo with two independent apps:

- `frontend/` — Next.js 15 (App Router) site, deployed standalone. Also hosts the `/admin` dashboard (JWT + 2FA protected) under `app/admin/`.
- `backend/` — hand-rolled PHP 8.1+ MVC API (no framework). Consumed by the frontend for the public contact form and by the `/admin` dashboard for auth/2FA and CRUD on posts, projects, comments, contact messages, chat messages, and newsletter subscribers. Blog/portfolio *display* content on the public site is still static (see below).

Commit messages and UI copy are in French.

Do not scan `frontend/node_modules`, `frontend/.next`, or `backend/vendor` — they are dependency/build output and irrelevant to the code.

## Frontend (`frontend/`)

### Commands

Package manager is **yarn** (`yarn.lock` is the source of truth — do not use `npm install`/`npm run` or generate a `package-lock.json`).

```bash
yarn dev      # dev server, http://localhost:3000
yarn build    # production build
yarn start    # serve the production build
yarn lint     # eslint
yarn format   # prettier --write .
```

No test suite exists in this project.

Requires `frontend/.env.local` (see `.env.local.example`) with `NEXT_PUBLIC_API_URL` pointing at the backend (`http://localhost:8000` for the PHP built-in server).

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
- Styling is SCSS under `public/assets/scss/`, imported once in `app/layout.js` via `main.scss`. Bootstrap 5 + custom template SCSS. All SCSS/CSS lives under `public/assets/scss/` (or `public/assets/css/`) — including scoped CSS Modules like the admin dashboard's, never colocated next to the `.jsx` files that use them.
- Site content (blog posts, portfolio items, services, nav menu) shown on the *public* pages is static data in `frontend/data/*.js`, not fetched from the backend — the public pages don't call the API for content. The `/admin` dashboard (below) does manage this same kind of data (posts, projects) via the API, but that's not yet wired back into the public pages reading it.
- New page/component files under `app/` and `components/` are `.jsx` (not `.js`) unless they're plain non-JSX modules (e.g. `app/layout.js`/`app/page.js` predate this convention and were left as-is; `lib/adminApi.js` has no JSX so it stays `.js`).

### Admin dashboard (`app/admin/`)

Client-side React admin UI, isolated from the public site (no shared header/footer/global chrome — each `/admin/*` page composes only `AdminSidebar` via `app/admin/layout.jsx`).

- `app/admin/layout.jsx` — auth guard (redirects to `/admin/login` if no JWT in `localStorage`; redirects to `/admin/security` if the token's `scope` is `setup_2fa`, forcing 2FA setup before anything else is reachable).
- `app/admin/login/page.jsx` — email/password + conditional TOTP code field (2-step, same form).
- `app/admin/security/page.jsx` — 2FA enrollment (QR code via the `qrcode` npm package, rendered client-side from the backend's `otpauth://` URI) and disable flow.
- `app/admin/{messages,chat,newsletter,comments}/page.jsx` — list/moderate views over contact messages, chat widget messages, newsletter subscribers, blog comments.
- `app/admin/{articles,projects}/` — CRUD (list + `new/` + `[id]/edit/`) over posts/projects, using shared `components/admin/{PostForm,ProjectForm}.jsx`.
- `lib/adminApi.js` — fetch wrapper: reads `NEXT_PUBLIC_API_URL`, attaches the `localStorage` JWT, redirects to login on 401.
- Styling: `public/assets/scss/admin/admin.module.scss`, a CSS Module imported via the `@/public/assets/scss/admin/admin.module.scss` alias — deliberately not merged into `main.scss` so the public site's global styles are untouched.
- The floating "Message Direct" chat widget (`components/common/Chat.jsx`) and a newsletter signup form are **not** wired to the backend yet (deliberate — admin CRUD exists, but nothing on the public site writes to `chat_messages`/`newsletter_subscribers` yet).

## Backend (`backend/`)

### Commands

```bash
composer install
cp .env.example .env    # fill in DB + JWT_SECRET
```

No built-in dev-server script or test suite is defined (`composer.json` has no `scripts` key). `public/.htaccess` rewrites everything to `public/index.php`, which implies Apache/MAMP as the intended local server (comments in `AuthMiddleware.php` reference MAMP explicitly for the `Authorization` header workaround). To run with PHP's built-in server instead: `php -S localhost:8000 -t public`.

Database schema: run `database/migrations.sql` then `database/migrations_v2.sql` (adds `users.totp_secret`/`totp_enabled`, `chat_messages`, `newsletter_subscribers`) against the DB named in `.env` (`DB_NAME`). Migrations are plain numbered SQL files applied by hand — there's no migration runner/tracking table, so check both files before assuming the schema is up to date.

### Architecture

Minimal hand-rolled MVC, PSR-4 autoloaded under `App\` → `src/`:

- `public/index.php` — front controller: applies `CorsMiddleware`, boots `App`, includes `routes/api.php`, dispatches.
- `routes/api.php` requires `routes/public.routes.php` and `routes/admin.routes.php`, both given the `$router` instance.
- `src/Core/Router.php` — exact-match routing plus `{param}` placeholders (converted to regex capture groups on dispatch, params passed as extra args to the handler after `$request`); exact matches are tried first so pre-existing param-less routes are unaffected.
- `src/Core/{Request,Response}.php` — thin wrappers (JSON body parsing, JSON responses).
- `src/config/Database.php` — PDO singleton (mysql, reads `src/config/config.php`, which reads `.env`).
- Auth: `AuthService` (bcrypt hashing + `firebase/php-jwt` signing/verification, JWTs carry a `scope` claim: `full` or `setup_2fa`) + `TotpService` (wraps `spomky-labs/otphp` for TOTP secret generation/verification) + `AuthMiddleware::handle(string $requiredScope = 'full')` (expects `Authorization: Bearer <token>`, reads it via `getallheaders()` with `$_SERVER` fallbacks for FastCGI/MAMP; `'full'` tokens satisfy any required scope, `'setup_2fa'` tokens only satisfy routes explicitly requiring that scope or `'any'`).
- 2FA is **mandatory**: a successful password login for a user with `totp_enabled = 0` returns a `setup_2fa`-scoped token (only good for `/admin/2fa/*`), not a usable session — the frontend forces enrollment before anything else is reachable. A user with 2FA enabled must submit `{email, password, code}` together to get a `full` token.
- Controllers split `Controllers/Admin/*` (JWT-protected, behind `AuthMiddleware::handle()`) vs `Controllers/Public/*` (open, for the frontend to consume).

### Implementation status (as of 2026-09-04)

Implemented:
- Core (`Router`, `Request`, `Response`, `App`), `CorsMiddleware`, `AuthMiddleware` (with scopes)
- `AuthService`, `TotpService`, `MailService` (best-effort `mail()` wrapper, reads `MAIL_TO` from `.env`)
- `Database.php` singleton
- `Models/{User,Post,Project,Comment,Message,ChatMessage,NewsletterSubscriber}.php` — plain static-method models (`all`/`find`/`create`/`update`/`delete` as applicable), no ORM
- `Controllers/Admin/{AuthController,SecurityController,DashboardController,PostController,ProjectController,CommentController,MessageController,ChatMessageController,NewsletterController}.php` — full CRUD/moderation for posts, projects, comments, contact messages, chat messages, newsletter; `DashboardController` returns unread/pending counts for the admin stat tiles
- `Controllers/Public/ContactController.php` (`store` — the only public write endpoint; saves to `messages` and best-effort emails `MAIL_TO`)
- `database/migrations.sql` + `database/migrations_v2.sql` (full schema)

Still scaffolded, empty (0-line) — not a bug, just not written yet:
- `Models/Media.php`
- `Controllers/Public/{PostController,ProjectController,CommentController}.php` (the public site doesn't read posts/projects/comments from the API yet — see frontend architecture note above)
- `Services/UploadService.php`
- `Middlewares/ValidationMiddleware.php`
- `Core/Session.php`

`routes/public.routes.php` registers `POST /admin/login` and `POST /contact`. `routes/admin.routes.php` registers the full CRUD surface for posts/projects/comments/messages/chat-messages/newsletter plus `/admin/dashboard` and `/admin/2fa/{status,setup,enable,disable}` — all behind `AuthMiddleware::handle()` with the appropriate scope.
