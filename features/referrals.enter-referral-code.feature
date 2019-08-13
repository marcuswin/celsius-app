@referrals
Feature: Enter referral code during registration
  As an unregistered user
  ISBAT enter a referral code during registration
  in order to get a referral reward

  @happy
  Scenario: User enters an individual referral code
    Given User has received an individual referral link from a friend
    When User click on the link
    Then Celsius app should install/open
    And A modal should inform the user about his referral link and its rewards
    When User finishes registration
    And Gets KYC verified
    Then User can see all his reward transactions in locked state

  @happy
  Scenario: User enters a company referral code
    Given User has found a company referral link on the web
    When User click on the link
    Then Celsius app should install/open
    And A modal should inform the user about his referral link and its rewards
    When User finishes registration
    And Gets KYC verified
    Then User can see all his reward transactions in locked state
