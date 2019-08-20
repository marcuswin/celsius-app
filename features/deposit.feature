@deposit
Feature: Deposit coins
  As a User
  ISBAT deposit coins into the Celsius system

  Background:
    Given A verified user is logged in
    And Navigated to Deposit screen

  @happy
  Scenario: User wants to deposit coins
    When User chooses the desired coin
    Then A QR code with his Celsius wallet should appear

  @happy
  Scenario: User wants to deposit ETH or an ERC20 coin
    When User chooses any of the ERC20 coins or ETH
    Then A QR code with the same wallet address

  @happy
  Scenario Outline: User wants to one of BTC forks with multiple address formats
    When User chooses <coin>
    Then A QR code with his Celsius wallet should appear
    And A blue card with a toggle into another address format

    When User switches the format
    Then A QR code with his Celsius wallet in the other format should appear

    Examples:
      | coin |
      | BTC  |
      | BCH  |
      | LTC  |

  @happy
  Scenario Outline: User wants to deposit coins with additional data
    When User chooses the <coin>
    Then A card with his <additional_data>
    And A QR code with his Celsius wallet should appear

    Examples:
      | coin | additional_data |
      | XRP  | destination tag |
      | XLM  | memo id         |
