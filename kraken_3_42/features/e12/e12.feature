Feature: Ghost Tests

  @user12 @web
    Scenario: E12 - Put Tag to Post
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the first Post list and I add the tag
      And I wait 1 seconds
      Given I navigate to page "<POSTSURL>"
      And I wait 1 seconds
      Then I click on the modify Post list and I verify tag
