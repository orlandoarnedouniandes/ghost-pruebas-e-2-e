Feature: Ghost Tests

@user29 @web
    Scenario: E29 - Create Page / Pseudo Aleatorio - Title (Blank) Content (Random)
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Page' link
        And I click on the 'NewPage' link
        And I wait 2 seconds
        And I fill the post with title "<BLANK>" and content "$string_1"
        And I navigate back to the 'Page' page
        Then I validate the last post with title "<BLANK>"

