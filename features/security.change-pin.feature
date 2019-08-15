@security
Feature: Change PIN
  As a User
  ISBAT change PIN for my account

  Background:
    Given User is logged in
    And Navigated to Security Settings screen

  @happy
  Scenario: User changes PIN successfully
    Given User doesn't have 2FA set
    When User presses Change PIN
    And Verifies his profile
    And Enters his new PIN
    And Confirms his new PIN
    Then A toast message should inform him about the successful change
