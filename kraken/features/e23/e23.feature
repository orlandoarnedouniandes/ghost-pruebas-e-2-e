Feature: Ghost Tests
  
  @user23 @web
    Scenario: E23 - Create Post Title / Pseudo - (Blank) Content (Random)
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Posts' link
        And I click on the 'NewPost' link
        And I wait 2 seconds
        And I fill the post with title "<BLANK>" and content "$string_1"
        And I navigate back to the 'Posts' page
        Then I validate the last post with title "<BLANK>"

