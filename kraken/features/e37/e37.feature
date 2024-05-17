Feature: Login Correo  (aleatorio) + contraseña (vacio)

  @user37 @web
  Scenario: E37 - Login Correo  (aleatorio) + contraseña (vacio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "random" and password "EMPTY"
    And I wait 3 seconds
    Then I should see login error message "Please fill out the form to sign in"
