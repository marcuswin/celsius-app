@withdraw
Feature: Set withdrawal address
  As a User
  ISBAT set withdrawal address for every coin

  Background:
    Given A User is logged in
    And User has navigated to Withdrawal flow
    And User has enough coin to withdraw


  @happy
  Scenario: User sets address for a coin
    When User chooses a coin to withdraw
    And Enters a valid amount
    Then User is taken to Set address screen

    Given User has not set a withdrawal address for the chosen coin
    When User enters a valid address for coin
    And Verifies his profile
    Then User can continue with the withdrawal process


  @happy
  Scenario Outline: User sets address for a coin with additional data
    When User chooses <coin> to withdraw
    And Enters a valid amount
    Then User is taken to Set address screen

    Given User has not set a withdrawal address for the <coin>
    When User enters a valid address for coin
    And Enters <additional_data>
    And Verifies his profile
    Then User can continue with the withdrawal process

    Examples:
      | coin | additional_data |
      | XRP  | destination tag |
      | XLM  | memo id         |


  @happy
  Scenario Outline: User sets address for a coin with additional data, but doesn't have the additional field
    When User chooses <coin> to withdraw
    And Enters a valid amount
    Then User is taken to Set address screen

    Given User has not set a withdrawal address for the <coin>
    When User enters a valid address for coin
    But Doesn't enter <additional_data>
    Then A Modal opens warning the user about missing <additional_data>

    When User confirms he doesn't have <additional_data>
    And Verifies his profile
    Then User can continue with the withdrawal process

    Examples:
      | coin | additional_data |
      | XRP  | destination tag |
      | XLM  | memo id         |
