Feature: Login Correo (pseudo-aleatorio) + contraseña (vacio)

  @user36 @web
  Scenario: E36 - Login Correo (pseudo-aleatorio) + contraseña (vacio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "pseudo-random" and password "EMPTY"
    And I wait 3 seconds
    Then I should see login error message "Please fill out the form to sign in"
