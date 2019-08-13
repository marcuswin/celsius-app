@register
Feature: Register with third party service
  As a Nonuser
  ISBAT create an account in Celsius app with a third party service

  Background:
    Given A Nonuser opened the app
    And Navigated to Sign up screen

  @happy
  Scenario Outline: Nonuser created an account using a third party service successfully
    When Nonuser authenticates with <service>
    And Enters all the required personal info
    And Sets his PIN number
    And Confirms his PIN number

    Then Nonuser should be redirected to empty Wallet Landing screen
    And He should receive a welcome email from Celsius

    Examples:
      | service  |
      | Google   |
      | Twitter  |
      | Facebook |
