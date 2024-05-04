Feature: Ghost Tests

  @user11 @web
  Scenario: E11 - Create Tag
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 1 seconds
    And I click on the 'Tags' link
    And I wait 1 seconds
    And I click on the 'New Tag' link
    And I wait 1 seconds
    When I type the basic information for New Tag 'Test Tag' and create Tag
    And I wait 1 seconds
    Then I validate the New Tag created 'Test Tag'

  @user13 @web
  Scenario: E13 - Edit Tag
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 1 seconds
    And I click on the 'Tags' link
    And I wait 1 seconds
    And I click on the first Tag list and I modify the title
    And I wait 1 seconds
    Then I validate the Tag modified 'Test Tag Modified'

  @user14 @web
  Scenario: E14 - Delete Tag
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 1 seconds
    And I click on the 'Tags' link
    And I wait 1 seconds
    And I click on the last Tag and I delete the tag
    And I wait 1 seconds
    Then I validate that the tag 'Test Tag Modified' not exist

  @user18 @web
  Scenario: E18 - Update Title Description
    Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
    When I log in with email "<USERNAME>" and password "<PASSWORD>"
    And I wait 1 seconds
    And I click on the 'Settings' link
    And I wait 1 seconds
    And I click on the 'General Settings' link
    And I wait 1 seconds
    And I modify the description
    And I wait 1 seconds
    Then I navigate to page "https://ghost-jpjk.onrender.com/" 
    And I validate that the description has been changed 'Proof Ghost Uniandes' on user's page
