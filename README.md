# webservco/app-skeleton

A SvelteKit project template.

SvelteKit web application with email and password login, a responsive layout with dark mode, and offline support as an installable PWA.

- Requires: Node.js, a MariaDB or MySQL database
- Includes: SvelteKit 2 with the Node adapter, Tailwind CSS and [shadcn-svelte](https://www.shadcn-svelte.com/), [Lucia](https://lucia-auth.com/) v3 with Argon2 passwords, [Superforms](https://superforms.rocks/) and Zod, mysql2, Winston, unplugin-icons, a service worker
- Validation: Prettier, ESLint, svelte-check, Vitest and Playwright

---

## Installation

```shell
git clone git@github.com:webservco/app-skeleton.git example-project
cd example-project
git remote rename origin vendor-origin
git remote add origin git@github.com:example/example-project.git
npm install
```

Then customize the project:

- Replace this README.
- Set `name` and `version` in `package.json`. The version shows in the footer and is part of the service worker cache name.
- Set the names and colors in `static/app.webmanifest`, and replace the icons in `static/img/icons/`.
- Set `service` in [src/lib/server/logger/loggerWinston.ts](src/lib/server/logger/loggerWinston.ts).

Create the auth tables:

```sql
CREATE TABLE auth_user (
    id VARCHAR(15) PRIMARY KEY,
    email VARCHAR(45) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    access_level TINYINT(1) UNSIGNED NOT NULL DEFAULT 0
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE auth_user_session (
    id VARCHAR(255) PRIMARY KEY,
    expires_at DATETIME NOT NULL,
    user_id VARCHAR(255) NOT NULL REFERENCES auth_user (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
```

---

## Usage

```shell
# Start the development server and open it in the browser.
npm run dev -- --open
# Build into build/, using .env.production or .env.staging.
npm run build:production
npm run build:staging
# Run the build.
node build
```

| Page | Purpose |
| --- | --- |
| `/` | Home page. |
| `/auth/register` | Create an account and log in. |
| `/auth/login` | Log in. |
| `/auth` | Profile page with the logout button. Redirects to the login page when logged out. |

Pages go in `src/routes/`, the menu links in [src/lib/components/layout/navigation/navigationData.ts](src/lib/components/layout/navigation/navigationData.ts). UI components added with the shadcn-svelte CLI go in `src/lib/components/ui/`.

---

## Configuration

Keys read from `.env.development`, `.env.staging` and `.env.production`:

```ini
# Database connection
DB_HOST=127.0.0.1
DB_PORT=32900
DB_USER=db
DB_PASSWORD=db
DB_NAME=db
```

The values are read with `$env/static/private`, so they're built into the app. Rebuild after changing them.

---

## Notes

The `.env` files are committed with development values. Don't commit real database credentials.

Logs go to `var/log/app-error.log` and `var/log/app-combined.log`, and also to the console in development.

The session cookie is `secure` outside development, so the built app needs HTTPS for login to work.

Login attempts aren't throttled.

Lucia's authors have since deprecated v3.

`npm run test` doesn't work yet. Playwright starts the app with `npm run build`, which doesn't exist (there's `build:production`), and the test looks for a "Welcome to SvelteKit" heading that isn't on the page.

### TODO

- Improve the main layout (`src/routes/+layout.svelte`).

---

## Development

```shell
# Check code style and types.
npm run lint && npm run check
# Fix code style.
npm run format
# Run unit tests.
npm run test:unit
```

---

## License

[MIT](LICENSE.md)
