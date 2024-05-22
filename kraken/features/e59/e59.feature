Feature: Change Site Description (a-priori)

  @user60 @web
    Scenario: E60 - Change Site Description (a-priori)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Settings' link
      And I wait 1 seconds
      And I click on the 'General Settings' link
      And I wait 2 seconds
      And I modify the description to faker "a-priori"
      And I wait 3 seconds
      Then I navigate to base root url
      And I wait 3 seconds
      And I validate that the description has been changed
