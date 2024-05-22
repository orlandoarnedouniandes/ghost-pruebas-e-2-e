Feature: Ghost Tests

  @user32 @web
    Scenario: E32 - Change Title on Publish Page / Apiori - Title (Blank)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Page' link
      And I wait 1 seconds
      And I click on the publish page to change title
      And I wait 1 seconds
      And I change title of page for "<BLANK>"
      And I wait 2 seconds
      Then I validate that the Page is new title "<BLANK>"