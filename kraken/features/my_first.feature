Feature: Creacion de un nuevo tag

@user1 @web
Scenario: Como usuario quiero hacer log in
  Given I navigate to page "https://ghost-jpjk.onrender.com/ghost/#/signin/"
  When I log in with email "<USERNAME>" and password "<PASSWORD>"
  Then I should see the button with class "gh-btn gh-btn-primary gh-btn-icon gh-btn-green ember-view"