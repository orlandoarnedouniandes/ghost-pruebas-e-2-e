Feature: Change Location (pseudo-aleatorio)

  @user66 @web
  Scenario: E66 - Change Location (pseudo-aleatorio)
    Given I navigate to page "<BASEURL>"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 3 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 2 seconds
    ## When I get current location
    When I modify current location and save changes with faker "pseudo-random"
    And I wait 3 seconds
    When I refresh the page
    And I wait 2 seconds
    Then I should see the expected location
