Feature: Ghost Tests

@user7 @web
    Scenario: E07 - Publish Page
        Given I navigate to page "<BASEURL>"
        When I log in with email "<USERNAME>" and password "<PASSWORD>"
        And I wait 3 seconds
        And I click on the 'Page' link
        And I wait 1 seconds
        And I click on the draft page
        And I wait 1 seconds
        And I click on the publish page button
        And I wait 1 seconds
        Then I validate that the Page is publish