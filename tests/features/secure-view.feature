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

	Scenario: Save As is forbidden under secure view even for a writable non-guest token
		Given as user "user1"
		And User "user1" uploads file "./../emptyTemplates/template.odt" to "/file.odt"
		And as "user1" create a share with
			| path      | /file.odt |
			| shareType | 3         |
		And Updating last share with
			| permissions | 3 |
		And the user opens the share link
		And Collabora fetches checkFileInfo
		And checkFileInfo "UserCanWrite" is true
		And checkFileInfo "UserCanNotWriteRelative" is true
		And Collabora saves the content of "./../emptyTemplates/template.ods" as "/secure-view-saveas.odt"
		And the WOPI HTTP status code should be "403"
		And as "user1" the file "/secure-view-saveas.odt" does not exist
