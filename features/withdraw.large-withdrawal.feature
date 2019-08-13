@withdraw
Feature: Withdraw crypto
  As a User
  ISBAT withdraw my crypto from the app

  Background:
    Given A user is logged in
    And User has over $20,000 in desired coin
    And User has navigated to withdraw flow

  @happy
  Scenario: User withdraws crypto successfully
    When User chooses the desired coin
    And Enters a valid amount over $20,000
    And Confirms his withdrawal address
    And Verifies his profile
    Then A toast message should inform him to confirm transaction in email
    And User should be redirected to Transaction details screen
    And User should get a withdrawal confirmation email

    When User confirms his withdrawal by email
    Then His transaction is in the pending manual verification state
    And A BO admin should approve it
