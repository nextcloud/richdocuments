Feature: wopi

Background
	Given "user1" exists
	Given "user2" exists

Scenario: Create a new wopi token for a user and open it
	Given as user "user1"
	And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
	Then User "user1" opens "/file.odt"
	And Collabora fetches checkFileInfo
	And checkFileInfo "BaseFileName" is "file.odt"
	And checkFileInfo "UserId" is "user1"
	And checkFileInfo "OwnerId" is "user1"
	And checkFileInfo "UserCanWrite" is true

Scenario: Fetch checkFileInfo for public share link
	Given as user "user1"
	And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
	And as "user1" create a share with
		| path | /file.odt |
		| shareType | 3 |
	Then Using web as guest
	And a guest opens the share link
	And Collabora fetches checkFileInfo
	And checkFileInfo "BaseFileName" is "file.odt"
	And checkFileInfo "UserId" matches "/Guest-/"
	And checkFileInfo "OwnerId" is "user1"
	And checkFileInfo "UserCanWrite" is false
	And Collabora puts "./../assets/template.odt"
	And the HTTP status code should be "403"


	Scenario: Fetch checkFileInfo for public share link with write permission
	Given as user "user1"
	And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
	And as "user1" create a share with
		| path | /file.odt |
		| shareType | 3 |
	And Updating last share with
		| permissions | 3 |
	Then Using web as guest
	And a guest opens the share link as "Anonymous"
	And Collabora fetches checkFileInfo
	And checkFileInfo "BaseFileName" is "file.odt"
	And checkFileInfo "UserId" matches "/Guest-/"
	And checkFileInfo "OwnerId" is "user1"
	And checkFileInfo "UserCanWrite" is true
	And Collabora puts "./../assets/template.odt"

Scenario: Save a file as the owner
	Given as user "user1"
	And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
	Then User "user1" opens "/file.odt"
	And Collabora fetches checkFileInfo
	And checkFileInfo "UserCanWrite" is true
	And Collabora puts "./../assets/template.odt"


Scenario: Save a file as guest with write permissions
	Given as user "user1"
	And User "user1" uploads file "./../assets/template.odt" to "/file.odt"
	And as "user1" create a share with
		| path | /file.odt |
		| shareType | 3 |
	And Updating last share with
		| permissions | 3 |
	And the HTTP status code should be "200"
	Then Using web as guest
	And a guest opens the share link as "Anonymous"
	And Collabora fetches checkFileInfo
	And checkFileInfo "BaseFileName" is "file.odt"
	And checkFileInfo "UserId" matches "/Guest-/"
	And checkFileInfo "OwnerId" is "user1"
	And checkFileInfo "UserCanWrite" is true
	And Collabora puts "./../assets/template.odt"
