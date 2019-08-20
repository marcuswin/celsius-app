@loans
Feature: Loan Settings
  As a User with an active loan
  ISBAT change settings of my loan

  Background:
    Given: A user that has an active loan is logged in
    And: They navigate to All Loans screen
    And: Swipe to an active loan
    And: Press `Loan Settings`

  @happy
  Scenario: User can toggle automatic interest payment
    When: They toggle the `Automatic interest payment` switch
    Then: A toast message should inform them about the change
    # TODO need copy

  @happy
  Scenario: User can setup their principal to be paid from their collateral
    When: They navigate to `Principal Payout`
    And: Toggle `Payout from Collateral` switch
    Then: A toast message should inform them about the change
    # TODO need copy

  @happy
  Scenario: User can setup their principal to be paid from a coin of their choice
    When: They navigate to `Principal Payout`
    And: `Payout from Collateral` switch is off

    Then: `Change Principal Payment type` button is visible
    When: They press the button
    And: Choose a coin
    Then: A toast message should inform them about the change
    # TODO need copy
    And: User is rerouted to `Principal Payout`

  @happy
  Scenario: User can setup their interest payment to be in CEL
    When: They navigate to `Change Interest Payment`
    And: Choose `Pay in CEL`
    Then: They are navigated to Pay With CEL screen
    And: Are informed on their payment decrease based on their tier level

    When: They press the `Pay with CEL` button
    Then: A toast message should inform them about the change
    # TODO need copy
    And: User is rerouted to `Loan Settings`

  @happy
  Scenario: User can setup their interest payment to be in Crypto
    When: They navigate to `Change Interest Payment`
    And: Choose `Pay in Crypto`
    And: Choose a coin from the list of available coins

    Then: A toast message should inform them about the change
    # TODO need copy
    And: User is rerouted to `Loan Settings`

  @happy
  Scenario: User can setup their interest payment to be in USD
    When: They navigate to `Change Interest Payment`
    And: Choose `Pay with Dollars`
    Then: They are navigated to Celsius account details screen
