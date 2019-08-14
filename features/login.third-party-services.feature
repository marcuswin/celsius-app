@login
Feature: Login with email and password
  As a User
  ISBAT login with a third party service

  Background:
    Given User has already created a Celsius account
    And User is logged out of Celsius app
    And User navigated to Login screen

  @happy
  Scenario: Successful login with Google
    Given User has created his account with Google
    When Logs in with correct Google credentials
    And Verifies his profile
    Then User is navigated to Wallet Landing screen

  @happy
  Scenario: Successful login with Twitter
    Given User has created his account with Twitter
    When Logs in with correct Twitter credentials
    And Verifies his profile
    Then User is navigated to Wallet Landing screen

  @happy
  Scenario: Successful login with Facebook
    Given User has created his account with Facebook
    When Logs in with correct Facebook credentials
    And Verifies his profile
    Then User is navigated to Wallet Landing screen
