Feature: Ghost Tests

  @user4 @web
    Scenario: E04 - Unpublish Post
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the publish post
      And I wait 1 seconds
      And I click on the unpublish post
      And I wait 1 seconds
      Then I validate that the last Post is unpublish
