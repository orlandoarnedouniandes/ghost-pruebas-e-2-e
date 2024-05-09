Feature: Ghost Tests

  @user2 @web
    Scenario: E02 - Publish Post
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the draft post
      And I wait 1 seconds
      And I click on the publish button
      And I wait 1 seconds
      Then I validate that the Post is publish
