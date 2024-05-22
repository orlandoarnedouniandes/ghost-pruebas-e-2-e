Feature: Ghost Tests Create Member

  @user125 @web
    Scenario: E125 - Edit Member Already Created / Apriori (Random) - Name (Random), Email (Random), Labels (Random), Note (Random)
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Members' link
      And I wait 1 seconds
      And I click on the first Member list
      And I wait 1 seconds
      And I fill the new member with name "$name_1", email "$email_1", labels "$string_1" and note "$string_2"
      And I wait 1 seconds
      Then I validate the new member created with name "$$name_1" and email "$$email_1"
