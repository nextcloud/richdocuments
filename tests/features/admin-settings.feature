Feature: Admin Settings

Background:
  Given user "user1" exists

  Scenario: Normal user cannot upload a system config file
    When a user uploads a system configuration file
    Then the system configuration upload is forbidden

  Scenario: Admin can upload a system config file
    When an admin uploads a system configuration file
    Then the system configuration upload is allowed

  Scenario: Normal user cannot delete a system config file
    When a user deletes a system configuration file
    Then the system configuration deletion is forbidden

  Scenario: Admin can delete a system config file
    When an admin deletes a system configuration file
    Then the system configuration deletion is allowed

