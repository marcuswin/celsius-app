@loan_automation @javascript
Feature: Apply for a loan in crypto
  User wants to apply for a loan in crypto stable coins

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  @happy
  Scenario Outline: User wants to apply for a loan in one of stable coins
    Given User clicked `Apply for a loan` button
    And Enter the `Loan Amount screen` opened
    And User entered amount he wish to loan
    And User chose one of "<stable_coins>" as loan coin:
    And Minimum loan amount showed above button
    And Maximum loan amount showed above button
    When User click `Choose collateral`
    Then `Collateral` screen will be opened
    Examples:
      |stable_coins |
      | TUSD        |
      | DAI         |
      | GUSD        |
      | PAX         |
      | USDC        |

  @happy
  Scenario Outline: User has enough funds in coin he want to use as collateral
    Given `Choose Collateral` screen opened
    And Card for coin user want to use is active
    And Loan amount showed on the top
    And Card for a coin user wants to use was active
    And "<collateral>" amount in crypto and USD showed in cards
    When User click on card with coin he want to use as collateral
    Then `Choose Your Interest Rate` screen will be opened
    Examples:
      | collateral |
      | crypto     |
      | USD        |

  @happy
  Scenario Outline: User don't has enough funds in coin he want to use
    Given `Choose Collateral` screen opened
    And User don't have active card for coin he want to use
    And "<collateral>" amount in crypto and USD showed in cards
    And Additional amount in coin needed for collateral showed in cards
    And `Deposit more` button showed
    When User click on `Deposit more` button
    Then `Deposit screen` will be opened
    And Coin that user wants to use as collateral will be selected
    Examples:
      | collateral |
      | crypto     |
      | USD        |

  @happy
  Scenario: User has enough amount of crypto for interest he wants to apply
    Given Card with desirable "<APR>" was enabled
    And Interest in "<crypto>" per month above APR number
    And "<collateral>" in crypto that will be locked showed
    When User click on card with desirable APR
    Then `Choose Your Loan Terms` screen will be opened

  @happy
  Scenario: User doesn't have enough amount of crypto for interest he wants to apply
    Given Card with desirable APR was disabled
    And "<interest>" in crypto per month above APR number
    And "<amount_of_crypto>" which will be locked showed
    And "<amount_of_crypto>" missing for desirable APR showed
    And `Deposit more` button showed
    When User click on `Deposit more` button
    Then `Deposit` screen with selected coin for collateral will be selected

  @happy
  Scenario: User wants to choose loan duration
    Given `Loan duration` screen with slider options opened
    And Loan amount showed on the top
    And For each loan duration option total interest showed
    When User choose loan duration in slider
    And Click `Confirm your details` button
    Then `Confirm your loan` screen will be opened

  @happy
  Scenario Outline: User chose amount for a loan, selected loan duration and APR
    Given Loan amount displayed on top of the screen
    And Estimated collateral displayed
    And "<terms_of_loan>" user choose displayed
    And Discount "<CEL_options>" for choosing payment in CEL displayed
    And "<btc_margin_call>" showed to user
    And "<liquidation_at>" showed to user
    And "<dates>" showed to user
    When User click Request loan button
    And Loan successfully two step modal will be opened
    And User click on `Make a Payment` button
    Examples:
      | terms_of_loan        |
      | Term length          |
      | Annual interest rate |
      | Monthly interest     |
      | Total of payment     |
      | Number of payments   |
    Examples:
      | CEL_options                 |
      | Reduce interest in %        |
      | Monthly interest in CEL     |
      | Total interest in CEL       |
      | Original monthly interest   |
      | Discounted monthly interest |
      | Original total interest     |
      | Discounted total interest   |
    Examples:
      | dates             |
      | First Payment Day |
      | Maturity date     |
