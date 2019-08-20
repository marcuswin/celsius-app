@celpay
Feature: Importing phone contacts
  As a User
  ISBAT import contacts from my phone
  in order to send CelPay to my friends directly

  Background:
    Given A verified user is logged in
    And User navigates to CelPay

  @happy
  Scenario: User has Contact permissions enabled
    Given User has Contact permissions enabled
    Then Phone contacts should be imported automatically
    And A list with all Contacts with Celsius accounts should show

  @happy
  Scenario: User doesn't have Contact permissions enabled
    Given User doesn't have Contact permissions enabled
    Then An empty screen should show and inform that he has no contacts
    And Button should enable user to import contacts

    When User presses import contacts
    Then User should be navigated to Phone Permissions and Settings

    When User enables Contacts permissions
    And Returns to Celsius app

    Then Contacts should be imported automatically
    And A list with all Contacts with Celsius accounts should show

  @happy
  Scenario: Loading contacts is taking too long
    Given User doesn't have Contact permissions enabled
    And Contact loading is taking too long
    Then The regular spinner should be replaced with a new one
    And Button should enable user the explore the app while contacts are being imported

    When Contacts are imported
    Then A modal should inform the user about it
    And Button should navigate user back to CelPay

    When User goes to CelPay
    Then A list with all Contacts with Celsius accounts should show

  @happy
  Scenario: User doesn't have any Contacts with Celsius app
    Given User has finished importing Contacts
    And None of his friend have Celsius app
    Then An empty screen should show and inform that he has no contacts
    And Button should enable user to import contacts again in case anything changed

