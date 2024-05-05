Feature: Profile Actualizar full name

  @user1 @web
  Scenario: Modify and Verify full name Information
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    And I set the new full name to "Edited Full Name"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I Click on user dropdown
    And I click on the 'Your profile' link
    When I get current slug name
    When I modify current full name and save changes
    And I wait 3 seconds
    When I navigate to new user profile page
    Then I should see the expected full name