@loans
Feature: Loan interest Prepayment
  As a User with a loan
  ISBAT prepay my interest in advance

  Background:
    Given: A user is logged in
    # Prepayment flow can be triggered
    # when a user creates a loan
    # from loan settings of an active loan
    And: User goes into Prepayment flow

  @happy
  Scenario: User Prepays in CEL
    When: They press the `Prepay with CEL` button
    Then: They should see amount to pay for each month in USD
    When: They choose a prepayment period
    And: Verify their profile
    Then: The user is rerouted to see details of his interest prepayment transaction

  @happy
  Scenario: User Prepays in crypto
    When: They press the `Prepay with Crypto` button
    Then: They should see amount to pay for each month in USD
    When: They choose a prepayment period
    And: Choose a coin with enough funds
    And: Verify their profile
    Then: The user is rerouted to see details of his interest prepayment transaction

  @happy
  Scenario: User Prepays in USD
    When: They press the `Prepay with Dollars` button
    Then: They should see amount to pay for each month in USD
    When: They choose a prepayment period
    Then: The user is rerouted to see details of Celsius bank account and info on how to pay
