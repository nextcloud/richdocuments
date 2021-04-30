Feature: Federated editing

Background:
	Given user "user1" exists
	And user "user2" exists
  And user "user3" exists

  Scenario: Share a file by federation and open it
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/document.odt"
    And share the file "/document.odt" as a federated share to "user2" on "serverB"
    When User "user1" opens "/document.odt"
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document.odt"

    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    When User "user2" opens "/document.odt"
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "document.odt"
    And both Collabora files used the same file id

  Scenario: Share a file by federation and open it
    Given on instance "serverA"
    Given as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/reshare.odt"
    And share the file "/reshare.odt" as a federated share to "user2" on "serverB"

    Given on instance "serverB"
    Given as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/reshare.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "reshare.odt"
    And checkFileInfo "UserCanWrite" is true
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"
    And Collabora saved the file with the content of "./../assets/template.ods"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.ods"

    Given on instance "serverA"
    Given as user "user1"
    Then User "user1" opens "/reshare.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "reshare.odt"
    And checkFileInfo "UserCanWrite" is true
    Then the file is equal to "./../assets/template.ods"
    And Collabora saved the file with the content of "./../assets/template.odt"
    And Collabora downloads the file
    Then the file is equal to "./../assets/template.odt"
    And both Collabora files used the same file id


  Scenario: Share a file by federation and reshare it read-only
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file-reshare-readonly.odt"
    And share the file "/file-reshare-readonly.odt" as a federated share to "user2" on "serverB"

    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/file-reshare-readonly.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file-reshare-readonly.odt"
    And checkFileInfo "UserCanWrite" is true
    Then Collabora downoads the file and it is equal to "./../assets/template.odt"
    And Collabora can save the file with the content of "./../assets/template.ods"

    And as "user2" create a share with
      | path | /file-reshare-readonly.odt |
      | shareType | 0 |
      | shareWith | user3 |
      | permissions | 1 |

    Given as user "user3"
    Then User "user3" opens "/file-reshare-readonly.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file-reshare-readonly.odt"
    And checkFileInfo "UserCanWrite" is false
    And both Collabora files used the same file id
    And Collabora can not save the file with the content of "./../assets/template.odt"
    Then Collabora downoads the file and it is equal to "./../assets/template.ods"

  Scenario: Share a file by federation and reshare it with write permissions
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file-reshare-rw.odt"
    And share the file "/file-reshare-rw.odt" as a federated share to "user2" on "serverB"

    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/file-reshare-rw.odt"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file-reshare-rw.odt"
    And checkFileInfo "UserCanWrite" is true
    Then Collabora downoads the file and it is equal to "./../assets/template.odt"
    And Collabora can save the file with the content of "./../assets/template.ods"

    And as "user2" create a share with
      | path | /file-reshare-rw.odt |
      | shareType | 0 |
      | shareWith | user3 |
      | permissions | 31 |

    Given as user "user3"
    When User "user3" opens "/file-reshare-rw.odt"
    And Collabora fetches checkFileInfo
    Then checkFileInfo "BaseFileName" is "file-reshare-rw.odt"
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    And Collabora can save the file with the content of "./../assets/template.ods"
    And Collabora downoads the file and it is equal to "./../assets/template.ods"

  @known-failure-ci
  Scenario: Share a file by federation and reshare it as a link
    Given on instance "serverA"
    And as user "user1"
    And User "user1" uploads file "./../assets/template.odt" to "/file-reshare-link.odt"
    And share the file "/file-reshare-link.odt" as a federated share to "user2" on "serverB"
    Then User "user1" opens "/file-reshare-link.odt"
    And Collabora fetches checkFileInfo

    Given on instance "serverB"
    And as user "user2"
    And user "user2" accepts last share
    Then User "user2" opens "/file-reshare-link.odt"
    And Collabora fetches and receives the following in the checkFileInfo response
      | BaseFileName | file-reshare-link.odt |
      | UserCanWrite | 1                     |
    And checkFileInfo "BaseFileName" is "file-reshare-link.odt"
    And checkFileInfo "UserCanWrite" is true
    And both Collabora files used the same file id
    Then Collabora downoads the file and it is equal to "./../assets/template.odt"
    And Collabora can save the file with the content of "./../assets/template.ods"

    # This might fail curently due to using the same instance
    And as "user2" create a share with
      | path | /file-reshare-link.odt |
      | shareType | 3 |

    Then Using web as guest
    And a guest opens the share link as "Anonymous"
    And Collabora fetches checkFileInfo
    And checkFileInfo "BaseFileName" is "file-reshare-link.odt"
    And checkFileInfo "UserId" matches "/Guest-/"
    And checkFileInfo "UserFriendlyName" is "Anonymous (Guest)"
    ## FIXME: The owner id seems to be preserved from the orignal instance
    ## And checkFileInfo "OwnerId" is "user1"
    ## And both Collabora files used the same file id
    And checkFileInfo "UserCanWrite" is false
    And Collabora downoads the file and it is equal to "./../assets/template.ods"
    And Collabora can not save the file with the content of "./../assets/template.odt"
