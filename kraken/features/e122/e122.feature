Feature: Ghost Tests Create Member

  @user122 @web
    Scenario: E122 - Create Member / Pseudo Random - Name (BLANK) Email (Random) Labels (BLANK) Note (Random)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Members' link
      And I wait 1 seconds
      And I click on the 'New Member' link
      And I wait 1 seconds
      And I fill the new member with name "<BLANK>", email "$email_1", labels "<BLANK>" and note "$string_2"
      And I wait 1 seconds
      Then I validate the new member created with name "<BLANK>" and email "$$email_1"
