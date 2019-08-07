Feature: Choose collateral to lock
  Based on  user's current amount in wallet
  User wants to choose coin for collateral, or deposit more.

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  Scenario: User has enough funds in coin he want to use as collateral
    Given User is on the Collateral screen
    And User has active card for coin want to use
    And User is 'User can see amount' in coins and USD that will be used as collateral
    When User click on card with coin want to use
    Then Leads on the 'Choose Your Interest Rate' screen

  Scenario: User don't has enough funds in coin he want to use
    Given User is on Collateral screen
    And User don't have active card for coin want to use
    And User can see amount in coins and USD that will be used as collateral
    And User can see additional amount in coin needed for collateral
    And And user can see Deposit more button active
    When User click on Deposit more button
    Then Leads on the deposit screen
    And User can see coin he want to use as collateral already selected in deposit screen
