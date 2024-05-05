Feature: Profile Title update

  @user1 @web
  Scenario: Modify and Verify Site Title Information
    Given I navigate to the Ghost login page
    And I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I click on the "Settings" tab
    And I navigate to the "General" settings page
    When I click the Expand button
    And I wait 1 seconds
    When I update the site title to "Updated Title"
    And I click the primary Save button
    And I wait 3 seconds
    Then I refresh the page
    And I wait 2 seconds
    When I click the Expand button
    And I wait 1 seconds
    Then The input field should equal 'Updated Title'

