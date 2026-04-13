Feature: User Settings

  Background:
    Given user "user1" exists

  Scenario: A user can retrieve their own user configuration file
    When user "user1" uploads a user configuration file
    And user "user1" requests their own user configuration file
    Then the user configuration file is returned

  Scenario: A guest cannot access a user's configuration file using a public share token
    Given as user "user1"
    And User "user1" uploads file "./../emptyTemplates/template.odt" to "/test.odt"
    And as "user1" create a share with
      | path        | /test.odt |
      | shareType   | 3         |
      | permissions | 1         |
    When user "user1" uploads a user configuration file
    And A guest opens the file "test.odt" in the last share link through direct editing
    And the guest uses the share token to request the user configuration file
    Then the user configuration file is forbidden
