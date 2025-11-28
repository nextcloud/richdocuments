Feature: API

	Background:
		Given user "user1" exists
		And user "user2" exists
		And admin enables secure view

	Scenario: Download button is not shown in public shares
		Given as user "user1"
		And User "user1" creates a folder "NewFolder"
		And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
		And as "user1" create a share with
			| path      | /NewFolder |
			| shareType | 3          |
		Then the download button for "/NewFolder/file.odt" will be visible to "user1"
		And the download button for "file.odt" will not be visible in the last link share

	Scenario: Download button is not shown in internal read-only shares
		Given as user "user1"
		And User "user1" creates a folder "NewFolder"
		And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
		And as "user1" create a share with
			| path        | /NewFolder |
			| shareType   | 0          |
			| shareWith   | user2        |
			| permissions | 1           |
		Then the download button for "/NewFolder/file.odt" will not be visible to "user2"

	Scenario: Download button is shown in internal shares
		Given as user "user1"
		And User "user1" creates a folder "NewFolder"
		And User "user1" uploads file "./../emptyTemplates/template.odt" to "/NewFolder/file.odt"
		And as "user1" create a share with
			| path        | /NewFolder |
			| shareType   | 0          |
			| shareWith   | user2        |
			| permissions | 31           |
		Then the download button for "/NewFolder/file.odt" will be visible to "user2"
