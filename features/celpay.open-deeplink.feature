@celpay
Feature: User opens a CelPay link and receives crypto
  As a User
  ISBAT open a Celsius CelPay link
  in order to receive crypto

  Background:
    Given User receives a CelPay link

  @happy
  Scenario: Non verified user claims a CelPay link
    Given User hasn't passed KYC yet
    When User opens CelPay link
    Then A modal should open to inform him about the crypto he claimed
    And A button should take him to complete the KYC process

  @happy
  Scenario: Non verified can see all claimed CelPay transactions
    Given User hasn't passed KYC yet
    And User has already opened some CelPay links
    Then A button should show on Home screen for On Hold transactions
    When User presses the button
    Then User should be rerouted to On Hol Transaction screen
    And See all his pending CelPay transactions

  @happy
  Scenario: KYC Verified user claims a CelPay link
    Given User is KYC verified
    When User opens CelPay link
    Then A modal should open to inform him about the crypto he claimed
    And Boom you got Crypto

  @angry
  Scenario: User claims a claimed CelPay link
    Given CelPay link is already claimed
    When User opens CelPay link
    Then A toast message should inform the user that the link is already claimed

  @angry
  Scenario: User claims an unverified CelPay link of over $50
    Given CelPay link creator hasn't verified the transaction by email
    When User opens CelPay link
    Then A toast message should inform the user that the link is not verified
