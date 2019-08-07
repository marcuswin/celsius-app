Feature: Choose Your Interest Rate
  User wants to choose interest rate for a loan

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  Scenario: User has enough amount of crypto for interest he wants to apply
    Given Card with desirable APR is enabled
    And User can see interest in crypto per month above APR number
    And User can see amount of crypto which will be locked
    When User click on card with desirable APR
    Then Leads to screen Choose Your Loan Terms

  Scenario: User hasn't enough amount of crypto for interest he wants to apply
    Given Card with desirable APR is disabled
    And User can see interest in crypto per month above APR number
    And User can see amount of crypto which will be locked
    And User can see amount of crypto missing for desirable APR
    And User can see Deposit more button
    When User click on Deposit more button
    Then Leads to screen for choosing collateral
