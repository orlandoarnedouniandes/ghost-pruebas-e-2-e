Feature: Ghost Tests

  @user14 @web
    Scenario: E14 - Delete Tag
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the last Tag and I delete the tag
      And I wait 1 seconds
      Then I validate that the tag 'Test Tag Modified' not exist

