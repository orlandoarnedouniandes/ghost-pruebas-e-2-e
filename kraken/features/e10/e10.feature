Feature: Ghost Tests

  @user10 @web
    Scenario: E10 - Delete Page
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Pages' link
      And I wait 1 seconds
      And I click on the last Page and I delete the Page
      And I wait 1 seconds
      Then I validate that the last Page not exist
