Feature: Ghost Tests

  @user24 @web
    Scenario: E24 - Create Post / - Title (Blank) Content (Blank)
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Posts' link
        And I click on the 'NewPost' link
        And I wait 2 seconds
        And I fill the post with title "<BLANK>" and content "<BLANK>"
        And I navigate back to the 'Posts' page
        Then I validate the last post with title "<BLANK>"
