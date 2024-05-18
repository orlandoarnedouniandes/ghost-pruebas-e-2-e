Feature: Ghost Tests Create Member

  @user124 @web
    Scenario: E124 - Create Member Already Created / Apriori - Name, Email, Labels, Note
      Given I navigate to page "<BASEURL>"
      When I log in with email "<USERNAME>" and password "<PASSWORD>"
      And I wait 3 seconds
      And I click on the 'Members' link
      And I wait 1 seconds
      And I click on the 'New Member' link
      And I wait 1 seconds
      And I fill the new member with name "<NAMEMEMBER>", email "<EMAILMEMBER>", labels "<LABELMEMBER>" and note "<NOTEMEMBER>"
      And I wait 1 seconds
      Then I validate the new member created with name "<NAMEMEMBER>" and email "<EMAILMEMBER>"
