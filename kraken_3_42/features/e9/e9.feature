Feature: Ghost Tests

  @user9 @web
    Scenario: E09 - Unpublish Page
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Pages' link
      And I wait 1 seconds
      And I click on the publish page
      And I wait 1 seconds
      And I click on the unpublish page
      And I wait 1 seconds
      Then I validate that the last Page is unpublish
