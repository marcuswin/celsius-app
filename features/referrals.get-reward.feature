@referrals
Feature: User gets his referral award
  As a new user who used referral links or promo codes
  ISBAT get a reward
  when all reward conditions are met

  @happy
  Scenario: Referred and Referrer user should get initial deposit reward for individual referral
    Given Referred user deposited $1000
    Then Referred user should get $10 reward
    And Referrer user should get $10 reward

  @happy
  Scenario: Referred and Referrer user should get HODL reward for individual referral
    Given Referred user deposited $1000
    And Hasn't withdrawn below $1000 balance for three months
    Then Referred user should get $10 HODL reward
    And Referrer user should get $10 HODL reward

  @happy
  Scenario: Referred user should get initial deposit reward for company referral
    Given Referred user deposited a predefined amount
    Then Referred user should get initial deposit reward
    And Referrer user should get initial deposit reward

  @happy
  Scenario: Referred user should get HODL reward for company referral
    Given Referred user deposited a predefined amount
    And Hasn't withdrawn below the predefined amount for three months
    Then Referred user should get HODL reward
    And Referrer user should get HODL reward

  @happy
  Scenario: User should get Promo Code reward
    Given User made all conditions of the promo code
    Then User should geet the promo code reward defined in the BO

