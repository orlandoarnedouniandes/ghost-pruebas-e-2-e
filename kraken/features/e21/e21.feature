Feature: Ghost Tests

  @user21 @web
    Scenario: E21 - Create Post / Random - Title (Random) Content (Random)
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Posts' link
        And I click on the 'NewPost' link
        And I wait 2 seconds
        And I fill the post with title "$name_1" and content "$string_1"
        And I navigate back to the 'Posts' page
        Then I validate the last post with title "$$name_1"
