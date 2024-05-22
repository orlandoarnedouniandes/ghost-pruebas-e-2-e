Feature: Ghost Tests

  @user13 @web
    Scenario: E13 - Edit Tag
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the first Tag list and I modify the title "TAGTITLE"
      And I wait 1 seconds
      Then I validate the Tag modified "<TAGTITLE>"
