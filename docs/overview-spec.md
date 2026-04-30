# Nextcloud Office — Overview Page Specification

## 1. Goal
Add a new top-level "Overview" page to the richdocuments app that gives every user a single landing page for office work: their recently edited documents, documents shared with them that have been edited recently, and one-click access to user-defined templates.

## 2. Navigation & entry point
- **App-menu entry** registered via `<navigations><navigation>` in `appinfo/info.xml`.
- **Icon**: reuse the existing richdocuments app icon.
- **Label**: same as the existing richdocuments app entry ("Office").
- **Visibility**: every user for whom richdocuments is enabled. No admin toggle, no per-user setting.
- **Default landing**: clicking the icon opens the **Home** view.

## 3. URLs / routes
Each entry is a bookmarkable URL.

| Entry              | Path                                    | Default |
|--------------------|-----------------------------------------|---------|
| Home               | `/apps/richdocuments/overview`          | ✓       |
| My recent          | `/apps/richdocuments/overview/recent`   |         |
| Shared with me     | `/apps/richdocuments/overview/shared`   |         |
| Templates          | `/apps/richdocuments/overview/templates`|         |

Implemented client-side via Vue Router (history mode), all served by a single PHP controller action that renders the SPA shell.

## 4. Page layout
Two-column layout using `@nextcloud/vue` primitives.

- **Left sidebar** (`NcAppNavigation`, ~280 px): vertical list with four entries — Home, My recent, Shared with me, Templates. Each has an icon. Active entry highlighted.
- **Main area** (`NcAppContent`): view content for the active route.

Responsive:
- ≥ 1024 px: sidebar + content side-by-side (default `NcAppNavigation` behaviour).
- 768–1023 px: sidebar collapses into a slide-in drawer behind a hamburger.
- < 768 px: same drawer behaviour; rows simplify to filename + date + thumbnail (drop folder path on small viewports).

## 5. Document scope

### File types
A file qualifies iff its MIME type / extension is one of:
`.docx`, `.xlsx`, `.pptx`, `.odt`, `.ods`, `.odp`, `.pdf`.

PDFs are included. Clicking a PDF opens it in Collabora's PDF viewer mode (read-only or editable depending on the PDF — same behaviour as opening from the Files app).

### "Edited lately" definition
A file qualifies iff `mtime > now() - 60 days`. The single signal is the file's `mtime` from `oc_filecache`. No distinction between Collabora edits and other writes (sync client, drag-and-drop replace, WebDAV, etc.) — anything that bumps `mtime` counts.

### Authorship
"Edited by someone" semantics: a file shows up regardless of whether the current user did the edit. The row's "modified by" column reflects whoever made the most recent change (per filecache / activity), which may be the owner, a co-editor, or the current user.

## 6. Views

### 6.1 Home (default)
Three sections stacked vertically. Each section caps at **6 items**, sorted newest-first.

1. **My recent documents** — files in the user's own storage; "See all →" links to `/recent`.
2. **Shared with me** — files reachable via accepted shares; "See all →" links to `/shared`.
3. **Templates** — user-defined templates; "See all →" links to `/templates`.

Each section renders independently — if one API call fails, the others still load. Empty section shows the generic empty-state copy (see §10) without breaking the layout.

### 6.2 My recent documents
- One row per file, newest-first. **Fixed sort** (no clickable column headers in v1).
- **Row contents**: thumbnail (64×64, from core preview API) · filename · last-modified date (relative, e.g. "2 hours ago", with absolute date as tooltip) · last-modified-by (avatar + display name) · folder path (e.g. `/Projects/Reports`).
- **Click row** → open in Collabora in the **same tab** (`/apps/richdocuments/index?fileId=…`).
- **Search box** at the top of the view: matches against `filename` OR `folder path`, case-insensitive substring. Server-side, debounced 250 ms.
- **Pagination**: page size 25, **infinite scroll** — fetch next page when the user scrolls within ~300 px of the bottom of the list. Spinner shown while loading the next page.

