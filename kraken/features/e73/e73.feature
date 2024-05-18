Feature: Change Facebook profile (aleatorio)

  @user73 @web
  Scenario: E73 - Change Facebook profile (aleatorio)
    Given I navigate to page "<BASEURL>"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 3 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 2 seconds
    When I modify current facebook and save changes with faker "random"
    And I wait 3 seconds
    When I refresh the page
    And I wait 2 seconds
    Then I should see the expected facebook
