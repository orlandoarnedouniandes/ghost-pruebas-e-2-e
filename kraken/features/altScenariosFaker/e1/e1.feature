Feature: Ghost Tests

@user1 @web
    Scenario: E01 - Create Post
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Posts' link
        And I click on the 'NewPost' link
        And I wait 2 seconds
        And I fill the post with title "<POSTTITLE>" and content "<POSTCONTENT>"
        And I navigate back to the 'Posts' page
        Then I validate the last post with title "<POSTTITLE>"