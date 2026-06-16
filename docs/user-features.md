# Nextcloud Office — User-Facing Features

## 1. Opening & Creating Documents

- **Open existing files** from the Files app (right-click or single click)
  - Text documents: ODT, DOCX, DOC, DOTX, RTF
  - Spreadsheets: ODS, XLSX, XLS, XLTX, CSV
  - Presentations: ODP, PPTX, PPT, POTX
  - Other: PDF, SVG, plain text, ODG, VSDX, Pages, Numbers, Keynote
- **Create new files** from the Files "+" menu
  - Text document
  - Spreadsheet
  - Presentation
  - Drawing
- **Template picker** when creating a new file
  - Visual previews of available templates
  - Custom filename entry with validation
  - Templates from system, admin-configured, and personal folder
- **Personal template folder** — designate any Nextcloud folder as a personal template library (via Personal Settings)

## 2. Saving & Exporting

- **Auto-save** — changes saved automatically during editing
- **Save As** — save a copy with a new name and/or location using the Nextcloud file picker
- **Export As** — convert to a different format
  - Examples: DOCX → PDF, ODS → XLSX, ODT → RTF
  - Exported file appears in Nextcloud Files automatically
- **Download** — download the current document directly from the editor toolbar

## 3. Real-Time Collaboration

- **Co-editing** — multiple users edit the same document simultaneously
- **Presence indicators**
  - Colored cursors showing each editor's position
  - User avatars in the toolbar with names on hover
  - Separate list of active viewers (read-only participants)
- **Follow user** — click a collaborator's avatar to follow their cursor and view
- **@mentions** — type `@` in comments to notify users, with autocomplete suggestions
- **File locking** — active editing sessions lock the file to prevent conflicting saves

## 4. Sharing

- **Share panel shortcut** — open Nextcloud's share dialog directly from the editor toolbar
- **Public share links**
  - Edit or view-only depending on share permissions
  - Password-protected shares — password prompt before opening
- **Guest access on public shares**
  - Anonymous users can enter a display name before joining
  - Guest cursors and avatars shown to other collaborators
- **Federated sharing** — co-edit documents with users on other Nextcloud instances
  - Remote users appear with their avatar and display name

## 5. Inserting Nextcloud Content

- **Insert image** — pick an image from Nextcloud Files and embed it inline
- **Insert link** — use the smart picker to link to Nextcloud files, folders, or resources
- **Insert file attachment** — embed a file from Nextcloud storage into the document
- **AI content** (requires Nextcloud Assistant)
  - Insert AI-generated text
  - Insert AI-generated images

## 6. Document Versions

- **Open a previous version** of a document (always read-only)
- Version history accessible from the Nextcloud Files version panel

## 7. Permission-Aware UI

Features shown or hidden automatically based on file and share permissions:

- **Edit toolbar** — hidden when user has view-only access; document opens in read-only mode
- **Download button** — hidden if download is disabled on the share
- **Print option** — disabled if download is blocked
- **Export / Copy** — disabled based on share settings
- **Rename** — hidden in read-only mode
- **Share button** — hidden if the user has no share permission
- **Watermark** — displayed on "secure view" shares to deter screenshots

## 8. Personal Settings

Located in Nextcloud → Settings → Personal → Nextcloud Office:

- **Personal template folder** — set a Nextcloud folder as the source for personal templates
- **Document signing credentials** (if enabled by admin)
  - Upload signing certificate (PEM)
  - Upload signing key
  - Upload CA chain certificate
- **Zotero API key** — configure citation/bibliography management
- **Collabora settings panel** (embedded iframe) — user preferences managed by Collabora
  - UI layout preferences
  - Keyboard shortcuts
  - Regional / locale settings
  - Accessibility options
  - Font preferences

## 9. Desktop & Mobile

- **Open in Desktop Editor** button (if enabled by admin)
  - Hands off the file to the Nextcloud desktop client's local office app
  - Shows a warning that the online session will close
- **Mobile-optimized UI**
  - Touch-friendly toolbar
  - Scroll lock for document reading
  - Integration with Nextcloud iOS/Android apps via one-time direct-edit tokens

## 10. Document Signing (if enabled by admin)

- Sign documents directly from the editor
- Integration with eID Easy electronic signature service
- Signing credentials managed in Personal Settings (see above)

## 11. Zotero / Citation Management (if enabled)

- Set a Zotero API key in Personal Settings
- Insert citations and bibliographies from your Zotero library inside documents
- Notification shown when API key is missing but citations are needed

## 12. Status & Notifications

- **Loading indicator** — spinner with status messages while Collabora initialises
- **Modified indicator** — shows unsaved/modified state
- **Document type favicon** — browser tab icon reflects file type (Writer, Calc, Impress, Draw)
- **Session warnings** — alert when switching to local editor or when a session is closed by the file owner
- **Error messages** — contextual errors if loading fails (e.g., connectivity issues)
- **Zotero notification** — prompt to set API key when needed

---

> **Note:** Some features depend on admin configuration (e.g., watermarks, desktop editor button,
> export/print restrictions, AI features) or Collabora Online version. Users in restricted groups
> may see the editor in view-only mode regardless of file ownership.
