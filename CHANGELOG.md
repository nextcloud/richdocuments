# Changelog

## 3.2.4

### Fixed

- Only update capabilities on successfull fetch
- Increase timeout when fetching capabilities
- Fix translations on file actions
- Only try to generate previews if convert-to is available
- Trigger favorite action properly
- Set proper nonce on the outer iframe
- Fix guest name input

## 3.2.3

### Fixed
- Check properly if we are in direct editing
- Fix undefined index log warnings
- Fix multipart data when requesting reviews
- Handle UI_Share postmessage from collabora

## 3.2.2

### Added
- Add option to disable certificate validation

### Fixed
- Fix various errors when interacting with the files app
- Show last saved version in the version sidebar
- Make sure the window title is set properly
- Improve admin settings layout
- Allow to uncheck follow current user
- Fix template previews
- Use Nextcloud language instead of locale

## 3.2.1

### Fixed
- Fix issues with mobile editing
- Restore IE11 compatibility
- Hide sidebar when closing the version viewer
- Fix issue when fetching the file model
- Scale Collabora frame to 100% height on mobile
- Updated translations and fix issues with untranslated text

## 3.2.0
- Added: File actions menu in the header
- Added: Handle UI_CreateFile post message
- Added: Handle unreachable collabora instance
- Added: Load capabilities in a background job
- Fixed: Pass proper response to registerFilesMenu
- Fixed: Translation for Insert images
- Fixed: Remove language settings from templates
- Fixed: Better wording for the image file picker
- Fixed: Use first template if none is selected
- Fixed: Proper scroll behaviour on Nextcloud 14/15
- Fixed: Create new text documents from within collabora
- Fixed: Use proper templates on old collabora versions
- Fixed: Convert nextcloud locale to BCP47 languages tag correctly

## 3.1.1
- Fixed: Capabilities fetching when no url is entered
- Fixed: Capabilities timeout of 5 seconds
- Fixed: NC13 compatibility due to missing js capabilities
- Changed: Updated translations

## 3.1.0
- Added: Template picker (if supported by COOL)
- Added: Mobile editing support capability
- Added: Version integration with the Nextcloud sidebar

## 3.0.6
- Added: NC16 compatibility
- Fixed: Translations
- Fixed: NC15 grid view toggle overlay

## 3.0.5
- Fixed: Pass UID for direct tokens (#301)
- Fixed: Do not show nextcloud bar on small screens (#306)
- Fixed: Avatar improvements for editing users (#304)
- Fixed: show password overlay properly (#308)

## 3.0.4
- Fixed: Make php5.6 compatible again (#297)

## 3.03
- Added: Notify clients when page is fully loaded (#291)
- Fixed: Do not show spinner if we nickname chose is visible (#293)
- Fixed:  Disable the vertical swipe to reload gesture (#295)

## 3.0.2
- Fixes: Only show document overlay when document is fully loaded (#283)
- Fixes: Generate assertUrl link with generateurl, so it also works in subfolder installations (#288)
- Fixes: Show displayname on avatar hover (#289)
- Fixes: Do not clear assets on HEAD request (#290)

## 3.0.1
- Fixes: Do not show loading spinner overlay public page if we need a username
- Fixes: Do not duplicate avatars in the top overlay

## 3.0.0
- Bug: use editor to save the user (fixes #184)
- Bug: allow creation of OOXML files if app not in default location (fixes #118)
- Bug: center public edit name

- Fixes: Do not use deprecated OC.webroot
- Fixes: Move to compiled handlebars tempalte to be strict CSP compatible
- Fixes: Do not show building of the interface

- Feature: Allow inserting images directly from Nextcloud
- Feature: Add sharing button to header
- Feature: Use Collabora as a preview provider
- Feature: Show editors in Nextcloud header


## 1.12.38 and 1.12.39
- Bug: fix z-index issue on Nextcloud 13 beta

## 1.12.37
- Feature: Add support for PutRelativeFile for Save As.

## 1.12.36
- Feature: Add avatar to UserExtraInfo (from NC 13)
- Feature: Start listening for standard post messages and ignore deprecated ones
- Feature: Add option to enable the app only for users in a specific group
- Updated translations

## 1.12.35
- Feature: Support for external apps. External apps can now generate a secret token to access richdocuments public API.

## 1.12.34
- Bug: Fix editing publicly shared documents
- Bug: Delete creator/last modifier name from document templates

## 1.12.33
- Feature: Restore 'Enable edit for specific groups' feature, fixes #66
- Feature: Only edit textfiles with Collabora Online, when texteditorapp is disabled
- Feature: Include support for X-LOOL-WOPI-Timestamp
- Bug: Undefined variable 'owneruid'

## 1.12.32
- Bug: Show Display Name of user, not its uid in userlist
- Bug: Do not throw exception when user not found. It might be a public link share.
- Bug: Use the file owner from the share object, if available. Fixes #85.
- Bug: Shorter db index name. Fixes #54.

## 1.12.31
- Bug: Guard encryption support

## 1.12.30
- Feature: Support opening encrypted files
- Bug: Respect OOXML settings again
- Bug: Register the change under user’s name when saving the document

## 1.12.29
- Bug: Fix undefined instanceId

## 1.12.28
- Bug: Allow full screen
- Updated screenshots
- Updated translations

## 1.12.27
- Bug: Fix revision history

## 1.1.26
- Bug: Set the correct language tag expected by JS
- Bug: Replace trailing slash of WOPI URL
- Bug: Try opening readonly documents too
- Bug: Fix revision history
- Feature: Add rtf and txt as supported file formats
- Feature: Add icon to admin page sidebar
- Feature: Add logging and template to unhandled exceptions

## 1.1.25
- Bug: Fix height for revision history viewer
- Feature: Support for multitenancy installations of LibreOffice Online

## 1.1.24
- Bug: Fix undefined PHP notices
- Security: Properly check for password on password protected shares
