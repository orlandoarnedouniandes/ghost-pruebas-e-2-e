Feature: Login Correo (pseudo-aleatorio) + contraseña (pseudo-aleatorio)

  @user42 @web
  Scenario: E42 - Login Correo (pseudo-aleatorio) + contraseña (pseudo-aleatorio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "pseudo-random" and password "pseudo-random"
    And I wait 3 seconds
    Then I should see login error message "There is no user with that email address"
