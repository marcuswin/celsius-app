@security
Feature: Log out of all devices
  As a User
  ISBAT log out of my Celsius account from all devices

  Background:
    Given A User is logged in
    And Navigated to Security Settings screen

  @happy
  Scenario: User can see his profile security details
    When User presses log out from all devices
    Then He redirected to Welcome screen
    And A toast message should inform him about the action
