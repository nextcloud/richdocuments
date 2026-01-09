Feature: Admin Settings

Background:
  Given user "user1" exists

  Scenario: Normal user cannot upload system config
    When a user uploads a system configuration file
    Then the system configuration upload is forbidden
