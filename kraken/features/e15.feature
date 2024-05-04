Feature: User Modification

  @user1 @web
  Scenario: Modify and Verify User Information
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 2 seconds
    And I Click on user dropdown
    And I wait 2 seconds
    And I click on the 'Your profile' link
    And I wait 2 seconds
    When I modify the user name to "orlandotest" and save changes
    And I wait 3 seconds
    When I navigate to page "https://ghost-jpjk.onrender.com/author/orlandotest/"
    Then I should see the updated name "Helvert Wiesner" in the profile