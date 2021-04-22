Feature: WOPI

  Background:
    Given user "user1" exists
    Given user "user2" exists

  Scenario: Create a new wopi token for a user and open it
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
    Then User "user1" opens "/file.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" is "user1"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is true

  Scenario: Fetch checkFileInfo for public share link
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path | /file.odt |
      | shareType | 3 |
    Then Using web as guest
    And a guest opens the share link
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is false
    And Collabora saved the file with the content of "./../assets/template.ods"
    And the WOPI HTTP status code should be "403"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"


    Scenario: Fetch checkFileInfo for public share link with write permission
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path | /file.odt |
      | shareType | 3 |
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
    Then the file is equal to "./../assets/template.odt"
    And Collabora saved the file with the content of "./../assets/template.odt"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"

  Scenario: Save a file as the owner
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
    Then User "user1" opens "/file.odt"
    And Collabora fetches checkFileInfo
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora saved the file with the content of "./../assets/template.odt"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"


  Scenario: Save a file as guest with write permissions
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
    And as "user1" create a share with
      | path | /file.odt |
      | shareType | 3 |
    And Updating last share with
      | permissions | 3 |
    And the HTTP status code should be "200"
    Then Using web as guest
    And a guest opens the share link as "Anonymous"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "OwnerId" is "user1"
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"
    And Collabora saved the file with the content of "./../assets/template.ods"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.ods"

  Scenario: Create different WOPI file ids
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file1.odt"
    And User "user1" uploads file "./../assets/template.odt" to "/file2.odt"
    Then User "user1" opens "/file1.odt"
    And Collabora fetches checkFileInfo
    Then User "user1" opens "/file2.odt"
    And Collabora fetches checkFileInfo
    Then both Collabora files used a different file id
