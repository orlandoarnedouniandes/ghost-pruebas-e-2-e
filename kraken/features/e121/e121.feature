Feature: Ghost Tests Create Member

  @user121 @web
    Scenario: E121 - Create Member / Random - Name (Random) Email (Random) Labels (Random) Note (Random)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Members' link
      And I wait 1 seconds
      And I click on the 'New Member' link
      And I wait 1 seconds
      And I fill the new member with name "$name_1", email "$email_1", labels "$string_1" and note "$string_2"
      And I wait 1 seconds
      Then I validate the new member created with name "$$name_1" and email "$$email_1"