### 6.3 Shared with me
Same layout, behaviour, and row contents as My recent. Source set differs:

**Included** share types:
- Direct user shares (`oc_share` with `share_type = 0`)
- Group shares (`share_type = 1`)
- Circle shares (`share_type = 7`)
- Federated incoming shares (`oc_share_external` / `share_type = 6`)

**Excluded**:
- Public link shares (not tracked per-user; we'd have no way to know which user "received" it).

For federated rows, indicate the source server in the "modified by" column (`Alice (other.example)`).

### 6.4 Templates
- One row per template, sorted by template name asc.
- **Source**: only **user-defined templates** — the templates folder configured for the user by richdocuments (typically `~/Templates`, exact path is whatever richdocuments has stored). Excluded from v1: admin/system templates, and the empty-type seed files in `emptyTemplates/`.
- **Row contents**: thumbnail · template name · file-type icon.
- **Search box**: matches template name only.
- **Pagination**: 25 per page, infinite scroll.

**Click a template** → open **"Create from template" modal** (§7).

## 7. Create-from-template flow

Modal (`NcModal`) with two fields and two buttons.

- **Filename** (text input)
  - Default: `<TemplateName> <YYYY-MM-DD>` (e.g. `Letter 2026-04-26`).
  - Extension is appended automatically based on the template's MIME type — not editable.
- **Save to folder** (folder picker from `@nextcloud/files`)
  - Default: the user's last-used save location (persist in user config, key e.g. `richdocuments.overview.lastTemplateFolder`).
  - Fallback if no last-used location: the user's root folder.
- **Buttons**: `Cancel` / `Create`.

On `Create`:
1. POST to `/overview/create-from-template` with `{ templateFileId, filename, folderPath }`.
2. Server copies the template into the chosen folder, validates name collision (auto-suffix `(1)`, `(2)`, … on conflict), persists `lastTemplateFolder`.
3. Response includes the new file's `fileid`.
4. Frontend navigates the same tab to `/apps/richdocuments/index?fileId=<newId>` and the editor opens.

## 8. Backend API

All endpoints live under the richdocuments app, OCS v2.

| Method | Path                                                                     | Purpose                          |
|--------|--------------------------------------------------------------------------|----------------------------------|
| GET    | `/ocs/v2.php/apps/richdocuments/api/v1/overview/recent`                 | My recent documents              |
| GET    | `/ocs/v2.php/apps/richdocuments/api/v1/overview/shared`                 | Shared with me                   |
| GET    | `/ocs/v2.php/apps/richdocuments/api/v1/overview/templates`              | User templates                   |
| POST   | `/ocs/v2.php/apps/richdocuments/api/v1/overview/create-from-template`   | Create new document from template|

### 8.1 Common GET query params
- `q` — search string (substring, case-insensitive). Optional.
- `cursor` — opaque base64 cursor for keyset pagination. Empty/missing for first page.
- `limit` — defaults to 25, server hard-caps at 25.

### 8.2 Response shape — `recent` and `shared`
```json
{
  "ocs": {
    "data": {
      "items": [
        {
          "fileid": 12345,
          "name": "Q1 Report.docx",
          "path": "/Projects/Reports/Q1 Report.docx",
          "folder": "/Projects/Reports",
          "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "size": 24576,
          "mtime": 1714123200,
          "modifiedBy": {
            "uid": "alice",
            "displayName": "Alice",
            "avatarUrl": "/avatar/alice/64"
          },
          "thumbnailUrl": "/core/preview?fileId=12345&x=64&y=64&a=1",
          "openUrl": "/apps/richdocuments/index?fileId=12345",
          "shareSource": null
        }
      ],
      "nextCursor": "eyJtdGltZSI6MTcxNDEyMzIwMCwiZmlsZWlkIjoxMjM0NX0="
    }
  }
}
```

For `shared`, `shareSource` is populated:
```json
"shareSource": {
  "type": "user|group|circle|federated",
  "displayName": "Alice",
  "remoteServer": "https://other.example/"
}
```
`remoteServer` is `null` for non-federated shares.

`nextCursor` is `null` when there are no more pages.

### 8.3 Response shape — `templates`
```json
{
  "ocs": {
    "data": {
      "items": [
        {
          "fileid": 99,
          "name": "Letter Template.docx",
          "mimetype": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "thumbnailUrl": "/core/preview?fileId=99&x=64&y=64&a=1"
        }
      ],
      "nextCursor": null
    }
  }
}
```

### 8.4 Request shape — `create-from-template`
```json
POST /overview/create-from-template
{
  "templateFileId": 99,
  "filename": "Letter 2026-04-26",
  "folderPath": "/Documents"
}
```

Response:
```json
{
  "ocs": {
    "data": {
      "fileid": 67890,
      "path": "/Documents/Letter 2026-04-26.docx",
      "openUrl": "/apps/richdocuments/index?fileId=67890"
    }
  }
}
```

Errors return standard OCS error envelope with one of:
- `400 invalid_filename` (empty / contains `/` / etc.)
- `403 folder_forbidden` (no write permission on target folder)
- `404 template_not_found` / `404 folder_not_found`
- `409 conflict` (only if auto-suffix is exhausted, which shouldn't happen)

## 9. Query implementation notes

### 9.1 Recent (own files)
```sql
SELECT f.fileid, f.name, f.path, f.mimetype, f.size, f.mtime, f.storage_mtime
FROM oc_filecache f
JOIN oc_mounts m ON m.storage_id = f.storage
WHERE m.user_id = :uid
  AND f.mimetype IN (:allowed_mimetype_ids)
  AND f.mtime > :sixty_days_ago
  AND ( :q IS NULL OR LOWER(f.name) LIKE :q_like OR LOWER(f.path) LIKE :q_like )
  AND ( :cursor_mtime IS NULL OR (f.mtime, f.fileid) < (:cursor_mtime, :cursor_fileid) )
ORDER BY f.mtime DESC, f.fileid DESC
LIMIT 25;
```
Resolve `modifiedBy` via the user's last-modified-by index if present, otherwise default to the file owner.

### 9.2 Shared with me
- Enumerate `oc_share` rows where `share_with = :uid` (type 0/user) or `share_with` ∈ user's groups (type 1) or circles (type 7).
- Plus `oc_share_external` rows where the recipient is `:uid` (type 6 federated).
- Join file metadata, apply same mimetype + mtime filter, same search predicate, same keyset pagination.
- De-duplicate on `fileid` (a file can be reshared via multiple paths) — pick the row whose share grants the highest permissions; if tied, lowest `share_id`.

### 9.3 Templates
Read the user's templates folder via the existing richdocuments templates service (whatever the app already uses to enumerate templates for the "create new" flow in Files). Filter by allowed MIME types. No mtime filter for templates.

### 9.4 Pagination cursor
Cursor = base64 of `{"mtime": <int>, "fileid": <int>}` (for `recent` / `shared`) or `{"name": "<lower>", "fileid": <int>}` (for `templates`). Keyset comparison `(mtime, fileid) < (cursor_mtime, cursor_fileid)` to avoid OFFSET drift on large result sets.

### 9.5 Performance
- Hard limit of 25 per page; no "fetch all" path.
- All queries respect Nextcloud's permission scope — only files the user can read.
- Profile the queries on a representative dataset before merging; add a composite index on `oc_filecache(storage, mimetype, mtime)` only if profiling shows it's needed (and check whether one already exists).
- All four list endpoints should P95 < 200 ms on a user with up to 100 000 files and 1 000 incoming shares.

## 10. States

### Loading
- **First load**: 6 skeleton rows (shimmer) on Home; 25 skeleton rows on dedicated views.
- **Subsequent infinite-scroll loads**: small spinner at the bottom of the list.

### Empty (generic copy is fine)
- My recent / Shared with me, no data: `"No documents edited in the last 60 days."`
- Templates, no data: `"You haven't created any templates yet."` + link to Nextcloud's templates help article.
- Search yields nothing: `"No matches for "<query>"."`

### Error
- Per-section error inline (`NcEmptyContent` with a "Retry" button). Other sections on Home keep working.

## 11. Frontend file layout

New entry point and components inside `apps/richdocuments/`:

```
src/
  overview.js                         # bootstrap (mounts <OverviewApp/>)
  views/Overview/
    OverviewApp.vue                   # NcAppNavigation + NcAppContent + <router-view/>
    HomeView.vue
    RecentView.vue
    SharedView.vue
    TemplatesView.vue
    DocumentRow.vue                   # shared row
    TemplateRow.vue
    CreateFromTemplateModal.vue
    SearchBar.vue
    composables/
      useInfiniteScroll.ts
      useOverviewApi.ts
```

Add to `webpack.js`:
```js
overview: path.join(__dirname, 'src', 'overview.js'),
```

Use `@nextcloud/vue` components (`NcAppNavigation`, `NcAppContent`, `NcAppNavigationItem`, `NcAvatar`, `NcButton`, `NcModal`, `NcTextField`, `NcEmptyContent`, `NcLoadingIcon`) and `@nextcloud/files` for the folder picker.

## 12. Backend file layout

New PHP files under `apps/richdocuments/lib/`:

```
Controller/
  OverviewController.php              # renders SPA shell at /overview*
  OverviewApiController.php           # OCS endpoints
Service/
  OverviewService.php                 # query logic for recent / shared
  TemplateOverviewService.php         # delegates to existing templates service
```

Wire up:
- `appinfo/routes.php`: routes for `overview.index`, `overviewApi.recent`, `overviewApi.shared`, `overviewApi.templates`, `overviewApi.createFromTemplate`. The `overview.index` route uses a wildcard to catch all sub-paths (Vue Router handles them).
- `appinfo/info.xml`: add `<navigations><navigation>` with `<route>richdocuments.overview.index</route>`, `<name>Office</name>`, `<icon>app.svg</icon>` (or whatever the existing icon file is).

## 13. Out of scope for v1
- Sortable column headers (newest-first is fixed).
- Right-click / context menu actions (share, rename, delete, open folder).
- Hover preview / quick look.
- Filter by file type chip-bar.
- Pinning / favouriting.
- System / admin templates and `emptyTemplates/` seeds in the Templates view.
- Tracking which public-link-shared docs the user has opened.
- Multi-select / bulk actions.
- Activity-app integration.
- Admin toggle to disable the overview entry.

## 14. Acceptance checklist
- [ ] Overview entry appears in the top app menu for any user with richdocuments enabled.
- [ ] Clicking it lands on Home at `/apps/richdocuments/overview`.
- [ ] Home shows three sections, each with up to 6 newest-first items.
- [ ] Each "See all →" routes to the corresponding dedicated view.
- [ ] Dedicated views paginate 25-at-a-time with infinite scroll.
- [ ] Search box filters by filename + folder path, debounced 250 ms, server-side.
- [ ] Clicking a doc opens it in Collabora in the same tab.
- [ ] Clicking a template opens the Create-from-template modal; on Create the new doc is saved to the chosen folder and opened.
- [ ] Only `.docx`, `.xlsx`, `.pptx`, `.odt`, `.ods`, `.odp`, `.pdf` are surfaced.
- [ ] Only files with `mtime > now() − 60 d` appear in Recent / Shared.
- [ ] Shared with me includes user / group / circle / federated shares; excludes public link shares.
- [ ] PDFs are included and open in Collabora's PDF viewer.
- [ ] Layout is usable on mobile (drawer nav + condensed rows).
- [ ] Empty / loading / error states render per §10.
