Feature: Ghost Tests

  @user31 @web
    Scenario: E31 - Change Title on Publish Page / Random - Title (Random)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Page' link
      And I wait 1 seconds
      And I click on the publish page to change title
      And I wait 1 seconds
      And I change title of page for "$string_1"
      And I wait 2 seconds
      Then I validate that the Page is new title "$$string_1"