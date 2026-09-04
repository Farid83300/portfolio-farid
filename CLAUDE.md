# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Farid Zaffalone (freelance PHP/React & WordPress developer, Draguignan, France). Monorepo with two independent apps:

- `frontend/` — Next.js 15 (App Router) site, deployed standalone. Also hosts the `/admin` dashboard (JWT + 2FA protected) under `app/admin/`.
- `backend/` — hand-rolled PHP 8.1+ MVC API (no framework). Consumed by the frontend for the public contact form, for the public blog/portfolio pages (real posts/projects, see below), and by the `/admin` dashboard for auth/2FA and CRUD on posts, projects, categories, tags, comments, contact messages, chat messages, newsletter subscribers, and image uploads.

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

Requires `frontend/.env.local` (see `.env.local.example`) with `NEXT_PUBLIC_API_URL` pointing at the backend. The user runs the backend via **MAMP** (Apache on `:8888`, `backend/` symlinked into MAMP's `htdocs` as `portfolio-farid-backend`), so the working value is `http://localhost:8888/portfolio-farid-backend/public` — the PHP built-in server (`http://localhost:8000`) also works as a fallback (`php -S localhost:8000 -t public` from `backend/`) but isn't what's normally running locally. Only one of these should be up at a time; if the Next dev server can't reach the API, check `lsof -i :8888`/`:8000` before assuming the code is broken.

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
- **Blog and portfolio content is real, API-backed data** — `/blog`, `/blog-details/[slug]`, `/blog/category/[category]`, `/blog/tag/[tag]`, `/project`, and `/project-details/[slug]` all fetch from the backend via `lib/publicApi.js` (`getPosts`, `getPost`, `getProjects`, `getProject`, all server-side `fetch` with `cache: 'no-store'`) instead of importing `frontend/data/blogs.js`/`portfolio.js`. `uploadUrl(path)` in the same file builds the full image URL from `NEXT_PUBLIC_API_URL` + the relative path the API returns (e.g. `articles/xxx.webp`) — those origins must be listed in `next.config.mjs`'s `images.remotePatterns` for `next/image` to accept them.
  - Services and nav menu (`services.js`, `menu.js`) are still static — only blog/portfolio were migrated.
  - `frontend/data/blogs.js`/`portfolio.js` still exist and are still imported by unrelated demo components (`components/common/Blogs.jsx`/`Blogs2-4.jsx`, `components/common/Portfolio.jsx`/`Portfolio2-3.jsx`, used e.g. by the home page's "recent blog"/"latest portfolio" teaser sections) — those were intentionally left alone, don't assume they're dead or that they should also be wired to the API without being asked.
  - `components/blog/Blogs.jsx` (real, API-backed) vs `components/common/Blogs.jsx` (template demo, static data) are two different files with similar names/props — same split exists for `components/projects/Projects.jsx` vs `components/common/Portfolio*.jsx`. Check which one a page actually imports before editing.
  - Card-list thumbnails (`Blogs.jsx`, `Projects.jsx`, `BlogSidebar.jsx`'s recent-post thumb) sit inside template CSS boxes with a fixed height + `object-fit: cover`, so they crop safely regardless of the uploaded image's ratio. The two full-width "hero" images (`BlogDetails.jsx`'s `.thumbnail-top`, `ProjectDetails.jsx`'s `.project-details-thumnail-wrap`) and the project gallery swiper images had **no** such CSS — an image uploaded in the wrong ratio would visibly stretch/distort. All three now carry an inline `style={{ aspectRatio, objectFit: 'cover' }}` matching the `width`/`height` props on the same `<Image>`, so any ratio crops instead of stretching. Recommended upload sizes (paysage/landscape, JPG or WebP, ≤4 MB): featured image ~1200×650, article cover ~1600×830, project thumbnail ~1200×990, project cover ~1600×700, gallery images ~820×590.
- New page/component files under `app/` and `components/` are `.jsx` (not `.js`) unless they're plain non-JSX modules (e.g. `app/layout.js`/`app/page.js` predate this convention and were left as-is; `lib/adminApi.js` has no JSX so it stays `.js`).

### Admin dashboard (`app/admin/`)

Client-side React admin UI, isolated from the public site (no shared header/footer/global chrome — each `/admin/*` page composes only `AdminSidebar` via `app/admin/layout.jsx`).

- `app/admin/layout.jsx` — auth guard (redirects to `/admin/login` if no JWT in `localStorage`; redirects to `/admin/security` if the token's `scope` is `setup_2fa`, forcing 2FA setup before anything else is reachable).
- `app/admin/login/page.jsx` — email/password + conditional TOTP code field (2-step, same form).
- `app/admin/security/page.jsx` — 2FA enrollment (QR code via the `qrcode` npm package, rendered client-side from the backend's `otpauth://` URI) and disable flow.
- `app/admin/{messages,chat,newsletter,comments}/page.jsx` — list/moderate views over contact messages, chat widget messages, newsletter subscribers, blog comments.
- `app/admin/{articles,projects}/` — CRUD (list + `new/` + `[id]/edit/`) over posts/projects, using shared `components/admin/{PostForm,ProjectForm}.jsx`. These forms are feature-complete relative to the old admin they were modeled on: `PostForm` has status/publish date/category select (with inline "create category")/tag checkboxes (with inline "create tag")/featured image upload+alt/SEO fields; `ProjectForm` has subtitle/category (free text)/client/role/date/CSV tags/features (one per line)/live URL/sort order/thumbnail upload/cover image upload/multi-image gallery upload/SEO fields.
- `lib/adminApi.js` — fetch wrapper: reads `NEXT_PUBLIC_API_URL`, attaches the `localStorage` JWT, redirects to login on 401. Also exports `adminUploadFile(file, dir)` for image uploads — sends `multipart/form-data` (no `Content-Type` header, left to the browser for the boundary) to `POST /admin/uploads`, `dir` is one of `articles`, `projects`, `projects/gallery`.
- Styling: `public/assets/scss/admin/admin.module.scss`, a CSS Module imported via the `@/public/assets/scss/admin/admin.module.scss` alias — deliberately not merged into `main.scss` so the public site's global styles are untouched.
- The floating "Message Direct" chat widget (`components/common/Chat.jsx`) is **not** wired to the backend yet (deliberate — admin CRUD/list for `chat_messages` exists, but nothing on the public site writes to it). The newsletter signup form **is** wired (see below).
- **Responsive**: the whole `/admin` section adapts down to tablet/mobile. Below 900px, `AdminSidebar.jsx` switches from a static sidebar to a fixed topbar (logo + hamburger) plus an off-canvas drawer (`.sidebar`/`.sidebarOpen`, dark `.sidebarOverlay`, closes on route change via a `pathname` effect). List tables (`Messages`, `Chat`, `Newsletter`, `Comments`, `Articles`, `Projects`) use a `<colgroup>` with fixed px widths on narrow columns (status/date/views/order/actions) and `width: 'auto'` on the title/name column so it gets the remaining space, combined with `table-layout: fixed` and `.card { overflow-x: auto }` so the table scrolls horizontally inside its card instead of squeezing columns unreadably. `PostForm`/`ProjectForm`'s two-column `.formLayout` (content + sticky aside) collapses to one column under 900px.
- **Footgun**: `public/assets/scss/default/_forms.scss` sets a global `button, input, select, textarea { width: 100%; }` that applies to every `<button>` in `/admin` too (it's loaded via the same root `main.scss`). Any new admin button class must explicitly set `width: auto` (see `.btn`, `.actionLink`, `.menuToggle` in `admin.module.scss`) or it can silently balloon to fill its flex container — this is what caused the mobile hamburger button's icon to render off-center instead of flush right (its invisible clickable box was stretching to fill the topbar). Buttons that *should* be full-width (e.g. login submit) don't need the property at all — they already stretch via the parent's default flex `align-items: stretch`.

## Backend (`backend/`)

### Commands

```bash
composer install
cp .env.example .env    # fill in DB + JWT_SECRET
```

No built-in dev-server script or test suite is defined (`composer.json` has no `scripts` key). `public/.htaccess` rewrites everything to `public/index.php`, which implies Apache/MAMP as the intended local server (comments in `AuthMiddleware.php` reference MAMP explicitly for the `Authorization` header workaround). To run with PHP's built-in server instead: `php -S localhost:8000 -t public`.

Database schema: run `database/migrations.sql`, then `database/migrations_v2.sql` (adds `users.totp_secret`/`totp_enabled`, `chat_messages`, `newsletter_subscribers`), then `database/migrations_v3.sql` (adds `categories`, `tags`, `post_tags`; renames `posts.cover_image` → `featured_image` and adds `featured_image_alt`/`excerpt`/`category_id`/`status`/`views_count`/`meta_*`; adds `projects.category`/`subtitle`/`client`/`role`/`project_date`/`tags`/`features`/`thumbnail`/`cover_image`/`live_url`/`gallery`/`meta_*`/`views_count`/`sort_order` and drops the old `projects.image_url`/`link`) against the DB named in `.env` (`DB_NAME`). Migrations are plain numbered SQL files applied by hand — there's no migration runner/tracking table, so check all three files before assuming the schema is up to date.

`backend/scripts/migrate_from_reeni.php` is a one-off (but idempotent/re-runnable) script that imported the user's real content from their previous site (`portfolio-reeni`, a separate DB + separate MAMP-hosted app) into this schema: 6 posts, 4 projects, 6 categories, 14 tags, plus the associated image files copied into `public/uploads/`. It also reverses a double-UTF-8-encoding bug (`fixMojibake()`) present in a few fields of the source data. Not part of the request lifecycle — run manually with `php scripts/migrate_from_reeni.php` only if re-importing from that source is ever needed again; it upserts by slug so re-running it is safe.

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
- Image uploads: `Services/UploadService.php` validates (jpg/jpeg/png/webp/gif, ≤4 MB) and moves an uploaded file into `public/uploads/{articles|projects|projects/gallery}/` with a slugified+uniqid filename, returning the relative path stored in DB. `Controllers/Admin/UploadController.php` (`POST /admin/uploads`) reads `$_FILES`/`$_POST` directly — the only endpoint that bypasses `Core/Request`'s JSON body parsing, since it's multipart. Uploaded files are served as plain static files by Apache/PHP's built-in server (they exist on disk, so `public/.htaccess`'s rewrite condition `!-f` skips them) — no controller serves them.
- `config('app.url')` (`APP_URL` in `.env`) is the backend's own browser-reachable base URL, used only to build absolute upload URLs in `UploadController`'s response (`{path, url}`). Must match whichever local server is actually running (MAMP vs PHP built-in server — see the frontend commands section above).

### Implementation status (as of 2026-09-05)

Implemented:
- Core (`Router`, `Request`, `Response`, `App`), `CorsMiddleware`, `AuthMiddleware` (with scopes)
- `AuthService`, `TotpService`, `MailService` (best-effort `mail()` wrapper, reads `MAIL_TO` from `.env`), `UploadService`
- `Support/Slugger.php` — plain `slugify()` helper (ASCII transliteration + dasherize), used wherever a slug or filename needs to be derived from user input
- `Database.php` singleton
- `Models/{User,Post,Project,Category,Tag,Comment,Message,ChatMessage,NewsletterSubscriber}.php` — plain static-method models (`all`/`find`/`create`/`update`/`delete` as applicable), no ORM. `Post` joins `categories` and loads tags via `post_tags`; `Project` JSON-encodes/decodes `features`/`gallery` on write/read.
- `Controllers/Admin/{AuthController,SecurityController,DashboardController,PostController,ProjectController,CategoryController,TagController,UploadController,CommentController,MessageController,ChatMessageController,NewsletterController}.php` — full CRUD/moderation for posts, projects, categories, tags, image uploads, comments, contact messages, chat messages, newsletter; `DashboardController` returns unread/pending counts for the admin stat tiles
- `Controllers/Public/{ContactController,PostController,ProjectController,NewsletterController}.php` — `ContactController::store` saves to `messages` and best-effort emails `MAIL_TO`; `Post`/`Project` public controllers back the real public blog/portfolio pages (`index`/`show`, `Post::index` also filters by `?category=`/`?tag=` slug, both `show` methods increment `views_count`); `NewsletterController::store` backs the footer signup form (`components/footers/NewsletterForm.jsx`, used by both `Footer1` and `Footer3`) — upserts by email (re-subscribes if `unsubscribed_at` was set, otherwise silently succeeds on an already-active email, no duplicate row)
- `database/migrations.sql` + `migrations_v2.sql` + `migrations_v3.sql` (full schema)

Still scaffolded, empty (0-line) — not a bug, just not written yet:
- `Models/Media.php`
- `Controllers/Public/CommentController.php` (no public comment-submission endpoint yet — `components/blog/Comment.jsx`'s form is still a non-wired stub, same status as the Chat widget)
- `Middlewares/ValidationMiddleware.php`
- `Core/Session.php`

`routes/public.routes.php` registers `POST /admin/login`, `POST /contact`, `POST /newsletter`, and `GET /posts`, `/posts/{slug}`, `/projects`, `/projects/{slug}`. `routes/admin.routes.php` registers the full CRUD surface for posts/projects/categories/tags/uploads/comments/messages/chat-messages/newsletter plus `/admin/dashboard` and `/admin/2fa/{status,setup,enable,disable}` — all behind `AuthMiddleware::handle()` with the appropriate scope.
