Feature: Ghost Tests

  @user3 @web
    Scenario: E03 - Change Title on Publish Post
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the publish post to change title
      And I wait 1 seconds
      And I change title of post for "<POSTTITLE>"
      And I wait 2 seconds
      Then I validate that the Post is new title "<POSTTITLE>"
