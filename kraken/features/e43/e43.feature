Feature: Login Correo (aleatorio) + contraseña (aleatorio)

  @user43 @web
  Scenario: E43 - Login Correo (aleatorio) + contraseña (aleatorio)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "random" and password "random"
    And I wait 3 seconds
    Then I should see login error message "There is no user with that email address"
