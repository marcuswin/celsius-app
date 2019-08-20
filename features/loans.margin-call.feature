@loans
Feature: Margin Call on App open
  As a User with an active loan
  ISB informed if my ltv increased
  in order to lock more funds as my collateral

  Background:
    Given: A margin call was issued
    And: An affected user with an active loan opens the app

  @happy
  Scenario: User pays in original coin
    Given: The user has enough money in original collateral coin
    Then: A modal should open informing him about the margin call
    When: They press the `Lock` button
    And: Verify their profile
    Then: The additional amount is locked
    And: A toast message should inform them about the change
    # TODO need copy
    And: The user is rerouted to see details of his margin call transaction

  @happy
  Scenario: User pays in another coin, but has enough in original coin
    Given: The user has enough money in original collateral coin
    And: in other coins
    Then: A modal should open informing him about the margin call

    When: They press the `Pay in other coin` button
    Then: They get to Choose coin screen

    When: They choose a coin with enough funds
    And: Verify their profile
    Then: The additional amount is locked
    And: A toast message should inform them about the change
    # TODO need copy
    And: The user is rerouted to see details of his margin call transaction

  @happy
  Scenario: User pays in another coin
    Given: The user doesn't have enough money in original collateral coin
    But: has in other coins
    Then: A modal should open informing him about the margin call

    When: They press the `Pay in other coin` button
    Then: They get to Choose coin screen

    When: They choose a coin with enough funds
    And: Verify their profile
    Then: The additional amount is locked
    And: A toast message should inform them about the change
    # TODO need copy
    And: The user is rerouted to see details of his margin call transaction

  @happy
  Scenario: User doesn't have enough funds
    Given: The user doesn't have enough money in original collateral coin
    And: doesn't have enough in other coins
    Then: A modal should open informing him about the margin call

    When: They press the `Deposit` button
    Then: They should get to Deposit screen
    And: Be informed how much they need in each coin to cover the margin
