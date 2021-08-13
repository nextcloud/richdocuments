Feature: Direct editing

  Background:
    Given user "user1" exists
    And user "user2" exists
    And user "user3" exists

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
      | path        | /document-shared.odt |
      | shareType   | 0                    |
      | shareWith   | user2                |
      | permissions | 1                    |

    And as user "user2"
    Then User "user2" opens "/document-shared.odt" through direct editing
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "document-shared.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Open a reshared file through direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document-shared-reshare.odt"
    When User "user1" opens "/document-shared-reshare.odt" through direct editing
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document-shared-reshare.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora can save the file with the content of "./../assets/template.ods"
    And as "user1" create a share with
      | path        | /document-shared-reshare.odt |
      | shareType   | 0                            |
      | shareWith   | user2                        |
      | permissions | 31                           |

    And as "user2" create a share with
      | path        | /document-shared-reshare.odt |
      | shareType   | 0                            |
      | shareWith   | user3                        |
      | permissions | 1                            |

    And as user "user3"
    Then User "user3" opens "/document-shared-reshare.odt" through direct editing
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "document-shared-reshare.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  @federation
  Scenario: Open a federated shared file through direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document-shared-federated.odt"
    When User "user1" opens "/document-shared-federated.odt" through direct editing
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document-shared-federated.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora can save the file with the content of "./../assets/template.ods"
    And share the file "/document-shared-federated.odt" with permission 1 as a federated share to "user2" on "serverB"
    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/document-shared-federated.odt" through direct editing
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "document-shared-federated.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  @federation
  Scenario: Open a file in a federated shared folder through direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "FederatedShareFolder"
    And User "user1" uploads file "./../assets/template.odt" to "/FederatedShareFolder/document-shared-federated.odt"
    When User "user1" opens "/FederatedShareFolder/document-shared-federated.odt" through direct editing
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document-shared-federated.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora can save the file with the content of "./../assets/template.ods"
    And share the file "/FederatedShareFolder" with permission 1 as a federated share to "user2" on "serverB"
    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/FederatedShareFolder/document-shared-federated.odt" through direct editing
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "document-shared-federated.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Open a share link with direct editing
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document-share-link.odt"
    When User "user1" opens "/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path      | /document-share-link.odt |
      | shareType | 3                        |
    And Updating last share with
      | permissions | 3       |
    And as user "user2"
    When User "user2" opens the last share link through direct editing
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserId           | user2                     |
      | UserFriendlyName | user2-displayname         |
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"
    And the direct editing link is only valid once

  Scenario: Open a file in a shared folder of a share link with direct editing as read only
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "Folder"
    And User "user1" uploads file "./../assets/template.odt" to "/Folder/document-share-link.odt"
    When User "user1" opens "/Folder/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path      | /Folder/ |
      | shareType | 3        |
    And as user "user2"
    When User "user2" opens the file "/document-share-link.odt" in the last share link through direct editing
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserId           | user2                     |
      | UserFriendlyName | user2-displayname         |
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.odt"

  Scenario: Open a file in a shared folder of a share link with direct editing as writable
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "Folder"
    And User "user1" uploads file "./../assets/template.odt" to "/Folder/document-share-link.odt"
    When User "user1" opens "/Folder/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path        | /Folder/ |
      | shareType   | 3        |
    And Updating last share with
      | permissions | 3       |
    And as user "user2"
    When User "user2" opens the file "/document-share-link.odt" in the last share link through direct editing
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserId           | user2                     |
      | UserFriendlyName | user2-displayname         |
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Open a file in a shared folder of a share link with direct editing as writable as a guest
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "Folder"
    And User "user1" uploads file "./../assets/template.odt" to "/Folder/document-share-link.odt"
    When User "user1" opens "/Folder/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path        | /Folder/ |
      | shareType   | 3        |
    And Updating last share with
      | permissions | 3       |
    When A guest opens the file "/document-share-link.odt" in the last share link through direct editing
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserFriendlyName | Anonymous guest           |
    When the guest updates the display name to "Random name"
    And Collabora fetches checkFileInfo
    And checkFileInfo "UserFriendlyName" is "Random name (Guest)"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Open a file in a shared folder of a share link with direct editing as writable as a remote user
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "Folder"
    And User "user1" uploads file "./../assets/template.odt" to "/Folder/document-share-link.odt"
    When User "user1" opens "/Folder/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path        | /Folder/ |
      | shareType   | 3        |
    And Updating last share with
      | permissions | 3       |
    Given on instance "serverB"
    And as user "user2"
    When User "user2" opens the file "/document-share-link.odt" in the last share link through direct editing from server "serverA"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserFriendlyName | user2-displayname (Guest) |
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Open a file in a shared folder of a share link with direct editing as writable as a remote user with password
    Given on instance "serverA"
    And as user "user1"
    And User "user1" creates a folder "Folder"
    And User "user1" uploads file "./../assets/template.odt" to "/Folder/document-share-link.odt"
    When User "user1" opens "/Folder/document-share-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And as "user1" create a share with
      | path        | /Folder/ |
      | shareType   | 3        |
      | password    | mysecret |
    And Updating last share with
      | permissions | 3       |
    Given on instance "serverB"
    And as user "user2"
    When User "user2" opens the file "/document-share-link.odt" in the last share link through direct editing from server "serverA" with password "mysecret"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-share-link.odt   |
      | OwnerId          | user1                     |
      | UserFriendlyName | user2-displayname (Guest) |
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

    And as user "user2"
    When User "user2" cannot open the file "/document-share-link.odt" in the last share link through direct editing from server "serverA" with password "wrongpassword"

  @federation @known-failure-ci
  Scenario: Open a link that originates on a federated share through direct editing
    Given user "user3" exists
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document-reshare-fed-link.odt"
    When User "user1" opens "/document-reshare-fed-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And share the file "/document-reshare-fed-link.odt" with permission 31 as a federated share to "user2" on "serverB"

    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/document-reshare-fed-link.odt" through direct editing
    And Collabora fetches checkFileInfo
    And both Collabora files used the same file id
    And as "user2" create a share with
      | path      | /document-reshare-fed-link.odt |
      | shareType | 3                              |

    Given on instance "serverA"
    And as user "user3"
    When User "user3" opens the last share link through direct editing
    And Collabora fetches checkFileInfo
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName     | document-reshare-fed-link.odt |
      | UserFriendlyName | user3-displayname (Guest)       |
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.ods"
    Then Collabora downoads the file and it is equal to "./../assets/template.odt"
    And the direct editing link is only valid once
