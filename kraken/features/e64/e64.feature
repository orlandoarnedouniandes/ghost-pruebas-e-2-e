Feature: Add link (aleatorio)

  @user64 @web
  Scenario: E64 - Add link (aleatorio)
    Given I navigate to page "<BASEURL>"
    And I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 2 seconds
    And I click on the "Settings" tab
    And I wait 1 seconds
    And I navigate to the "Navigation" settings page
    And I wait 3 seconds
    When I add a new navigation item with faker label "random" and URL "<BASEURLROOT>"
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
    

    

