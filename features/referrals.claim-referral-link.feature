@referrals
Feature: Claim referral link
  As an unregistered user
  ISBAT claim a referral link during registration
  in order to get a referral reward

  @happy
  Scenario: User claims an individual referral link
    Given User has received an individual referral link from a friend
    When User click on the link
    Then Celsius app should install/open
    And A modal should inform the user about his referral link and its rewards
    When User finishes registration
    And Gets KYC verified
    Then User can see all his reward transactions in locked state

  @happy
  Scenario: User claims a company referral link
    Given User has found a company referral link on the web
    When User click on the link
    Then Celsius app should install/open
    And A modal should inform the user about his referral link and its rewards
    When User finishes registration
    And Gets KYC verified
    Then User can see all his reward transactions in locked state
