Feature: Login Correo (vacio) + contraseña (a-priori)

  @user38 @web
  Scenario: E38 - Login Correo (vacio) + contraseña (a-priori)
    Given I navigate to page "<BASEURL>"
    And I set the new full name to "Edited Full Name"
    When I log in with faker email "EMPTY" and password "a-priori"
    And I wait 3 seconds
    Then I should see login error message "Please fill out the form to sign in"
