@loans
Feature: Apply for a USD loan
  As a User
  ISBAT apply for a USD loan with Celsius

  Background:
    Given A verified user is logged in
    And has enough money to cover minimum loan collateral
    And Navigated to Borrow screen
    And User has chosen USD as the coin

  @happy
  Scenario: User applies for a loan
    When User enters amount
    And Chooses a coin with enough funds for collateral
    And Chooses the desired APR
    And Sets the term of loan
    And Enters bank information
    And Confirms all the terms of loan
    Then A modal should open informing him that his loan was successfully initialized
    And An email should arrive to his inbox informing him about the loan

  @happy
  Scenario: User wants a loan but doesn't have enough of desired coin for collateral
    When User enters amount
    And Navigates to choose collateral coin screen

    Given User has enough for collateral in some coin
    But Doesn't have enough in the desired coin
    Then User can see how much more he needs to deposit

    When User presses the desired coin
    Then He navigates directly to deposit screen of the desired coin

  @happy
  Scenario: User wants a loan but doesn't have enough collateral for desired APR
    When User enters amount
    And Chooses a coin with enough funds for collateral
    Then User navigates to choose interest rate screen

    Given User has enough for collateral for some APRs
    But Doesn't have enough for the desired APR
    Then User can see how much more he needs to deposit

    When User presses the desired APR rate
    Then He navigates directly to deposit screen of the coin he chose on collateral screen
