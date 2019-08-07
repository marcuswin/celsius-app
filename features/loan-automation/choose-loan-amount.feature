Feature: Choose loan amount
  As a Celsius verified user
  User wants to apply for a loan

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  Scenario: User wants to apply for a loan in USD
    Given User is on the Enter the Loan Amount screen
    And User has entered amount he wish to loan
    And User has chosen USD as loan coin
    And User can see minimum loan amount above button
    And User can see maximum loan amount above button
    When User hit Choose collateral which l
    Then Leads to screen for choosing collateral


  Scenario: User wants to apply for a loan in one of stable coins
    Given User is on the Enter the Loan Amount screen
    And User has entered amount I wish to loan
    And User has chosen one of stable coins as loan coin:
      | TUSD |
      | DAI  |
      | GUSD |
      | PAX  |
      | USDC |
    And User can see minimum loan amount above button
    And User can see maximum loan amount above button
    When User hit Choose collateral
    Then Leads to screen for choosing collateral
