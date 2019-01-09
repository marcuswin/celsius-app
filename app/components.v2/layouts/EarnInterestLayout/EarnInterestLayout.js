// TODO(fj): probably going to trash in v3

import React, {Component} from 'react';
import SimpleLayout from "../SimpleLayout/SimpleLayout";
import testUtil from "../../../utils/test-util";


class EarnInterestLayout extends Component {
  tabs = [
    { label: 'Calculator', screen: 'InterestCalculator' },
    { label: 'How to earn', screen: 'HowToEarnInterest' },
  ];

  heading = {
    text: 'Earn Interest',
  };

  render() {
    const {children} = this.props;

    return (
      <SimpleLayout
        tabs={this.tabs}
        mainHeader={{ backButton: false }}
        animatedHeading={this.heading}
      >
        {children}
      </SimpleLayout>
    );
  }
}

export default testUtil.hookComponent(EarnInterestLayout);
