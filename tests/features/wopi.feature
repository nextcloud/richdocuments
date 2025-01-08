Feature: WOPI

  Background:
    Given user "user1" exists
    Given user "user2" exists

  Scenario: Create a new wopi token for a user and open it
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    Then User "user1" opens "/file.odt"
    And Collabora fetches checkFileInfo
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file.odt          |
      | OwnerId          | user1             |
      | UserId           | user1             |
      | UserFriendlyName | user1-displayname |
    And checkFileInfo "UserCanWrite" is true

  Scenario: Fetch checkFileInfo for public share link
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path      | /file.odt |
      | shareType | 3         |
    Then Using web as guest
    And a guest opens the share link
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is false
    And Collabora saved the file with the content of "./../emptyTemplates/template.ods"
    And the WOPI HTTP status code should be "403"
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"

  Scenario: Open a file in a folder shared by link
    Given as user "user1"
    And User "user1" creates a folder "NewFolder"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
    And as "user1" create a share with
      | path      | /NewFolder |
      | shareType | 3          |
    Then User "user1" opens "/NewFolder/file.odt"
    And Collabora fetches checkFileInfo
    Then Using web as guest
    And a guest opens the file "file.odt" of the shared link
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName | file.odt |
      | UserCanWrite |          |
      | OwnerId      | user1    |
    And checkFileInfo "UserId" matches "/Guest-/"
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And Collabora can not save the file with the content of "./../emptyTemplates/template.ods"
    Then both Collabora files used the same file id

  Scenario: Open a file in a folder shared by link with a guest name
    Given as user "user1"
    And User "user1" creates a folder "NewFolder"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
    And as "user1" create a share with
      | path      | /NewFolder |
      | shareType | 3          |
    Then User "user1" opens "/NewFolder/file.odt"
    And Collabora fetches checkFileInfo
    Then Using web as guest
    And a guest opens the file "file.odt" of the shared link as "Anonymous"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file.odt          |
      | UserCanWrite     |                   |
      | OwnerId          | user1             |
      | UserFriendlyName | Anonymous (Guest) |
    And checkFileInfo "UserId" matches "/Guest-/"
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And Collabora can not save the file with the content of "./../emptyTemplates/template.ods"
    Then both Collabora files used the same file id

  Scenario: Open a file in a folder shared by link as the owner
    Given as user "user1"
    And User "user1" creates a folder "NewFolder"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
    And as "user1" create a share with
      | path      | /NewFolder |
      | shareType | 3          |
    Then User "user1" opens "/NewFolder/file.odt"
    And Collabora fetches checkFileInfo
    And User "user1" opens the file "file.odt" of the shared link
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName | file.odt |
      | UserCanWrite |          |
      | OwnerId      | user1    |
      | UserId       | user1    |
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And Collabora can not save the file with the content of "./../emptyTemplates/template.ods"
    Then both Collabora files used the same file id

  Scenario: Fetch checkFileInfo for public share link as the owner
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path        | /file.odt |
      | shareType   | 3         |
    And the user opens the share link
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName | file.odt |
      | UserCanWrite |          |
      | OwnerId      | user1    |
      | UserId       | user1    |
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And Collabora can not save the file with the content of "./../emptyTemplates/template.ods"

  Scenario: Fetch checkFileInfo for public share link with download hidden
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path      | /file.odt |
      | shareType | 3         |
    Then Using web as guest
    And a guest opens the share link
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file.odt |
      | UserCanWrite     |          |
      | OwnerId          | user1    |
      | DisablePrint     |          |
      | DisableExport    |          |
      | DisableCopy      |          |
      | HidePrintOption  |          |
      | HideExportOption |          |
    And Updating last share with
      | hideDownload | true |
    Then Using web as guest
    And a guest opens the share link
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file.odt |
      | UserCanWrite     |          |
      | OwnerId          | user1    |
      | DisablePrint     | 1        |
      | DisableExport    | 1        |
      | DisableCopy      | 1        |
      | HidePrintOption  | 1        |
      | HideExportOption | 1        |

  Scenario: Fetch checkFileInfo for public share link with write permission
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path      | /file.odt |
      | shareType | 3         |
    And Updating last share with
      | permissions | 3 |
    Then Using web as guest
    And a guest opens the share link as "Anonymous"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"
    And Collabora saved the file with the content of "./../emptyTemplates/template.odt"
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"

  Scenario: Save a file as the owner
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    Then User "user1" opens "/file.odt"
    And Collabora fetches checkFileInfo
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora saved the file with the content of "./../emptyTemplates/template.odt"
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"


  Scenario: Save a file as guest with write permissions
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path      | /file.odt |
      | shareType | 3         |
    And Updating last share with
      | permissions | 3 |
    And the HTTP status code should be "200"
    Then Using web as guest
    And a guest opens the share link as "My name"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserFriendlyName" is "My name (Guest)"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"
    And Collabora saved the file with the content of "./../emptyTemplates/template.ods"
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.ods"

  Scenario: Save a file as guest without name with write permissions
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path      | /file.odt |
      | shareType | 3         |
    And Updating last share with
      | permissions | 3 |
    And the HTTP status code should be "200"
    Then Using web as guest
    And a guest opens the share link without guest name
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserFriendlyName" is "Anonymous guest"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"
    And Collabora saved the file with the content of "./../emptyTemplates/template.ods"
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.ods"

  Scenario: Create different WOPI file ids
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file1.odt"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file2.odt"
    Then User "user1" opens "/file1.odt"
    And Collabora fetches checkFileInfo
    Then User "user1" opens "/file2.odt"
    And Collabora fetches checkFileInfo
    Then both Collabora files used a different file id

  Scenario: Open a shared file
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file-readonly.odt"
    And as "user1" create a share with
      | path        | /file-readonly.odt |
      | shareType   | 0                  |
      | shareWith   | user2              |
      | permissions | 1                  |
    Then User "user2" opens "/file-readonly.odt"
    And Collabora fetches checkFileInfo
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And checkFileInfo "UserCanWrite" is false
    And Collabora can not save the file with the content of "./../emptyTemplates/template.ods"


  Scenario: Open a shared file with write permissions
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file-rw.odt"
    And as "user1" create a share with
      | path        | /file-rw.odt |
      | shareType   | 0            |
      | shareWith   | user2        |
      | permissions | 31           |
    Then User "user2" opens "/file-rw.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"
    And Collabora can save the file with the content of "./../emptyTemplates/template.ods"

  Scenario: Open a reshared file with read permissions
    Given user "user3" exists
    When as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file-reshare-ro.odt"
    And as "user1" create a share with
      | path        | /file-reshare-ro.odt |
      | shareType   | 0                    |
      | shareWith   | user2                |
      | permissions | 31                   |
    And as user "user2"
    And as "user2" create a share with
      | path        | /file-reshare-ro.odt |
      | shareType   | 0                    |
      | shareWith   | user3                |
      | permissions | 1                    |
    Then User "user3" opens "/file-reshare-ro.odt"
    And Collabora fetches checkFileInfo
    And Collabora downloads the file
    Then the file is equal to "./../emptyTemplates/template.odt"
    And checkFileInfo "UserCanWrite" is false
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.odt"


  Scenario: Create a new wopi token from a template for a user and open it
    Given as user "user1"
    And user "user1" fetches the document template list
    And user "user1" creates a new file "/file.odt" from a template
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file.odt          |
      | OwnerId          | user1             |
      | UserId           | user1             |
      | UserFriendlyName | user1-displayname |
    And checkFileInfo "UserCanWrite" is true
    And TemplateSource is set


  Scenario: Save as
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file-origin.odt"
    Then User "user1" opens "/file-origin.odt"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file-origin.odt          |
      | OwnerId          | user1             |
      | UserId           | user1             |
      | UserFriendlyName | user1-displayname |
    And checkFileInfo "UserCanWrite" is true
    And Collabora saves the content of "./../emptyTemplates/template.ods" as "saveas.odt"
    And the WOPI HTTP status code should be "200"

    Then User "user1" opens "/saveas.odt"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | saveas.odt         |
      | OwnerId          | user1             |
      | UserId           | user1             |
      | UserFriendlyName | user1-displayname |
    And Collabora downloads the file
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.ods"

  Scenario: Save as different user
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file-origin.odt"
    And as "user1" create a share with
      | path        | /file-origin.odt |
      | shareType   | 0                |
      | shareWith   | user2            |
      | permissions | 31               |
    Then User "user2" opens "/file-origin.odt"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | file-origin.odt    |
      | OwnerId          | user1             |
      | UserId           | user2             |
      | UserFriendlyName | user2-displayname |
    And Collabora saves the content of "./../emptyTemplates/template.ods" as "/saveas.odt"
    And the WOPI HTTP status code should be "200"

    Then User "user2" opens "/saveas.odt"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | saveas.odt         |
      | OwnerId          | user2             |
      | UserId           | user2             |
      | UserFriendlyName | user2-displayname |
    And Collabora downloads the file
    And Collabora downloads the file and it is equal to "./../emptyTemplates/template.ods"

  Scenario: Save as guest user to owner root
    Given as user "user1"
    And User "user1" creates a folder "SharedFolder"
    And as "user1" create a share with
      | path        | /SharedFolder |
      | shareType   | 3             |
    And Updating last share with
      | permissions | 31 |
    And Create new document as guest with file name "some-guest-document.odt"
    And as "user1" the file "/SharedFolder/some-guest-document.odt" exists
    And a guest opens the file "some-guest-document.odt" of the shared link
    And Collabora fetches checkFileInfo
    And Collabora saves the content of "./../emptyTemplates/template.ods" as "/saved-as-guest-document.odt"
    And as "user1" the file "/SharedFolder/saved-as-guest-document.odt" exists
    And as "user1" the file "/saved-as-guest-document.odt" does not exist

  Scenario: Rename file on share link
    Given as user "user1"

    And User "user1" creates a folder "/SharedFolder"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/SharedFolder/file.odt"
    And as "user1" create a share with
      | path        | /SharedFolder |
      | shareType   | 3             |
    And Updating last share with
      | permissions | 31 |
    And User "user1" opens the file "file.odt" of the shared link
    And Collabora fetches checkFileInfo

    And as "user1" rename "/SharedFolder/file.odt" to "renamed_file"
    And as "user1" the file "/SharedFolder/renamed_file.odt" exists
    And as "user1" the file "/SharedFolder/file.odt" does not exist
    And as "user1" the file "/renamed_file.odt" does not exist