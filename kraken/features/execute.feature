Feature: Profile Actualizar full name

  @user16 @web
  Scenario: E16 - Modify and Verify full name Information
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 3 seconds
    And I Click on user dropdown
    And I wait 1 seconds
    And I click on the 'Your profile' link
    And I wait 1 seconds
    When I get current slug name
    When I modify current full name and save changes
    And I wait 3 seconds
    When I navigate to new user profile page
    And I wait 2 seconds
    Then I should see the expected full name
