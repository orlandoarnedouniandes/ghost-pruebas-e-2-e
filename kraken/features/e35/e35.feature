Feature: Profile Actualizar slug

  @user35 @web
  Scenario: E15 - Modify and Verify User Information
    Given I navigate to page "<BASEURL>"
    And I set the new user name to "editedUsername"
    When I log in with faker email "pseudo-random" and password "a-priori"
    And I wait 2 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 1 seconds
    When I get current full name
    When I modify the user name and save changes
    And I wait 3 seconds
    When I navigate to new user profile page
    And I wait 2 seconds
    Then I should see the expected name

  