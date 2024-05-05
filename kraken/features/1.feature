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

  @user9 @web
    Scenario: E10 - Unpublish Page
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Pages' link
      And I wait 1 seconds
      And I click on the publish page
      And I wait 1 seconds
      And I click on the unpublish page
      And I wait 1 seconds
      Then I validate that the last Page is unpublish

  @user10 @web
    Scenario: E10 - Delete Page
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Pages' link
      And I wait 1 seconds
      And I click on the last Page and I delete the Page
      And I wait 1 seconds
      Then I validate that the last Page not exist

  @user11 @web
    Scenario: E11 - Create Tag
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the 'New Tag' link
      And I wait 1 seconds
      When I type the basic information for New Tag 'Test Tag' and create Tag
      And I wait 1 seconds
      Then I validate the New Tag created 'Test Tag'

  @user12 @web
    Scenario: E12 - Put Tag to Post
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the first Post list and I add the tag
      And I wait 1 seconds
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/posts"
      And I wait 1 seconds
      Then I click on the modify Post list and I verify tag

  @user13 @web
    Scenario: E13 - Edit Tag
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the first Tag list and I modify the title
      And I wait 1 seconds
      Then I validate the Tag modified 'Test Tag Modified'

  @user14 @web
    Scenario: E14 - Delete Tag
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the last Tag and I delete the tag
      And I wait 1 seconds
      Then I validate that the tag 'Test Tag Modified' not exist

  @user18 @web
    Scenario: E18 - Update Title Description
      Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Settings' link
      And I wait 1 seconds
      And I click on the 'General Settings' link
      And I wait 2 seconds
      And I modify the description
      And I wait 1 seconds
      Then I navigate to page "https://ghost-jpjk.onrender.com/" 
      And I validate that the description has been changed 'Proof Ghost Uniandes' on users page
