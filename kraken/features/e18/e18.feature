Feature: Ghost Tests

  @user18 @web
    Scenario: E18 - Update Title Description
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Settings' link
      And I wait 1 seconds
      And I click on the 'General Settings' link
      And I wait 2 seconds
      And I modify the description
      And I wait 1 seconds
      Then I navigate to base root url
      And I validate that the description has been changed 'Proof Ghost Uniandes' on users page
