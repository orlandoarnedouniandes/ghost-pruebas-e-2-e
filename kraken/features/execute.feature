Feature: Profile Actualizar full name

  @user35 @web
  Scenario: E16 - Login Correo (a-priori) + contraseña (vacio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "a-priori" and password "EMPTY"
    And I wait 3 seconds
    Then I should see Please fill out the form to sign in message