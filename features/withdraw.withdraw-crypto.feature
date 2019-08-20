@withdraw
Feature: Withdraw crypto
  As a User
  ISBAT withdraw my crypto from the app

  Background:
    Given A user is logged in
    And User has enough crypto to withdraw
    And User has navigated to withdraw flow

  @happy
  Scenario: User withdraws crypto successfully
    When User chooses the desired coin
    And Enters valid amount
    And Confirms his withdrawal address
    And Verifies his profile
    Then A toast message should inform him about the successful withdraw
    And User should be redirected to Transaction details screen
    And An email should inform him about the successful withdrawal
