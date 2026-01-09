Feature: Admin Settings

Background:
  Given user "user1" exists

  Scenario: Normal user cannot retrieve admin settings
    When the admin settings are requested by a user
    Then the admin settings are forbidden

  Scenario: Admin can retrieve admin settings
    When the admin settings are requested by an admin
    Then the admin settings are returned

  Scenario: Normal user cannot upload system config
    When a user uploads a system configuration file
    Then the system configuration upload is forbidden
