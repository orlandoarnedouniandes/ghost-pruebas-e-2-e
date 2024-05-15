Feature: Ghost Tests

  @user5 @web
    Scenario: E05 - Delete Post
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the last Post and I delete the Post
      And I wait 1 seconds
      Then I validate that the last Post not exist

  