@kyc
Feature: Submit KYC data
  As a non verified user
  ISBAT submit my data for KYC verification
  in order to access all features of Celsius app

  Background:
    Given: A non verified user is logged in
    And: navigated to KYC Profile Details screen

  @happy
  Scenario: Submitting data for KYC successfully
    When: The user enters their Personal info
    And: enters their Address info
    And: enters their Taxapayer info
    And: has uploaded their Documents
    And: submits for KYC verification
    Then: A toast message should inform them that the KYC process has started
    And: The app should reroute to Wallet Landing screen

  @angry
  Scenario Outline: Profile Details validation errors
    When: The user enters their Personal info
    But: doesn't enter <field>
    Then: A toast message should inform the user that the data is invalid
    And: they cannot proceed to Address info screen

    Examples:
      | field         |
      | first name    |
      | last name     |
      | date of birth |
      | gender        |
      | citizenship   |

  @angry
  Scenario: User is under 18
    Given: The user is under 18 years of age
    When: The user enters their Personal info
    Then: A toast message should inform the user that the data is invalid
    And: The user cannot proceed to Address info screen

  @angry
  Scenario Outline: Address info validation errors
    When: The user enters their Personal info
    And: The user enters their Address info
    But: The user doesn't <field>
    Then: A toast message should inform the user that the data is invalid
    And: The user cannot proceed to Taxpayer screen

    Examples:
      | field   |
      | address |
      | city    |
      | country |

  @angry
  Scenario: User from a forbidden country
    Given: The user is from a forbidden country
    When: The user enters their Personal info
    And: The user enters their Address info
    Then: A toast message should inform the user that their country is not available
    And: The user cannot proceed to Taxpayer screen

  @angry
  Scenario: User enters invalid SSN
    Given: The user is from the US
    When: The user enters their Personal info
    And: The user enters their Address info
    Then: The user is prompted to enter their SSN
    When: The user enters an invalid SSN
    Then: A toast message should inform the user that the SSN is invalid
    And: The user cannot proceed to submit their KYC documents

  @angry
  Scenario Outline: Personal Documents validation errors
    When: The user enters their Personal info
    And: The user enters their Address info
    And: The user enters their Taxpayer info
    And: chooses <document>
    But: The user doesn't add <required_photo>
    Then: A toast message should inform the user that the data is invalid
    And: The user cannot proceed to submit their KYC data

    Examples:
      | document        | required_photo |
      | passport        | front          |
      | national id     | front or back  |
      | driving license | front or back  |

