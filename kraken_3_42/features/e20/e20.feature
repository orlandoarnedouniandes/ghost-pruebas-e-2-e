Feature: Configuration link Delete

  @user20 @web
  Scenario: E20 - Modify Delete and Verify link Deletion
    Given I navigate to page "<BASEURL>"
    And I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 2 seconds
    And I click on the "Settings" tab
    And I wait 2 seconds
    And I navigate to the "Navigation" settings page
    And I wait 3 seconds
    When I add a new navigation item with label "Test" and URL "<BASEURLROOT>"
    And I click the primary Save button
    And I wait 3 seconds
    Then I refresh the page
    And I wait 3 seconds
    Then I should see a navigation item with label "Test" and URL "<BASEURLROOT>"
    Then delete label "Test"
    And I wait 2 seconds
    And I click the primary Save button
    And I wait 2 seconds
    Then I refresh the page
    

    

