# Changelog

## 6.3.8

### Added

- feat: add config option mobile_editing [#3157](https://github.com/nextcloud/richdocuments/pull/3157)

## 6.3.7

### Fixed

- fix: Apply proper color values on Collabora 23.05 @juliushaertl [#3117](https://github.com/nextcloud/richdocuments/pull/3117)
- fix: Revert change of extension which should refer to the new file extension [#3135](https://github.com/nextcloud/richdocuments/pull/3135)
- fix: Use a proper empty xlsx file [#3127](https://github.com/nextcloud/richdocuments/pull/3127)
- fix: fix: Provide valid fileList and fileId context on new file action [#3136](https://github.com/nextcloud/richdocuments/pull/3136)


## 6.3.6

### Fixed

- Fix file templates on public links @juliushaertl [#2903](https://github.com/nextcloud/richdocuments/pull/2903)

## 6.3.5

### Fixed

- Fix viewer height on safari mobile @julien-nc [#2807](https://github.com/nextcloud/richdocuments/pull/2807)
- Workaround for en-AU language/locale [#2844](https://github.com/nextcloud/richdocuments/pull/2844)
- fix: Trigger initial setup earlier [#2850](https://github.com/nextcloud/richdocuments/pull/2850)
- Hide close button on single file shares that have hide download enabled [#2859](https://github.com/nextcloud/richdocuments/pull/2859)


## 6.3.4

### Fixed

- Fix loading share links for logged in users @juliushaertl [#2787](https://github.com/nextcloud/richdocuments/pull/2787)
- Avoid exception when uploading epub [#2779](https://github.com/nextcloud/richdocuments/pull/2779)

## 6.3.3

### Fixed

- Be less strict with splitting the wopi allow list [#2695](https://github.com/nextcloud/richdocuments/pull/2695)
- Another attempt to work around Safari issues [#2720](https://github.com/nextcloud/richdocuments/pull/2720)
- Load viewer scripts depending on share ownership [#2748](https://github.com/nextcloud/richdocuments/pull/2748)
- Fix creating new files from user templates [#2743](https://github.com/nextcloud/richdocuments/pull/2743)
- fix: Open pdf files by default on share links if files_pdfviewer is disabled [#2725](https://github.com/nextcloud/richdocuments/pull/2725)
- Fix IPv6 handling in WOPI allow list [#2710](https://github.com/nextcloud/richdocuments/pull/2710)
- minimal template.odg (locale agnostic) [#2732](https://github.com/nextcloud/richdocuments/pull/2732)
- Log info message on wopi ip mismatch [#2691](https://github.com/nextcloud/richdocuments/pull/2691)


## 6.3.2

### Fixed

- Improve error handling for global template uploads [#2611](https://github.com/nextcloud/richdocuments/pull/2611)
- Increase timeout for preview generation [#2633](https://github.com/nextcloud/richdocuments/pull/2633)
- Fix array access error when requesting preview while not having access to Collabora [#2642](https://github.com/nextcloud/richdocuments/pull/2642)
- Pass the proper target path/name for new files created through direct editing [#2637](https://github.com/nextcloud/richdocuments/pull/2637)
- Always show the close button [#2624](https://github.com/nextcloud/richdocuments/pull/2624)
- Move WOPI checks to the middleware @juliushaertl [#2673](https://github.com/nextcloud/richdocuments/pull/2673)
- Open PDF files by default when PDF viewer is disabled [#2598](https://github.com/nextcloud/richdocuments/pull/2598)
- Show warning if "WOPI allow-list" not configured [#2608](https://github.com/nextcloud/richdocuments/pull/2608)
- Add logging for remote requests [#2654](https://github.com/nextcloud/richdocuments/pull/2654)
- Fix the return type according to global definition [#2666](https://github.com/nextcloud/richdocuments/pull/2666)


## 6.3.1

### Added

- Add app config to override wopi checkFileInfo [#2568](https://github.com/nextcloud/richdocuments/pull/2568)

### Fixed

- Invoke read permission check to trigger terms of services when creating a token [#2563](https://github.com/nextcloud/richdocuments/pull/2563)
- option to use new grouped saveas [#2555](https://github.com/nextcloud/richdocuments/pull/2555)
- Do not fail if no directory is passed when creating a file from a template [#2545](https://github.com/nextcloud/richdocuments/pull/2545)
- Return proper status code if file is not found during writing [#2541](https://github.com/nextcloud/richdocuments/pull/2541)
- Listen for event during preview rendering and apply secure view options [#2587](https://github.com/nextcloud/richdocuments/pull/2587)
- Keep passing light theme values to Collabora as long as the dark mode is not available there [#2557](https://github.com/nextcloud/richdocuments/pull/2557)
- Fix the theming adjustments when accesibility app is disabled @Raudius [#2580](https://github.com/nextcloud/richdocuments/pull/2580)


## 6.3.0

### Added

- Add config option to turn on Collabora feature lock for read only users [#2510](https://github.com/nextcloud/richdocuments/pull/2510)

### Fixed

- Only apply hideDownload if share attribute is actually false [#2529](https://github.com/nextcloud/richdocuments/pull/2529)
- Disable sharing for public links and versions if app is disabled [#2508](https://github.com/nextcloud/richdocuments/pull/2508)
- Use proper product name in capabilities [#2532](https://github.com/nextcloud/richdocuments/pull/2532)

### Other

- Use correct server version for integration tests @juliushaertl [#2512](https://github.com/nextcloud/richdocuments/pull/2512)
- Fix `public_wopi_url` variable configuration name [#2505](https://github.com/nextcloud/richdocuments/pull/2505)
- Pin postgres version @Raudius [#2533](https://github.com/nextcloud/richdocuments/pull/2533)
- For PDFs rename context menu option to "Open with" @Raudius [#2536](https://github.com/nextcloud/richdocuments/pull/2536)

## 6.2.1

### Added

- Emit event for each user on document open [#2495](https://github.com/nextcloud/richdocuments/pull/2495)

### Fixed

- Updates "productName" in capabilities @Raudius [#2401](https://github.com/nextcloud/richdocuments/pull/2401)
- fix safari does not focus to document frame on startup [#2377](https://github.com/nextcloud/richdocuments/pull/2377)
- Fix: hide download option inside Collabora for "hide download" shares [#2391](https://github.com/nextcloud/richdocuments/pull/2391)
- Hide "Save as" option when downloading is not allowed by s… @Raudius [#2402](https://github.com/nextcloud/richdocuments/pull/2402)
- Only register templates if enabled for user [#2414](https://github.com/nextcloud/richdocuments/pull/2414)

### Other

- Fix loading file without logged-in when watermark is enable for groups [#2482](https://github.com/nextcloud/richdocuments/pull/2482)
- Migrate to nextcloud/OCP package in stable24 @nickvergessen [#2479](https://github.com/nextcloud/richdocuments/pull/2479)

## 6.2.0

### Added
- Allow download prevention on user shares @eneiluj [#2280](https://github.com/nextcloud/richdocuments/pull/2280)

### Fixed
- Limit capabilities to users that are enabled @juliushaertl [#2328](https://github.com/nextcloud/richdocuments/pull/2328)
- Fix saving issue when a file is available multiple times in a users home folder @juliushaertl [#2330](https://github.com/nextcloud/richdocuments/pull/2330)
- Cleanup Content Security Policy handling @juliushaertl [#2234](https://github.com/nextcloud/richdocuments/pull/2234)
- Fix double-header on public links @marcelklehr [#2312](https://github.com/nextcloud/richdocuments/pull/2312)
- Fix HTML entities showing in file names @Raudius [#2318](https://github.com/nextcloud/richdocuments/pull/2318)
- Restored "Open with Nextcloud Office" option from context menu @Raudius [#2318](https://github.com/nextcloud/richdocuments/pull/2318)

## 6.1.1

### Fixed

- Fix filename encoding issues @juliushaertl [#2261](https://github.com/nextcloud/richdocuments/pull/2261)

### Other

- add "is_guest" to extra info user data [#2244](https://github.com/nextcloud/richdocuments/pull/2244)

## 6.1.0

### Added
- Added support for file locking @juliushaertl [#2104](https://github.com/nextcloud/richdocuments/pull/2104)

### Fixed
- Optimised audit triggering @juliushaertl [#1957](https://github.com/nextcloud/richdocuments/pull/1957)
- Fixed viewer styling @juliushaertl [#2221](https://github.com/nextcloud/richdocuments/pull/2221) [#2212](https://github.com/nextcloud/richdocuments/pull/2212)
- Disabled remote image insertion on public links @juliushaertl [#2175](https://github.com/nextcloud/richdocuments/pull/2175)
- Fixed file revision behaviour on group folders @Raudius [#2172](https://github.com/nextcloud/richdocuments/pull/2197)


## 6.0.0

### Added

- Expose guest avatar images through wopi @juliushaertl [#1883](https://github.com/nextcloud/richdocuments/pull/1883)
- add "is_admin" to extra info user data @hcvcastro [#1810](https://github.com/nextcloud/richdocuments/pull/1810)
- Change wording from "New graphic" to "New diagram" @juliushaertl [#2031](https://github.com/nextcloud/richdocuments/pull/2031)
- Created a minimal otg file @Ezinnem [#2130](https://github.com/nextcloud/richdocuments/pull/2130)
- Adjust template preview ratio [#2154](https://github.com/nextcloud/richdocuments/pull/2154)
- Compatibility with Nextcloud 24

### Fixed

- Properly check proxy status @juliushaertl [#1900](https://github.com/nextcloud/richdocuments/pull/1900)
- Add addScript viewer dependency @juliushaertl [#1937](https://github.com/nextcloud/richdocuments/pull/1937)
- Do not load template directories twice @juliushaertl [#1794](https://github.com/nextcloud/richdocuments/pull/1794)
- Move filetype styles to separate css file and load it with viewer @juliushaertl [#1938](https://github.com/nextcloud/richdocuments/pull/1938)
- Ensure that the guest name picker is shown on editable links @juliushaertl [#1945](https://github.com/nextcloud/richdocuments/pull/1945)
- Don't wait DOMContentLoaded to register the viewer handler @eneiluj [#1959](https://github.com/nextcloud/richdocuments/pull/1959)
- Switch from iconv to mb_convert_encoding @Keessaus [#1967](https://github.com/nextcloud/richdocuments/pull/1967)
- Use FileCreatedFromTemplateEvent to inject the already existing empty templates @juliushaertl [#1377](https://github.com/nextcloud/richdocuments/pull/1377)
- Avoid too specific psalm annotation @juliushaertl [#2015](https://github.com/nextcloud/richdocuments/pull/2015)
- Fix frame absolute position in public file share @eneiluj [#2014](https://github.com/nextcloud/richdocuments/pull/2014)
- Always add gs.trustedHosts to the CSP @juliushaertl [#1977](https://github.com/nextcloud/richdocuments/pull/1977)
- Map es-419 to es-MX @juliushaertl [#2054](https://github.com/nextcloud/richdocuments/pull/2054)
- 🐛 Fix CSP violation when Nextcloud server has so-called 'service root' @ldidry [#2051](https://github.com/nextcloud/richdocuments/pull/2051)
- Do not hide speadsheet statusbar by default @juliushaertl [#2053](https://github.com/nextcloud/richdocuments/pull/2053)
- Adapt branding css variables @juliushaertl [#2069](https://github.com/nextcloud/richdocuments/pull/2069)
- Fix: missing settings messages @vinicius73 [#2095](https://github.com/nextcloud/richdocuments/pull/2095)
- Allow MS Office template file extensions for TemplateSource usage @juliushaertl [#2110](https://github.com/nextcloud/richdocuments/pull/2110)
- Fixes CSP on Nextcloud installations not on root directory @Raudius [#2126](https://github.com/nextcloud/richdocuments/pull/2126)
- Add app config to enable trusted domain list usage [#2163](https://github.com/nextcloud/richdocuments/pull/2163)
- Add gs.trustedHosts to form-action csp [#2160](https://github.com/nextcloud/richdocuments/pull/2160)
- Let integration tests pass again @juliushaertl [#2141](https://github.com/nextcloud/richdocuments/pull/2141)
- Keep mime-type indices consecutive. [#2174](https://github.com/nextcloud/richdocuments/pull/2174)
- Replace deprecated OC functions by @nextcloud/* npm pkgs ones @eneiluj [#2036](https://github.com/nextcloud/richdocuments/pull/2036)
- fix: template.odg file must be real odg file @merttumer [#2127](https://github.com/nextcloud/richdocuments/pull/2127)
- Update dependencies


## 4.2.3

### Fixed

- #1760 Unify error messages accross controllers
- #1728 Prevent not-needed early loading of the richdocuments app

### Other

- Dependency updates



## 4.2.2

### Added

- #1711 Allow guests to request a direct token for share links @juliushaertl

### Fixed

- #1707 Show avatar list if hide download is enabled @juliushaertl
- #1710 Another attempt to fix height setting for Safari issues on iOS @juliushaertl
- #1709 Give the avatar popover a proper z-index for public pages @juliushaertl

### Dependencies

- #1685 Bump @babel/core from 7.14.6 to 7.14.8 @dependabot[bot]
- #1700 Bump vue-loader from 15.9.7 to 15.9.8 @dependabot[bot]
- #1693 Bump sass from 1.36.0 to 1.37.0 @dependabot[bot]
- #1676 Bump @babel/preset-env from 7.14.7 to 7.14.8 @dependabot[bot]
- #1690 Bump eslint-plugin-vue from 7.14.0 to 7.15.0 @dependabot[bot]
- #1697 Bump @babel/preset-env from 7.14.8 to 7.14.9 @dependabot[bot]
- #1694 Bump eslint from 7.31.0 to 7.32.0 @dependabot[bot]
- #1695 Bump webpack from 5.46.0 to 5.47.1 @dependabot[bot]
- #1706 Bump @babel/plugin-transform-runtime from 7.14.5 to 7.15.0 @dependabot[bot]
- #1691 Bump @nextcloud/webpack-vue-config from 4.0.3 to 4.1.0 @dependabot[bot]
- #1702 Bump sass from 1.37.0 to 1.37.5 @dependabot[bot]
- #1705 Bump @babel/core from 7.14.8 to 7.15.0 @dependabot[bot]
- #1701 Bump eslint-plugin-vue from 7.15.0 to 7.15.1 @dependabot[bot]
- #1715 Bump psalm/phar from 4.8.1 to 4.9.2 @dependabot[bot]
- #1708 Bump webpack from 5.47.1 to 5.50.0 @dependabot[bot]
- #1703 Bump @babel/plugin-transform-modules-commonjs from 7.14.5 to 7.15.0 @dependabot[bot]
- #1712 Bump @babel/eslint-parser from 7.14.7 to 7.15.0 @dependabot[bot]
- #1714 Bump @babel/preset-env from 7.14.9 to 7.15.0 @dependabot[bot]
- #1713 Bump eslint-plugin-vue from 7.15.1 to 7.16.0 @dependabot[bot]
- #1716 Bump eslint-plugin-import from 2.23.4 to 2.24.0 @dependabot[bot]
- #1725 Bump psalm/phar from 4.9.2 to 4.9.3 @dependabot[bot]
- #1723 Bump sass from 1.37.5 to 1.38.0 @dependabot[bot]
- #1727 Bump webpack-cli from 4.7.2 to 4.8.0 @dependabot[bot]
- #1726 Bump eslint-plugin-import from 2.24.0 to 2.24.1 @dependabot[bot]
- #1724 Bump webpack from 5.50.0 to 5.51.1 @dependabot[bot]


## 4.2.1

* [#1655](https://github.com/nextcloud/richdocuments/pull/1655) Keep DownloadAsPostMessage when "saving as" documents @mikekaganski
* [#1663](https://github.com/nextcloud/richdocuments/pull/1663) Throttle on invalid share tokens @LukasReschke
* [#1664](https://github.com/nextcloud/richdocuments/pull/1664) Check for share token permissions @juliushaertl
* [#1674](https://github.com/nextcloud/richdocuments/pull/1674) L10n: Change to uppercase @Valdnet


## 4.2.0

* [#1638](https://github.com/nextcloud/richdocuments/pull/1638) Fix opening files when groupfolder ACL has revoked share permissions @juliushaertl
* [#1640](https://github.com/nextcloud/richdocuments/pull/1640) Allow to limit wopi requests to specific source hosts @juliushaertl
* [#1642](https://github.com/nextcloud/richdocuments/pull/1642) L10n: Correct a typo @Valdnet

## 4.1.2

* Nextcloud 22 compatibility

## 4.1.1

* [#1546](https://github.com/nextcloud/richdocuments/pull/1546) Fix wrong parameters set when creating a file from a template id @juliushaertl
* [#1559](https://github.com/nextcloud/richdocuments/pull/1559) Fix PutRelativeFile as non-owner @juliushaertl
* [#1544](https://github.com/nextcloud/richdocuments/pull/1544) Retry to check if Collabora is configured @eszkadev


## 4.1.0

* [#1512](https://github.com/nextcloud/richdocuments/pull/1512) Enhanced federated editing
* [#1446](https://github.com/nextcloud/richdocuments/pull/1446) Setup FeaturePolicy to allow fullscreen @eszkadev
* [#1459](https://github.com/nextcloud/richdocuments/pull/1459) Reload file name for share feature after Save As @eszkadev
* [#1465](https://github.com/nextcloud/richdocuments/pull/1465) Fix OOXML template extension @tiredofit
* [#1471](https://github.com/nextcloud/richdocuments/pull/1471) Fix duplicate document templates
* [#1485](https://github.com/nextcloud/richdocuments/pull/1485) L10n: Unify spelling @Valdnet
* [#1488](https://github.com/nextcloud/richdocuments/pull/1488) Improve parsing of guest name cookie
* [#1501](https://github.com/nextcloud/richdocuments/pull/1501) Add federation/direct editing tests
* [#1502](https://github.com/nextcloud/richdocuments/pull/1502) Do not use libxml_disable_entity_loader on PHP 8 or later
* [#1513](https://github.com/nextcloud/richdocuments/pull/1513) Don't cache empty capabilities @eszkadev
* [#1514](https://github.com/nextcloud/richdocuments/pull/1514) Work around safari having a inproper 100vh value
* [#1517](https://github.com/nextcloud/richdocuments/pull/1517) Use proper initiator url
* [#1528](https://github.com/nextcloud/richdocuments/pull/1528) Emit WOPI postmessages through the nextcloud event bus

## 4.0.4

* [#1443](https://github.com/nextcloud/richdocuments/pull/1443) Use correct config for GS info

## 4.0.3

* [#1416](https://github.com/nextcloud/richdocuments/pull/1416) Pass through UI_Share message if used in the version viewer
* [#1418](https://github.com/nextcloud/richdocuments/pull/1418) Allow revision viewer to enter full screen
* [#1422](https://github.com/nextcloud/richdocuments/pull/1422) Properly handle ooxml with the new template mechanism


## 4.0.2

* [#1374](https://github.com/nextcloud/richdocuments/pull/1374) Make sure that the same host remote is always considered as trusted
* [#1394](https://github.com/nextcloud/richdocuments/pull/1394) Improve dark theme experience @mwalbeck
* [#1396](https://github.com/nextcloud/richdocuments/pull/1396) Avoid determination of document editor in per-user-encryption setups @marioklump
* [#1397](https://github.com/nextcloud/richdocuments/pull/1397) Emit events on frontend states
* [#1401](https://github.com/nextcloud/richdocuments/pull/1401) Assets: Use octet-stream and attachment instead of allowing to inline display
* [#1412](https://github.com/nextcloud/richdocuments/pull/1412) Trim duplicate trailing slashes in wopi url
* [#1414](https://github.com/nextcloud/richdocuments/pull/1414) Add docs and sharingToken to the events

## 4.0.1

* [#1385](https://github.com/nextcloud/richdocuments/pull/1385) Fix opening files after creating them from a template
* [#1378](https://github.com/nextcloud/richdocuments/pull/1378) Use https for fetching the demo servers
* [#1382](https://github.com/nextcloud/richdocuments/pull/1382) Add proper return values to occ commands

## 4.0.0

* [#1317](https://github.com/nextcloud/richdocuments/pull/1317) Nextcloud 21 compatibility @juliushaertl
* [#1353](https://github.com/nextcloud/richdocuments/pull/1353) Apply new file name after rename @eszkadev

## 3.7.14

* [#1331](https://github.com/nextcloud/richdocuments/pull/1331) Log the exception so we know what is actually failing @rullzer
* [#1332](https://github.com/nextcloud/richdocuments/pull/1332) Use https by default for the federation service @rullzer
* [#1337](https://github.com/nextcloud/richdocuments/pull/1337) Properly handle cached failed requests in the Federation service @rullzer
* Update dependencies

## 3.7.13

* [#1326](https://github.com/nextcloud/richdocuments/pull/1326) Do not update CSP on calls to files_sharing @rullzer
* [#1327](https://github.com/nextcloud/richdocuments/pull/1327) Handle errors when fetching remote file info more gracefully @juliushaertl
* [#1329](https://github.com/nextcloud/richdocuments/pull/1329) Move federation cache to a distributed one @juliushaertl

## 3.7.12

* [#1178](https://github.com/nextcloud/richdocuments/pull/1178) Show error if trying to open a file on session credential based external storage @juliushaertl
* [#1279](https://github.com/nextcloud/richdocuments/pull/1279) Actually mark wopi entity fields as updated @juliushaertl
* [#1284](https://github.com/nextcloud/richdocuments/pull/1284) Rename document on save as success @eszkadev
* [#1303](https://github.com/nextcloud/richdocuments/pull/1303) Cut of guest names so they fit into the database @nickvergessen
* [#1305](https://github.com/nextcloud/richdocuments/pull/1305) Properly trim trailing slashes from the remote url @juliushaertl
* [#941](https://github.com/nextcloud/richdocuments/pull/941) Be fair about compatiblity of this module @mmaridev
* Update dependencies

## 3.7.11

* [#1256](https://github.com/nextcloud/richdocuments/pull/1256) Adapt built-in CODE url on host address change @mrkara
* [#1269](https://github.com/nextcloud/richdocuments/pull/1269) Increase timeout if proxy is starting @eszkadev
* [#1277](https://github.com/nextcloud/richdocuments/pull/1277) Check proxy status on timeout @eszkadev
* [#1278](https://github.com/nextcloud/richdocuments/pull/1278) Fix possible issues with remote editing
* [#989](https://github.com/nextcloud/richdocuments/pull/989) Show hint about missing capabilities endpoint connection

## 3.7.10

* [#1257](https://github.com/nextcloud/richdocuments/pull/1257) Try to obtain the appdata folder in 1 go @rullzer
* [#1258](https://github.com/nextcloud/richdocuments/pull/1258) Fix compatibility issue with Nextcloud 15 @juliushaertl
* [#1259](https://github.com/nextcloud/richdocuments/pull/1259) Don't use a stream response on an empty file @rullzer
* [#1266](https://github.com/nextcloud/richdocuments/pull/1266) Fix issues with federated editing in global scale setups @juliushaertl
* [#1268](https://github.com/nextcloud/richdocuments/pull/1268) Fix typo when refetching discovery @eszkadev

## 3.7.9

## Fixed

* [#1238](https://github.com/nextcloud/richdocuments/pull/1238) Move to @nextcloud/capabilities and only register default mime types for viewer
* [#1239](https://github.com/nextcloud/richdocuments/pull/1239) Fix compatibility to oracle as a database
* [#1240](https://github.com/nextcloud/richdocuments/pull/1240) Add two more useful placeholders for watermark text @timar
* [#1242](https://github.com/nextcloud/richdocuments/pull/1242) Add French (Switzerland) and Italian (Switzerland) as special case @timar
* [#1243](https://github.com/nextcloud/richdocuments/pull/1243) Add migration to bigint columns
* [#1244](https://github.com/nextcloud/richdocuments/pull/1244) Do not fail if capabilities have not been fetched for the built-in server


## 3.7.8

### Added

* [#1237](https://github.com/nextcloud/richdocuments/pull/1237) Make frame loading timeout configurable through occ

## 3.7.7

### Added

* [#1220](https://github.com/nextcloud/richdocuments/pull/1220) Support opening visio files @timar
* [#1221](https://github.com/nextcloud/richdocuments/pull/1221) Add close method for mobile app integration @juliushaertl

### Fixed

* [#1222](https://github.com/nextcloud/richdocuments/pull/1222) Adjust ui_defaults do be the same across different document types @juliushaertl
* [#1226](https://github.com/nextcloud/richdocuments/pull/1226) Move Collabora endpoint caching to distributed cache @juliushaertl

## 3.7.6

### Added
* [#1211](https://github.com/nextcloud/richdocuments/pull/1211) Passing some UI Defaults to loleaflet frame @merttumer

### Fixed
* [#1198](https://github.com/nextcloud/richdocuments/pull/1198) Use correct call to notify mobile @eszkadev
* [#1210](https://github.com/nextcloud/richdocuments/pull/1210) Fix escaping for edit with message @gary-kim


## 3.7.5

### Added
* [#1137](https://github.com/nextcloud/richdocuments/pull/1137) Add occ richdocuments:activate-config to autoprovision Collabora configurations @ebardie
* [#974](https://github.com/nextcloud/richdocuments/pull/974) Add frontend hooks and expose config/open methods @juliushaertl

### Bugfixes

* [#1055](https://github.com/nextcloud/richdocuments/pull/1055) Fix bug #1054 @SamKer
* [#1095](https://github.com/nextcloud/richdocuments/pull/1095) Make 'Remove user' label localizable @timar
* [#1111](https://github.com/nextcloud/richdocuments/pull/1111) Updated presentation template. @kendy
* [#1133](https://github.com/nextcloud/richdocuments/pull/1133) Use proper base template to be compatible with Nextcloud 20 @juliushaertl
* [#1150](https://github.com/nextcloud/richdocuments/pull/1150) Arm64: Allow auto-enabling Built-in CODE Server on ARM64 @mrkara
* [#1152](https://github.com/nextcloud/richdocuments/pull/1152) Properly check value types when updating watermark settings @juliushaertl
* [#1153](https://github.com/nextcloud/richdocuments/pull/1153) Very minimal document templates for Collabora Online @timar
* [#1154](https://github.com/nextcloud/richdocuments/pull/1154) Use PHP_OS instead of PHP_OS_FAMILY when PHP version < 7.2 @mrkara
* [#1162](https://github.com/nextcloud/richdocuments/pull/1162) Arm64 adaptations @mrkara
* [#1163](https://github.com/nextcloud/richdocuments/pull/1163) Fix platform mismatch error message @mrkara
* [#1164](https://github.com/nextcloud/richdocuments/pull/1164) Do not use isset for checking the class constant @juliushaertl
* [#1169](https://github.com/nextcloud/richdocuments/pull/1169) Template sourced documents support DownloadAsPostMessage @Ashod
* [#1170](https://github.com/nextcloud/richdocuments/pull/1170) No need to get the avatar image since we have one for each user @juliushaertl
* [#1174](https://github.com/nextcloud/richdocuments/pull/1174) Update location of screenshots @timar
* [#1180](https://github.com/nextcloud/richdocuments/pull/1180) Ensures <iframe> contains a non-empty title attribute @pedropintosilva
* [#1192](https://github.com/nextcloud/richdocuments/pull/1192) Lint fix @R0Wi
* [#1194](https://github.com/nextcloud/richdocuments/pull/1194) Use base template for direct editing @juliushaertl
* [#1195](https://github.com/nextcloud/richdocuments/pull/1195) The mobile apps need to handle the hyperlinks themselves. @kendy

## 3.7.4

* Nextcloud 20 compatibility
* [#1055](https://github.com/nextcloud/richdocuments/pull/1055) Fix migrations for missing table columns @SamKer
* [#1077](https://github.com/nextcloud/richdocuments/pull/1077) Hide sharing menu if no share permission is set @juliushaertl
* [#1078](https://github.com/nextcloud/richdocuments/pull/1078) Hide revision history menu on public pages @juliushaertl
* [#1095](https://github.com/nextcloud/richdocuments/pull/1095) Make 'Remove user' label localizable @timar
* [#1111](https://github.com/nextcloud/richdocuments/pull/1111) Updated presentation template. @kendy


## 3.7.3

### Fixed
* [#1023](https://github.com/nextcloud/richdocuments/pull/1023) Fix saving 'disable certificate verification' @CySlider
* [#1059](https://github.com/nextcloud/richdocuments/pull/1059) Fix issue with custom trusted certificates not being applied
* [#1061](https://github.com/nextcloud/richdocuments/pull/1061) Fix not found error when opening share links with edit permission
 

## 3.7.2

### Fixed

* [#1052](https://github.com/nextcloud/richdocuments/pull/1052) Fix regression caused documents to not load

## 3.7.1


### Fixed

* [#1010](https://github.com/nextcloud/richdocuments/pull/1010) Advise installation via 'occ' if it fails from the web interface. @kendy
* [#1015](https://github.com/nextcloud/richdocuments/pull/1015) String update for built-in CODE option @mrkara
* [#1017](https://github.com/nextcloud/richdocuments/pull/1017) Handling of a new error state from proxy.php?status. @kendy
* [#1020](https://github.com/nextcloud/richdocuments/pull/1020) Check for read permission on the file actions @juliushaertl
* [#1022](https://github.com/nextcloud/richdocuments/pull/1022) Update install.md @juliushaertl
* [#1024](https://github.com/nextcloud/richdocuments/pull/1024) Update screenshots @timar
* [#1026](https://github.com/nextcloud/richdocuments/pull/1026) New error state to handle - running on non-glibc based Linux. @kendy
* [#885](https://github.com/nextcloud/richdocuments/pull/885) Move to @nextcloud packages @juliushaertl
* [#1038](https://github.com/nextcloud/richdocuments/pull/1038) Fix issues with Nextcloud 15/16 @juliushaertl


## 3.7.0

### Added
- Add support for built-in CODE server
- Inform user about web server configuration issues
- Document templates: use only one sans-serif font family
- Viewer integration

### Fixed
- Fix CSP violation when collabora server has so-called 'service root'
- Allow connecting to local addresses
- Avoid duplicate save requests
- Avoid additional HTTP request on the files app
- Reduce requests for loaded CSS files
- Fix certificate validation handling
- Be more robust on paths that don't start with a slash
- Bring back IE11 support

## 3.6.0

### Added
- Add demo server selector and show hint about that when Collabora is not setup

### Fixed
- Fix filesystem setup that caused save issues all over the place
- Do not try to recreate a file from a template more than once
- Do not open PDF files by default
- Dependency bumps

## 3.5.1

### Fixed
- Fix issue when shared files were not creating activity/version entries
- Fix bug on public share links
- Dependency bumps

## 3.5.0

### Added

- Implement support for TemplateSource file creation method
- Add occ command to update template files

### Fixed

- Fix inserting images with groupfolders that have ACL configured
- Fix setting cache values when editing federated (@xklonx)
- Dependency bumps

## 3.4.6

### Added
- Force read operation to trigger audit log when issuing a token
- Nextcloud 18 compatibility

## 3.4.5

### Fixed
- Retry putContent operation if locked
- Include locale in the loleaflet lang parameter
- Make sure files created from the same template have a different WOPI file id
- Always use the owner file owner to access for share links
- Make sure Firefox doesn't navigate out of the current directory
- Dependency bumps


## 3.4.4

### Fixed
- Fix issue when creating files from templates
- Make sure files are properly opened after creation


## 3.4.3

### Fixed
- Update translations
- Bump dependencies
- Always open CSV files with collabora (#671)
- Do not use template shipped by core (#670)
- Fix undefined index warning (#652)
- Check key before accessing (#645)
- Move file list access to files app integration (#651)
- Lower log level if the token does not exist (#653)

## 3.4.2

### Fixed
- Remove unneeded logging
- Restore IE11 compatibility
- Fix group selector in settings
- Use Collabora for secure view of images
- Update dependencies

## 3.4.1

### Fixed

- Fix compatibility with PHP 7.0
- Fix bug when federation app was disabled

## 3.4.0

### Added

- Federated document editing
- Watermarking

### Fixed

- General frontend refactoring to fix flaws in files app integration and performance issues
- Check for type when uploading a template
- Use proper public url instead of regular wopi endpoint to fix issues in locked down environments
- Open file directly if only one template is available

## 3.3.15

### Fixed
- Check for file in editor folder only when available
- Add check to only open one document at a time

## 3.3.14

### Fixed
- Pass paste postmessage from collabora to mobile apps
- Fix preview generation on Nextcloud 17 

## 3.3.13

### Fixed
- Improve loading time when opening documents
- Fix admin settings not saving properly

## 3.3.12

### Fixed
- Fix regression from 3.3.11 without URL rewriting

## 3.3.11

### Fixed
- Fix different wopisrc for the same file with loadbalanced collabora instances

## 3.3.10

### Fixed
- Hide full screen button in mobile apps
- Implement message for supporting download as / print in mobile apps

## 3.3.9

### Fixed
- Pass file renaming message to mobile apps
- Only allow view removal for file owners
- Allow clients to trigger Grab_Focus

## 3.3.8

### Fixed
- Fix UI rescaling in webkit
- Fix scrolling behavior on webkit
- Implement support for file renaming
- Allow to use MS Office template formats

## 3.3.7

### Fixed
- Implement new Views_List message
- Allow accessing the Save As web UI on mobile
- Allow UTF8 characters in filenames when creating documents from mobile

## 3.3.6

### Fixed
- Ship new empty presentation template
- Add migration step to replace empty templates after upgrade 

## 3.3.5

### Fixed
- Only allow closing other views with write permissions

## 3.3.4

### Fixed
- Don't generate preview for empty files
- Copy file to temp file for encrypted / object storage
- Remove ghost avatars #462
- Use "Guestname (Guest)" so that names are more distinguishable
- Use actual user id if a logged in user browses a public share link
- Improved logging
- Replace deprecated javascript calls

## 3.3.3

### Fixed
- Avoid scrolling if iframe is visible
- Return proper product name if it is provided
- Fix searching in groups with other user backends

## 3.3.2

### Fixed
- Use valid HTTP status codes
- Fix undefined variable when creating tokens

## 3.3.1

### Fixed
- Bug fix for syntax error on PHP 7.0

## 3.3.0

### Added

- Use product name from collabora capabilities
- Add hide download support for share links
- Use collabora to generate PDF previews
- Better mimetype handling for mobile editing

### Fixed

- Set timeout for editor inactivity
- Set proper extension when creating ooxml files from templates
- Do not open SVG files with collabora by default
- Hide collabora user list on desktop browsers

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
