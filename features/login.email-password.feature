@login
Feature: Login with email and password
  As a User
  ISBAT login with my email and password

  Background:
    Given User has already created a Celsius account with email and password
    And User is logged out of Celsius app
    And User navigated to Login screen

  @happy
  Scenario: Successful email/password login
    When User enters correct email
    And Enters correct password
    And Verifies his profile
    Then User is navigated to Wallet Landing screen
