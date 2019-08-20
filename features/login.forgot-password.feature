@login
Feature: Forgot password
  As a User
  ISBAT set a new password if I forgot my old one

  Background:
    Given User has already created a Celsius account
    And User is logged out of Celsius app
    And User has forgotten his password
    And User navigated to Forgot Password screen

  @happy
  Scenario: Successful password change
    When User enters his email
    Then User should receive an email to change his password
    When User changes his password
    Then User should be able to log into Celsius with new credentials
