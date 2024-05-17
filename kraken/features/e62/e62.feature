Feature: Change Site Description (aleatorio)

  @user62 @web
    Scenario: E62 - Change Site Description (aleatorio)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Settings' link
      And I wait 1 seconds
      And I click on the 'General Settings' link
      And I wait 2 seconds
      And I modify the description to faker "random"
      And I wait 3 seconds
      Then I navigate to base root url
      And I wait 3 seconds
      And I validate that the description has been changed
