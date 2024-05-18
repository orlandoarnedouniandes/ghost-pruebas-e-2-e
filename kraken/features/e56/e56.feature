Feature: Change Title (a-priori)

  @user56 @web
  Scenario: E56 - Change Title (a-priori)
    Given I navigate to page "<BASEURL>"
    And I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 2 seconds
    And I click on the "Settings" tab
    And I wait 2 seconds
    And I navigate to the "General" settings page
    And I wait 2 seconds
    When I click the Expand button
    And I wait 1 seconds
    When I update the site title to faker "a-priori"
    And I wait 2 seconds
    And I click the primary Save button
    And I wait 3 seconds
    Then I refresh the page
    And I wait 2 seconds
    When I click the Expand button
    And I wait 1 seconds
    Then The site title should be updated

