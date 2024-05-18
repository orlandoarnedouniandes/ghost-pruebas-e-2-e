Feature: Change Website (a-priori)

  @user68 @web
  Scenario: E68 - Change Website (a-priori)
    Given I navigate to page "<BASEURL>"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 3 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 2 seconds
    When I modify current website and save changes with faker "a-priori"
    And I wait 3 seconds
    When I refresh the page
    And I wait 2 seconds
    Then I should see the expected website
