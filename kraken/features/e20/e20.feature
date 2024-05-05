Feature: Configuration link Delete

  @user1 @web
  Scenario: Modify Delete and Verify link Deletion
    Given I navigate to the Ghost login page
    And I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I click on the "Settings" tab
    And I navigate to the "Navigation" settings page
    And I wait 3 seconds
    When I add a new navigation item with label "Test" and URL "https://ghost-jpjk.onrender.com/"
    And I click the primary Save button
    And I wait 3 seconds
    Then I refresh the page
    And I wait 3 seconds
    Then I should see a navigation item with label "Test" and URL "https://ghost-jpjk.onrender.com/"
    Then delete label "Test"
    And I wait 2 seconds
    And I click the primary Save button
    And I wait 2 seconds
    Then I refresh the page
    

    

