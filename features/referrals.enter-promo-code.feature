@referrals
Feature: Enter referral code during registration
  As an User
  ISBAT enter a Celsius promo code on profile screen
  in order to get a reward

  Background:
    Given a verified user is logged in
    And user navigated to profile screen

  @happy
  Scenario: User enters a valid Celsius promo code
    When User presses `Enter Promo code`
    And User enters a valid promo code
    Then Toast message should inform the user that the action was successful

  @angry
  Scenario: User enters an invalid/expired/duplicate Celsius promo code
    When User presses `Enter Promo code`
    And User enters an invalid/expired/duplicate promo code
    Then Toast message should inform the user that the promo code is invalid

