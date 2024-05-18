Feature: Login Correo (vacio) + contraseña (pseudo-aleatorio)

  @user39 @web
  Scenario: E39 - Login Correo (vacio) + contraseña (pseudo-aleatorio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "EMPTY" and password "pseudo-random"
    And I wait 3 seconds
    Then I should see login error message "Please fill out the form to sign in"
