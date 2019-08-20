@register
Feature: Register with email and password
  As a Nonuser
  ISBAT create an account in Celsius app with email and password

  Background:
    Given A Nonuser opened the app
    And Navigated to Sign up screen

  @happy
  Scenario: Nonuser created an account successfully
    When Nonuser enters all the required personal info
    And Sets his PIN number
    And Confirms his PIN number

    Then Nonuser should be redirected to empty Wallet Landing screen
    And He should receive a welcome email from Celsius
