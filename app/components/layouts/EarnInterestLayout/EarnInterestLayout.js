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
console.log('tabs.label', '111111111111');

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
