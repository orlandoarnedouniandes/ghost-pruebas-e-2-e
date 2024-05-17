Feature: Ghost Tests

@user30 @web
    Scenario: E30 - Create Page /  - Title (Blank) Content (Blank)
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Page' link
        And I click on the 'NewPage' link
        And I wait 2 seconds
        And I fill the post with title "<BLANK>" and content "<BLANK>"
        And I navigate back to the 'Page' page
        Then I validate the last post with title "<BLANK>"