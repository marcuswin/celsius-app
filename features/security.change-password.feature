@security
Feature: Change password
  As a User
  ISBAT change password for my account

  Background:
    Given User is logged in
    And Navigated to Security Settings screen

  @happy
  Scenario: User changes password successfully
    Given User registered with email and password
    When User navigates to Change Password screen
    And Enters his current password
    And Enters his new password
    Then A toast message should inform him about the successful change
    And User is redirected to Security Settings
