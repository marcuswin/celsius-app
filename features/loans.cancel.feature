@loans
Feature: Loan cancellation
  As a User with a pending loan
  ISBAT cancel my loan

  Background:
    Given: A user that has a pending loan is logged in
    And: They navigate to All Loans screen
    And: Swipe to a pending loan

  @happy
  Scenario: User Cancels a pending loan
    When: They press the `Cancel` button
    Then: A modal should open asking them to confirm

    When: They press `Cancel` again
    And: Verify their profile
    Then: A toast message should inform the user that loan is canceled
    And: Loan card should change to canceled
