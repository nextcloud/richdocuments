<!--
  - SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
# Agent notes for richdocuments

Nextcloud Office: the Nextcloud app that embeds Collabora Online. PHP backend in `lib/`, Vue 3 frontend in `src/` built into `js/` with webpack.

## Checks to run after a change

```sh
npm ci && composer install     # once
npm run build                  # or `npm run dev` for an unminified build
npm run lint
composer run cs:check
composer run psalm
```

PHPUnit (`composer run test:unit`) and the Cypress e2e suite need a full server setup and run in CI.

## Local dev environment

`npm run dev:server` starts a throwaway Nextcloud (server `master`, override with `BRANCH=stable35`) with this checkout mounted, plus a Collabora container. It needs Docker and takes a few minutes on first start; later runs reuse the running Nextcloud container. Stop both with `npm run dev:server:stop`.

- Nextcloud: http://localhost:8081, login `admin` / `admin`
- Collabora: http://localhost:9980

The checkout is mounted read-only into the container, so build the frontend locally (`npm run dev` or `npm run watch`) and reload the page. Static files are served with `Cache-Control: no-cache`, so a reload always picks up the new build. PHP changes apply on the next request. Nextcloud runs with `debug` enabled.

Upload a test document over WebDAV:

```sh
curl -u admin:admin -T tests/data/form.odt http://localhost:8081/remote.php/dav/files/admin/form.odt
```

Run occ commands in the container (named after the checkout folder, `docker ps` shows it):

```sh
docker exec -u www-data nextcloud-e2e-test-server_<folder> php occ richdocuments:activate-config
```

## Verifying changes in the browser

Use the Playwright MCP against the dev environment to confirm a frontend change actually works:

1. Log in at http://localhost:8081/index.php/login.
2. Open a document from the Files app, e.g. `http://localhost:8081/index.php/apps/files/files/<fileid>?dir=/&openfile=true`.
3. Check the console messages for errors and take a screenshot.

Things to know:

- The document is rendered inside Collabora's cross-origin iframe. Its text is not visible to `wait_for`; wait a fixed time (around 20 seconds) and use a screenshot instead. Controls inside the iframe, like "Close document", are reachable through the snapshot.
- The editor is mounted by `@nextcloud/viewer` as the `<richdocuments-viewer>` custom element inside the viewer modal. `browser_evaluate` on that element is the quickest way to debug layout.
- Playwright MCP writes snapshots and screenshots to `.playwright-mcp/` (gitignored).
