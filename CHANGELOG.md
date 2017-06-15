**1.12.33**
- Feature: Restore 'Enable edit for specific groups' feature, fixes #66
- Feature: Only edit textfiles with Collabora Online, when texteditorapp is disabled
- Feature: Include support for X-LOOL-WOPI-Timestamp
- Bug: Undefined variable 'owneruid'

**1.12.32**
- Bug: Show Display Name of user, not its uid in userlist
- Bug: Do not throw exception when user not found. It might be a public link share.
- Bug: Use the file owner from the share object, if available. Fixes #85.
- Bug: Shorter db index name. Fixes #54.

**1.12.31**
- Bug: Guard encryption support

**1.12.30**
- Feature: Support opening encrypted files
- Bug: Respect OOXML settings again
- Bug: Register the change under user’s name when saving the document

**1.12.29**
- Bug: Fix undefined instanceId

**1.12.28**
- Bug: Allow full screen
- Updated screenshots
- Updated translations

**1.12.27**
- Bug: Fix revision history

**1.1.26**
- Bug: Set the correct language tag expected by JS
- Bug: Replace trailing slash of WOPI URL
- Bug: Try opening readonly documents too
- Bug: Fix revision history
- Feature: Add rtf and txt as supported file formats
- Feature: Add icon to admin page sidebar
- Feature: Add logging and template to unhandled exceptions

**1.1.25**
- Bug: Fix height for revision history viewer
- Feature: Support for multitenancy installations of LibreOffice Online

**1.1.24**
- Bug: Fix undefined PHP notices
- Security: Properly check for password on password protected shares
