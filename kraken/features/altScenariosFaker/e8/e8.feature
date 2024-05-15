Feature: Ghost Tests

  @user8 @web
    Scenario: E08 - Change Title on Publish Post
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Page' link
      And I wait 1 seconds
      And I click on the publish page to change title
      And I wait 1 seconds
      And I change title of page
      And I wait 2 seconds
      Then I validate that the Page is new title
