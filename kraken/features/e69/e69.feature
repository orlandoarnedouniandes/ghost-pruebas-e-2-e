Feature: Change Website (pseudo-aleatorio)

  @user69 @web
  Scenario: E69 - Change Website (pseudo-aleatorio)
    Given I navigate to page "<BASEURL>"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 3 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 2 seconds
    When I modify current website and save changes with faker "pseudo-random"
    And I wait 3 seconds
    When I refresh the page
    And I wait 2 seconds
    Then I should see the expected website
