Feature: Profile Actualizar slug

  @user1 @web
  Scenario: Modify and Verify User Information
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    And I set the new user name to "editedUsername"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I Click on user dropdown
    And I click on the 'Your profile' link
    When I get current full name
    When I modify the user name and save changes
    And I wait 3 seconds
    When I navigate to new user profile page
    Then I should see the expected name

  