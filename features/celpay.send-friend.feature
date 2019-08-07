@celpay
Feature: Send CelPay to a Phone Contact
  As a User
  ISBAT to send a CelPay transaction to a Contact

  Background:
    Given A verified used is logged in
    And User has enough crypto in his account
    And Navigated to CelPay screen
    And User has Contacts with Celsius app

  @happy
  Scenario: User CelPay of under $50 to a friend
    When Users chooses a friend from the list
    And Chooses a coin
    And Sets an amount of under $50
    And Adds a note for the friend
    And Verifies his profile
    Then He is rerouted to his CelPay transaction details screen
    And His friend should see the transaction in his wallet


  @happy
  Scenario: User CelPay of over $50 to a friend
    When Users chooses a friend from the list
    And Chooses a coin
    And Sets an amount of over $50
    And Adds a note for the friend
    And Verifies his profile
    Then He is rerouted to his CelPay transaction details screen
    And A confirmation email is sent to his inbox

    When User verifies the transaction via email
    Then His friend should see the transaction in his wallet
