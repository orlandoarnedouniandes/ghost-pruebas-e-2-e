Feature: Change Slug (pseudo-aleatorio)

  @user52 @web
  Scenario: E52 - Change Slug (pseudo-aleatorio)
    Given I navigate to page "<BASEURL>"
    And I set the new user name to faker "pseudo-random"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
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

  