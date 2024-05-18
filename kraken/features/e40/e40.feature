Feature: Login Correo (vacio) + contraseña (aleatorio)

  @user40 @web
  Scenario: E40 - Login Correo (vacio) + contraseña (aleatorio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "EMPTY" and password "random"
    And I wait 3 seconds
    Then I should see login error message "Please fill out the form to sign in"
