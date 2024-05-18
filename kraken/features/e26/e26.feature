Feature: Ghost Tests

  @user26 @web
    Scenario: E26 - Change Title on Publish Post / Apriori  - Title (Blank)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Posts' link
      And I wait 1 seconds
      And I click on the publish post to change title
      And I wait 1 seconds
      And I change title of post for "<BLANK>"
      And I wait 2 seconds
      Then I validate that the Post is new title "<BLANK>"
