Feature: API

  Background:
    Given user "user1" exists

  Scenario: Extract field values
    Given as user "user1"
    And User "user1" uploads file "./data/form.odt" to "/form.odt"
    Then User "user1" requests the form field data of "/form.odt"
    And the response contains the field "Name of the Organizer/Organization"
    And the response contains the field "Road closures - Length of road closures (in meters)"

  Scenario: Extract field values and fill in field
    Given as user "user1"
    And User "user1" uploads file "./data/form.odt" to "/form.odt"
    Then User "user1" requests the form field data of "/form.odt"
    And the response contains the field "Name of the Organizer/Organization"
    And the response contains the field "Road closures - Length of road closures (in meters)"
    Then User "user1" fills in fields of "/form.odt" with values as "odt" to "/filled.odt"
      | ContentControls.ByIndex.19 | 100 |
    Then User "user1" requests the form field data of "/filled.odt"
    And the response contains the field "Road closures - Length of road closures (in meters)" with "100"
    And the resulting file is a "application/vnd.oasis.opendocument.text"

  Scenario: Extract field values and fill in field as pdf
    Given as user "user1"
    And User "user1" uploads file "./data/form.odt" to "/form.odt"
    Then User "user1" requests the form field data of "/form.odt"
    And the response contains the field "Name of the Organizer/Organization"
    And the response contains the field "Road closures - Length of road closures (in meters)"
    Then User "user1" fills in fields of "/form.odt" with values as "pdf" to "/filled.pdf"
      | ContentControls.ByIndex.19 | 100 |
    And the resulting file is a "application/pdf"

  Scenario: Extract field values and fill in field as pdf
    Given as user "user1"
    And User "user1" uploads file "./data/form.odt" to "/form.odt"
    Then User "user1" requests the form field data of "/form.odt"
    And the response contains the field "Name of the Organizer/Organization"
    And the response contains the field "Road closures - Length of road closures (in meters)"
    Then User "user1" fills in fields of "/form.odt" with values as "pdf"
      | ContentControls.ByIndex.19 | 100 |
    And the resulting file is a "application/pdf"
