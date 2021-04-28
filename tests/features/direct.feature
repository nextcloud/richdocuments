Feature: Direct editing

  Background:
    Given user "user1" exists
    And user "user2" exists

  Scenario: Open a file through direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document.odt"
    When User "user1" opens "/document.odt" through direct editing
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document.odt"
    And the direct editing link is only valid once

  Scenario: Open a shared file through direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document-shared.odt"
    When User "user1" opens "/document-shared.odt" through direct editing
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document-shared.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora can save the file with the content of "./../assets/template.ods"
    And as "user1" create a share with
      | path | /document-shared.odt |
      | shareType | 0 |
      | shareWith | user2 |
      | permissions | 1 |

    And as user "user2"
    Then User "user2" opens "/document-shared.odt" through direct editing
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "document-shared.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"
