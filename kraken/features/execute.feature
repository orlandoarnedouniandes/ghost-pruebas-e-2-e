Feature: Configuration link Delete

  @user130 @web
    Scenario: E130 - Edit Tag / Random - Title (Random)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Tags' link
      And I wait 1 seconds
      And I click on the first Tag list and I modify the title "$string_1"
      And I wait 1 seconds
      Then I validate the Tag modified "$$string_1"

