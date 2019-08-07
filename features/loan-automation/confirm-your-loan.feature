Feature: Confirm your loan screen
  User can can review all terms and options of a loan before confirmation.

  Background: Logged in
    And As verified user
    And With enough funds to apply for a loan

  Scenario Outline: User has chosen amount for a loan, has selected loan duration and APR
    Given Loan amount is displayed on top of the screen
    And Estimated collateral is displayed
    And "<terms_of_loan>" user choose is displayed
    Examples:
      | terms_of_loan |
      | Term length, Annual interest rate, Monthly interest, Total of payment, Number of payments |
    And Discount "<CEL_options>" for choosing payment in CEL is displayed
    Examples:
      | CEL_options |
      | Reduce interest in %, Monthly interest in CEL, Total interest in CEL, Original monthly interest, Discounted monthly interest, Original total interest, Discounted total interest |
    And "<btc_margin_call>" is shown to user
    And "<liquidation_at>" is shown to user
    And "<dates>" are shown to user
    Examples:
      | dates |
      | First Payment Duw, Maturity date |
    When User click Request loan button
    Then Loan successfully modal is opened
