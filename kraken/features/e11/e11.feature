Feature: Ghost Tests

  @user11 @web
    Scenario: E11 - Create Tag
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the 'New Tag' link
      And I wait 1 seconds
      When I type the basic information for New Tag 'Test Tag' and create Tag
      And I wait 1 seconds
      Then I validate the New Tag created 'Test Tag'
