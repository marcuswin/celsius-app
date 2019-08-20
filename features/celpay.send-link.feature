@celpay
Feature: Send CelPay as a Link
  As a User
  ISBAT to send a CelPay transaction as a link

  Background:
    Given A verified used is logged in
    And User has enough crypto in his account
    And Navigated to CelPay screen

  @happy
  Scenario: User shares a CelPay link of under $50
    When Users presses `Send as a link >`
    And Chooses a coin
    And Sets an amount of under $50
    And Verifies his profile
    Then Native share dialog should open

    When User closes share dialog
    Then He is rerouted to his CelPay transaction details screen

  @happy
  Scenario: User shares a CelPay link of over $50
    When Users presses `Send as a link >`
    And Chooses a coin
    And Sets an amount of over $50
    And Verifies his profile
    Then Native share dialog should open

    When User closes share dialog
    Then He is rerouted to his CelPay transaction details screen
    And A confirmation email is sent to his inbox

    When User verifies the transaction via email
    Then CelPay link can be claimed

  @happy
  Scenario: User cancels a CelPay link
    Given CelPay link hasn't been claimed yet
    When User navigates to CelPay transaction
    And Cancels CelPay transaction

    Then A toast message should inforn the user that the cancelation was successful
    And Transaction details should change accordingly
