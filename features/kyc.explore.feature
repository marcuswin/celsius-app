@kyc
Feature: Exploring the app
  As a non verified user
  ISBAT see preview of Celsius app features
  while I wait for my KYC verification

  Background:
    Given: An NON VERIFIED user is logged in
    And: User opened FAB menu

  @happy
  Scenario Outline: User that hasn't submitted KYC data explores a flow in the app
    When: User never submitted KYC data
    And: User goes to <flow>
    Then: User is informed about <flow> features
    And: A button at the bottom should enable him to enter the KYC data submission flow

    Examples:
      | flow     |
      | Deposit  |
      | Withdraw |
      | CelPay   |

  @happy
  Scenario: User that hasn't submitted KYC data explores Borrow flow
    When: User never submitted KYC data
    And: User goes to Borrow screen
    Then: they should see the borrow calculator
    And: A button at the bottom should enable him to enter the KYC data submission flow

  @happy
  Scenario: User that hasn't submitted KYC data explores Wallet
    When: User never submitted KYC data
    And: User goes to Wallet screen
    Then: Cards with all supported currencies should show with 0 balance

    When: User presses interest
    Then: User should see the interest calculator
    And: A button at the bottom should enable him to enter the KYC data submission flow


  @happy
  Scenario Outline: User that is pending KYC verification explores a flow in the app
    Given: User has submitted KYC data and is waiting for verification
    When: User goes to <flow>
    Then: An empty screen should inform the user about <flow> features
    And: Yellow text indicating the verification is pending

    Examples:
      | flow   |
      | Deposit  |
      | Withdraw |
      | CelPay   |

  @happy
  Scenario: User that is pending KYC verification explores Borrow flow
    Given: User has submitted KYC data and is waiting for verification
    When: User goes to Borrow screen
    Then: User should see the borrow calculator
    And: Yellow text indicating the verification is pending

  @happy
  Scenario: User that is pending KYC verification explores Wallet
    Given: User has submitted KYC data and is waiting for verification
    When: User goes to Wallet screen
    Then: Cards with all supported currencies should show with 0 balance

    When: They press interest
    Then: They should see the interest calculator
    And: Yellow text indicating the verification is pending


  @happy
  Scenario Outline: KYC rejected user explores a flow in the app
    Given: User has submitted KYC data and got rejected by Onfido because of invalid data
    When: User goes to <flow>
    Then: An empty screen should inform the user about <flow> features
    And: Reasons why their KYC submission was rejected
    And: A button to re-do the KYC process

    Examples:
      | flow   |
      | Deposit  |
      | Withdraw |
      | CelPay   |

  @happy
  Scenario: KYC rejected user explores Borrow flow
    Given: User has submitted KYC data and got rejected by Onfido because of invalid data
    When: The user goes to Borrow screen
    Then: they should see the borrow calculator
    And: Reasons why their KYC submission was rejected
    And: A button to re-do the KYC process

  @happy
  Scenario: KYC rejected user explores Wallet
    Given: User has submitted KYC data and got rejected by Onfido because of invalid data
    When: The user goes to Wallet screen
    Then: Cards with all supported currencies should show with 0 balance

    When: They press interest
    Then: They should see the interest calculator
    And: Reasons why their KYC submission was rejected
    And: A button to re-do the KYC process


  @happy
  Scenario: User is restricted from the app forever from BO
    Given: User has submitted KYC data and got rejected forever by a BO admin
    When: The user opens the app
    Then: they should see an empty screen informing them they are rejected
    And: A button to contact Celsius support
