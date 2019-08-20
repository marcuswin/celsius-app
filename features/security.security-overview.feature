@security
Feature: Security Overview screen
  As a User
  ISBAT see an overview of the security of my profile

  Background:
    Given A User is logged in
    And Navigated to Security Settings screen

  @happy
  Scenario: User can see his profile security details
    When User navigates to Security Overview screen
    Then He is informed about his 2FA status
    And He is informed about his Email confirmation for touchy actions status
    And He can see his activity history from all devices
