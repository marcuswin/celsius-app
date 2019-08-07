Feature: Choose Loan Terms
  User wants to choose terms of his loan

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  Scenario: User wants to choose duration of the loan in stable coin
    Given Loan amount is displayed on top of the screen
    And User can use slider to choose loan duration
    And User can see total interest for each item in slider
    When User click Choose your details button
    Then Confirm your loan screen is opened

  Scenario: User wants to choose duration of the loan in dollars
    Given Loan amount is displayed on top of the screen
    And User can use slider to choose loan duration
    And User can see total interest for each item in slider
    When User click Choose your details button
    Then Bank account details screen is opened
